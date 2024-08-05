
const Razorpay = require('razorpay');
const crypto = require('crypto');
const OrderModel = require('../models/OrderModel');
require('dotenv').config()
const sendEmail = require('../utils/SendEmail');
const instance = new Razorpay({
    key_id: process.env.RAZORPAY_APT_KEY,
    key_secret: process.env.RAZORPAY_APT_SECRET,
});
console.log()
exports.checkout = async (req, res) => {
    try {
        const { BookingInfo, Cart, Prices } = req.body;
        const user = req.user._id
        // Create a new Razorpay order
        const options = {
            amount: Prices.totalToPay * 100, // amount in the smallest currency unit
            currency: "INR",
            receipt: `receipt_order_${Date.now()}`,
        };

        const razorpayOrder = await instance.orders.create(options);

        if (!razorpayOrder) {
            return res.status(500).send('Some error occured');
        }

        const newOrder = new OrderModel({
            requestBody: req.body, // Save the entire req.body
            razorpayOrderId: razorpayOrder.id,
            transactionId: req.body.transactionId,
            PaymentDone: req.body.PaymentDone,
            PatientId: user
        });

        const savedOrder = await newOrder.save();

        // Return the order details to the client
        res.json({
            success: true,
            data: savedOrder,
            order: razorpayOrder


        });

    } catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
};



