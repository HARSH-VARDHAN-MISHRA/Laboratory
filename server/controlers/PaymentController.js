
const Razorpay = require('razorpay');
const crypto = require('crypto');
const OrderModel = require('../models/OrderModel');
const sendEmail = require('../utils/SendEmail');
const instance = new Razorpay({
    key_id: 'rzp_test_gU4w4jM7ASo0XA',
    key_secret: 'khlbmv5fXQVkCt5JSBGM5gvb',
});

exports.checkout = async (req, res) => {
    try {
        const { BookingInfo, Cart, Prices } = req.body;

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

        // Create and save the order in MongoDB
        const newOrder = new OrderModel({
            BookingInfo,
            Cart,
            Prices,
            razorpayOrderId: razorpayOrder.id,
            razorpayPaymentId: '',
            razorpaySignature: ''
        });

        const savedOrder = await newOrder.save();

        // Return the order details to the client
        res.json({
            success: true,
            order: savedOrder,
            orderId: razorpayOrder.id,
            amount: razorpayOrder.amount,
            currency: razorpayOrder.currency
        });

    } catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
};



exports.MakeCashOnDeliveryCheckOut = async (req, res) => {
    try {
        const newOrder = new OrderModel({
            requestBody: req.body, // Save the entire req.body
            razorpayOrderId: req.body.razorpayOrderId,
            razorpayPaymentId: req.body.razorpayPaymentId,
            razorpaySignature: req.body.razorpaySignature,
            transactionId: req.body.transactionId,
            PaymentDone: req.body.PaymentDone,
            PatientId: req.body.PatientId
        });

        await newOrder.save();
        res.status(201).json(newOrder);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
