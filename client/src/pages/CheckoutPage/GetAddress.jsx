import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './CheckoutPage.css';
import '../Booking/Booking.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const OrderSummary = () => {
    const navigate = useNavigate();
    const [cartDetails, setCartDetails] = useState({});
    const [bookingFormData, setBookingFormData] = useState({});
    const [paymentOption, setPaymentOption] = useState('cashOnDelivery');

    const handlePaymentOptionChange = (event) => {
        setPaymentOption(event.target.value);
    };
    const [formData, setFormData] = useState({
        BookingInfo: {},
        Cart: [],
        Prices: {
            subtotal: 0,
            homeCollectionCharges: 0,
            discount: 0,
            totalToPay: 0
        }
    });
    const [visibleTests, setVisibleTests] = useState({});

    useEffect(() => {
        const storedDetails = JSON.parse(localStorage.getItem('cartDetails')) || {};
        setCartDetails(storedDetails);

        const storedBookingData = JSON.parse(sessionStorage.getItem('bookingFormData')) || {};
        setBookingFormData(storedBookingData);
    }, []);

    useEffect(() => {
        if (Object.keys(cartDetails).length !== 0 && Object.keys(bookingFormData).length !== 0) {
            const { cart, subtotal, homeCollectionCharges, discount, totalToPay } = cartDetails;
            setFormData({
                BookingInfo: bookingFormData,
                Cart: cart,
                Prices: {
                    subtotal: subtotal || 0,
                    homeCollectionCharges: homeCollectionCharges || 0,
                    discount: discount || 0,
                    totalToPay: totalToPay || 0
                }
            });
        }
    }, [cartDetails, bookingFormData]);

    const checkoutHandler = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('labMantraToken');

        if (paymentOption === "cashOnDelivery") {
            try {
                const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/Create-Cod-Orders`, formData, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                console.log(res.data)
            } catch (error) {
                console.error('Error in processing payment:', error);
            }
        } else {
            try {
                const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/Create-payment`, formData, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                const order = res.data.order;

                const options = {
                    key: "rzp_test_gU4w4jM7ASo0XA",
                    amount: order?.amount || null,
                    currency: "INR",
                    name: "Lab Mantra",
                    description: `Payment For Lab Testing`,
                    image: "https://i.pinimg.com/originals/9e/ff/85/9eff85f9a3f9540bff61bbeffa0f6305.jpg",
                    order_id: order?.id,
                    callback_url: `${process.env.REACT_APP_BACKEND_URL}/paymentverification`,
                    prefill: {
                        name: formData.UserName,
                        email: formData.Email,
                        contact: formData.ContactNumber
                    },
                    notes: {
                        "address": "Razorpay Corporate Office"
                    },
                    theme: {
                        "color": "#2DBCB6"
                    }
                };

                const razorpay = new window.Razorpay(options);
                razorpay.on('payment.failed', function (response) {
                    toast.error('Payment failed. Please try again.');
                });
                razorpay.open();
            } catch (error) {
                console.error('Error in processing payment:', error);
            }
        }

    };

    const toggleVisibility = (id) => {
        setVisibleTests(prevState => ({
            ...prevState,
            [id]: !prevState[id]
        }));
    };

    return (
        <>
            <section className="bread">
                <div className="container">
                    <nav aria-label="breadcrumb">
                        <h2>Order Summary</h2>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                            <li className="breadcrumb-item"><Link to="/cart">Cart</Link></li>
                            <li className="breadcrumb-item active" aria-current="page">Order Summary</li>
                        </ol>
                    </nav>
                </div>
            </section>

            <section className="my-5">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <div
                                className="booking-details"
                                style={{
                                    backgroundColor: '#f0fffe',
                                    padding: '20px',
                                    borderRadius: '8px'
                                }}
                            >
                                <h3 className="mb-3" style={{ color: '#003873' }}>
                                    Booking Details
                                </h3>
                                <div className="row">
                                    <div className="col-12">
                                        {bookingFormData.fullName && (
                                            <p><strong>Full Name:</strong> {bookingFormData.fullName}</p>
                                        )}
                                        {bookingFormData.phone && (
                                            <p><strong>Phone Number:</strong> {bookingFormData.phone}</p>
                                        )}
                                        {bookingFormData.email && (
                                            <p><strong>Email:</strong> {bookingFormData.email}</p>
                                        )}
                                        {bookingFormData.optionalPhone && (
                                            <p><strong>Optional Second Number:</strong> {bookingFormData.optionalPhone}</p>
                                        )}
                                        {bookingFormData.date && (
                                            <p><strong>Preferred Date:</strong> {bookingFormData.date}</p>
                                        )}
                                        {bookingFormData.age && (
                                            <p><strong>Age:</strong> {bookingFormData.age}</p>
                                        )}
                                        {bookingFormData.gender && (
                                            <p><strong>Gender:</strong> {bookingFormData.gender}</p>
                                        )}
                                        {bookingFormData.pinCode && (
                                            <p><strong>Pin Code:</strong> {bookingFormData.pinCode}</p>
                                        )}
                                        {bookingFormData.city && (
                                            <p><strong>City:</strong> {bookingFormData.city}</p>
                                        )}
                                        {bookingFormData.address && (
                                            <p><strong>Address:</strong> {bookingFormData.address}</p>
                                        )}
                                        {bookingFormData.labName && (
                                            <p><strong>Lab Name:</strong> {bookingFormData.labName}</p>
                                        )}
                                        {bookingFormData.labAddress && (
                                            <p><strong>Lab Address:</strong> {bookingFormData.labAddress}</p>
                                        )}
                                        {bookingFormData.appointTime && (
                                            <p><strong>Appointment Time:</strong> {bookingFormData.appointTime}</p>
                                        )}
                                        {bookingFormData.bookingType && (
                                            <p><strong>Booking Type:</strong> {bookingFormData.bookingType}</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="order-summary mb-4" style={{ backgroundColor: '#f0fffe', padding: '20px', borderRadius: '8px' }}>
                                <h3 className="mb-3" style={{ color: '#003873' }}>Test Details</h3>
                                {cartDetails.cart && cartDetails.cart.map(item => (
                                    <div key={item._id} className="cart-item mb-4" style={{ backgroundColor: '#ddf3f2', padding: '15px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                                        {item.packageName ? (
                                            <>
                                                <h5 className="mb-2" style={{ color: '#4377a2' }}>Package: {item.packageName}</h5>
                                                <div className="d-flex justify-content-between mb-2">
                                                    <span style={{ color: '#003873' }}>Package Price:</span>
                                                    <span style={{ color: '#00AAA9' }}>₹{item.currentPrice.toFixed(0) || item.actualPrice.toFixed(0)}</span>
                                                </div>

                                                <button
                                                    className="btn btn-info mt-1"
                                                    style={{ backgroundColor: '#2dbcb6', color: '#f0fffe', border: 'none', padding: '8px 16px', borderRadius: '4px' }}
                                                    onClick={() => toggleVisibility(item._id)}
                                                >
                                                    {visibleTests[item._id] ? 'Hide Details' : 'View Details'}
                                                </button>
                                                {visibleTests[item._id] && (
                                                    <>
                                                        <h6 className="mt-3 mb-2" style={{ color: '#4377a2' }}>Tests Included:</h6>
                                                        <ul className="list-unstyled">
                                                            {[...new Set(item.testDetails.map(test => test.testName))].map((testName, index) => {
                                                                const test = item.testDetails.find(t => t.testName === testName);
                                                                return (
                                                                    <li key={index} className="d-flex justify-content-between mb-2">
                                                                        <span>{test.testName}</span>
                                                                    </li>
                                                                );
                                                            })}
                                                        </ul>
                                                    </>
                                                )}
                                            </>
                                        ) : (
                                            <>
                                                <h5 className="mb-2" style={{ color: '#4377a2' }}>Test: {item.formattedTestName}</h5>
                                                <div className="d-flex justify-content-between mb-2">
                                                    <span style={{ color: '#003873' }}>Test Price:</span>
                                                    <span style={{ color: '#00AAA9' }}>₹{item.discountPrice.toFixed(0) || item.actualPrice.toFixed(0)}</span>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="col-md-6 my-4">
                            <div className="tot" style={{ backgroundColor: 'var(--bg-head)', padding: '20px', borderRadius: '8px' }}>
                                <h3 className="mb-3 h4" style={{ color: 'var(--bg-dark-blue)' }}>Payment Details</h3>
                                <div className="d-flex justify-content-between mt-3">
                                    <span style={{ color: 'var(--color-blue)' }}>Subtotal:</span>
                                    <span>₹{formData.Prices.subtotal.toFixed(0)}</span>
                                </div>
                                <div className="d-flex justify-content-between mt-1">
                                    <span style={{ color: 'var(--color-blue)' }}>Home Collection Charges:</span>
                                    <span>₹{formData.Prices.homeCollectionCharges.toFixed(0)}</span>
                                </div>
                                <div className="d-flex justify-content-between mt-1">
                                    <span style={{ color: 'var(--color-blue)' }}>Discount:</span>
                                    <span>₹{formData.Prices.discount.toFixed(0)}</span>
                                </div>
                                <div className="d-flex justify-content-between mt-3">
                                    <span className="total-payment" style={{ color: 'var(--color-blue)', fontWeight: 'bold' }}>Total to Pay:</span>
                                    <span>₹{formData.Prices.totalToPay.toFixed(0)}</span>
                                </div>
                            </div>
                            <div >
                                <div className="p-4 " style={{ backgroundColor: '#F0FFFE' }} >
                                    <h2 className="card-title text-center mb-4">Select Payment Option</h2>
                                    <form>
                                        <div className="form-check mb-3">
                                            <input
                                                className="form-check-input"
                                                type="radio"
                                                id="onlinePayment"
                                                name="paymentOption"
                                                value="onlinePayment"
                                                checked={paymentOption === 'onlinePayment'}
                                                onChange={handlePaymentOptionChange}
                                            />
                                            <label className="form-check-label" for="onlinePayment">
                                                Online Payment
                                            </label>
                                        </div>

                                        <div className="form-check mb-3">
                                            <input
                                                className="form-check-input"
                                                type="radio"
                                                id="cashOnDelivery"
                                                name="paymentOption"
                                                value="cashOnDelivery"
                                                checked={paymentOption === 'cashOnDelivery'}
                                                onChange={handlePaymentOptionChange}
                                            />
                                            <label className="form-check-label" for="cashOnDelivery">
                                                Cash on Delivery
                                            </label>
                                        </div>


                                    </form>
                                </div>
                            </div>
                            <div className="mt-4 d-grid">
                                <button onClick={checkoutHandler} className="btn btn-success" style={{ backgroundColor: '#2dbcb6', color: '#f0fffe', border: 'none', padding: '10px 0', borderRadius: '4px' }}>
                                    Confirm Booking
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default OrderSummary;