exports.MakeCashOnDeliveryCheckOut = async (req, res) => {
    try {
        const user = req.user._id
        console.log(user)
        const newOrder = new OrderModel({
            requestBody: req.body, // Save the entire req.body
            razorpayOrderId: req.body.razorpayOrderId,
            razorpayPaymentId: req.body.razorpayPaymentId,
            razorpaySignature: req.body.razorpaySignature,
            transactionId: req.body.transactionId,
            PaymentDone: req.body.PaymentDone,
            PatientId: user
        });

        await newOrder.save();
        res.status(201).json(newOrder);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.paymentVerification = async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

        if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
            return res.status(400).json({
                success: false,
                message: 'Missing required payment details',
            });
        }

        const body = razorpay_order_id + "|" + razorpay_payment_id;

        const expectedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_APT_SECRET) // Use environment variable for key secret
            .update(body)
            .digest("hex");

        const isAuthentic = expectedSignature === razorpay_signature;

        if (isAuthentic) {
            const latestOrder = await OrderModel.findOneAndUpdate(
                { razorpayOrderId: razorpay_order_id },
                {
                    $set: {
                        transactionId: razorpay_payment_id,
                        PaymentDone: true,
                        paymentStatus: "Success"
                    }
                },
                { new: true }
            );

            if (!latestOrder) {
                return res.status(403).json({
                    success: false,
                    message: "No Order Found"
                });
            }

            const UserMailOptions = {
                email: latestOrder.requestBody?.BookingInfo?.email,
                subject: 'Thanks Message For Booking Test With Lab Mantra',
                message: `
                    <div style="font-family: Arial, sans-serif; color: #333;">
                        <div style="padding: 20px; background-color: #f4f4f4;">
                            <h2 style="color: #003873;">Lab Mantra</h2>
                            <p>Dear <strong>${latestOrder.requestBody?.BookingInfo?.fullName}</strong>,</p>
                            <p>Thank you for booking a test with Lab Mantra. Below are your booking details:</p>
                            
                            <h3>Booking Information</h3>
                            <ul style="list-style-type: none; padding: 0;">
                                <li><strong>Full Name:</strong> ${latestOrder.requestBody?.BookingInfo?.fullName}</li>
                                <li><strong>Phone:</strong> ${latestOrder.requestBody?.BookingInfo?.phone}</li>
                                <li><strong>Email:</strong> ${latestOrder.requestBody?.BookingInfo?.email}</li>
                                <li><strong>Date:</strong> ${latestOrder.requestBody?.BookingInfo?.date}</li>
                                <li><strong>Age:</strong> ${latestOrder.requestBody?.BookingInfo?.age}</li>
                                <li><strong>Gender:</strong> ${latestOrder.requestBody?.BookingInfo?.gender}</li>
                                <li><strong>Pin Code:</strong> ${latestOrder.requestBody?.BookingInfo?.pinCode}</li>
                                <li><strong>City:</strong> ${latestOrder.requestBody?.BookingInfo?.city}</li>
                                <li><strong>Address:</strong> ${latestOrder.requestBody?.BookingInfo?.address}</li>
                            </ul>
                
                            <h3>Payment Information</h3>
                            <ul style="list-style-type: none; padding: 0;">
                                <li><strong>Subtotal:</strong> ₹${latestOrder.requestBody?.Prices.subtotal}</li>
                                <li><strong>Discount:</strong> ₹${latestOrder.requestBody?.Prices.discount}</li>
                                <li><strong>Total to Pay:</strong> ₹${latestOrder.requestBody?.Prices.totalToPay}</li>
                                <li><strong>Payment Status:</strong> ${latestOrder.paymentStatus}</li>
                                <li><strong>Transaction ID:</strong> ${latestOrder.transactionId}</li>
                            </ul>
                            
                            <p style="color: #003873;"><strong>Note:</strong> Your payment has been successfully processed.</p>
                
                            <p>We look forward to serving you. If you have any questions, feel free to contact us at info@labmantra.com.</p>
                
                            <p>Best regards,<br>Lab Mantra Team</p>
                        </div>
                    </div>
                `
            };

            const filterTests = latestOrder?.requestBody?.Cart.filter((item) => item.isTestTrue);
            const filterPackages = latestOrder?.requestBody?.Cart.filter((item) => item.isPackage);
            // console.log(filterPackages)
            const uniqueLabEmails = [...new Set(filterTests.map(item => item.LabEmail))];
            uniqueLabEmails.forEach(email => {
                const LabTestsOptions = {
                    email: email,
                    subject: 'Lab Test Booking Notification',
                    message: `
                        <div style="font-family: Arial, sans-serif; color: #333;">
                            <div style="padding: 20px; background-color: #f4f4f4;">
                                <h2 style="color: #003873;">Lab Mantra</h2>
                                <p>Dear ${filterTests.find(test => test.LabEmail === email)?.representedName},</p>
                                <p>We would like to inform you about the recent test bookings at your lab. Below are the details:</p>
                                
                                <h3>Test Details</h3>
                                <ul style="list-style-type: none; padding: 0;">
                                    ${filterTests.filter(test => test.LabEmail === email).map(test => `
                                        <li><strong>Test Name:</strong> ${test.formattedTestName}</li>
                                        <li><strong>Price:</strong> ₹${test.price}</li>
                                        <li><strong>Discount Price:</strong> ₹${test.discountPrice}</li>
                                        <li><strong>Location:</strong> ${test.labLocation}, ${test.city}, ${test.state}, ${test.pinCode}</li>
                                        <br>
                                    `).join('')}
                                </ul>
                                 <h3>Booking User  Information</h3>
                                <ul style="list-style-type: none; padding: 0;">
                                    <li><strong>Full Name:</strong> ${latestOrder.requestBody?.BookingInfo?.fullName}</li>
                                    <li><strong>Phone:</strong> ${latestOrder.requestBody?.BookingInfo?.phone}</li>
                                    <li><strong>Email:</strong> ${latestOrder.requestBody?.BookingInfo?.email}</li>
                                    <li><strong>Date:</strong> ${latestOrder.requestBody?.BookingInfo?.date}</li>
                                    <li><strong>Age:</strong> ${latestOrder.requestBody?.BookingInfo?.age}</li>
                                    <li><strong>Gender:</strong> ${latestOrder.requestBody?.BookingInfo?.gender}</li>
                                    <li><strong>Pin Code:</strong> ${latestOrder.requestBody?.BookingInfo?.pinCode}</li>
                                    <li><strong>City:</strong> ${latestOrder.requestBody?.BookingInfo?.city}</li>
                                    <li><strong>Address:</strong> ${latestOrder.requestBody?.BookingInfo?.address}</li>
                                </ul>
                
                                <p>We appreciate your collaboration with Lab Mantra. For any questions, please contact us at info@labmantra.com.</p>
                
                                <p>Best regards,<br>Lab Mantra Team</p>
                            </div>
                        </div>
                    `
                };
                sendEmail(LabTestsOptions);
            });

            const uniqueLabEmailsForPackages = [...new Set(filterPackages.map(item => item.laboratoryId.email))];
            uniqueLabEmailsForPackages.forEach(email => {
                const LabPackageOptions = {
                    email: email,
                    subject: 'Lab Packages Booking Notification',
                    message: `
                        <div style="font-family: Arial, sans-serif; color: #333;">
                            <div style="padding: 20px; background-color: #f4f4f4;">
                                <h2 style="color: #003873;">Lab Mantra</h2>
                                <p>Dear ${filterTests.find(test => test.LabEmail === email)?.RepresentedName},</p>
                                <p>We would like to inform you about the recent Package bookings at your lab. Below are the details:</p>
                                
                                <h3>Test Details</h3>
                                <ul style="list-style-type: none; padding: 0;">
                                    ${filterPackages.filter(test => test.laboratoryId.email === email).map(test => `
                                        <li><strong>Test Name:</strong> ${test.packageName}</li>
                                        <li><strong>Price:</strong> ₹${test.actualPrice}</li>
                                        <li><strong>Discount Price:</strong> ₹${test.currentPrice}</li>
                                        <li><strong>Offer Price:</strong> ₹${test.offPercentage}</li>
                                        <br>
                                    `).join('')}
                                </ul>
                                 <h3>Booking User  Information</h3>
                                <ul style="list-style-type: none; padding: 0;">
                                    <li><strong>Full Name:</strong> ${latestOrder.requestBody?.BookingInfo?.fullName}</li>
                                    <li><strong>Phone:</strong> ${latestOrder.requestBody?.BookingInfo?.phone}</li>
                                    <li><strong>Email:</strong> ${latestOrder.requestBody?.BookingInfo?.email}</li>
                                    <li><strong>Date:</strong> ${latestOrder.requestBody?.BookingInfo?.date}</li>
                                    <li><strong>Age:</strong> ${latestOrder.requestBody?.BookingInfo?.age}</li>
                                    <li><strong>Gender:</strong> ${latestOrder.requestBody?.BookingInfo?.gender}</li>
                                    <li><strong>Pin Code:</strong> ${latestOrder.requestBody?.BookingInfo?.pinCode}</li>
                                    <li><strong>City:</strong> ${latestOrder.requestBody?.BookingInfo?.city}</li>
                                    <li><strong>Address:</strong> ${latestOrder.requestBody?.BookingInfo?.address}</li>
                                </ul>
                
                                <p>We appreciate your collaboration with Lab Mantra. For any questions, please contact us at info@labmantra.com.</p>
                
                                <p>Best regards,<br>Lab Mantra Team</p>
                            </div>
                        </div>
                    `
                };
                sendEmail(LabPackageOptions);
            });

            sendEmail(UserMailOptions);


            res.redirect(`${process.env.REACT_APP_FRONTEND_URL}/booking-confirmed?OrderId=${latestOrder._id}`)

        } else {
            res.redirect(`${process.env.REACT_APP_FRONTEND_URL}/booking-Failed?OrderId=${latestOrder._id}`)

        }
    } catch (error) {
        console.error("Payment Verification Error: ", error);
        res.status(500).json({
            success: false,
            message: "An error occurred during payment verification",
            error: error.message
        });
    }
};