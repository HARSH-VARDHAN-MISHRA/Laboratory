import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import './CartPage.css';

// import emptyCartImage from './emptyCart.png'
import emptyCartImage from './emp.webp'
import MetaTag from '../../components/Meta/MetaTag';

const CartPage = () => {
    const [cart, setCart] = useState([]);
    const [coupon, setCoupon] = useState('');
    const [discount, setDiscount] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
        const storedCart = JSON.parse(localStorage.getItem('lab-cart')) || [];
        setCart(storedCart);
    }, []);

    const handleRemoveFromCart = (itemId) => {
        // Filter out the item to be removed based on itemId (either _id or id)
        const updatedCart = cart.filter(item => item._id !== itemId && item.id !== itemId);

        // Update state with the filtered cart
        setCart(updatedCart);

        // Update local storage with the filtered cart
        localStorage.setItem('lab-cart', JSON.stringify(updatedCart));
        console.log(updatedCart);
    }

    const handleCouponApply = () => {
        if (coupon === 'SS10') {
            setDiscount(cart.reduce((acc, item) => acc + (item.discountPrice || item.actualPrice) * 0.1, 0));
        } else {
            setDiscount(0);
        }
    }

    const subtotal = cart.reduce((acc, item) => {
        if (item.packageName) {
            return acc + item.currentPrice;
        } else {
            return acc + (item.discountPrice || item.actualPrice);
        }
    }, 0);

    const homeCollectionCharges = subtotal >= 649 ? 0 : 150;
    const totalToPay = subtotal + homeCollectionCharges - discount;

    const handleContinue = () => {
        const cartDetails = {
            cart,
            subtotal,
            homeCollectionCharges,
            discount,
            totalToPay
        };
        localStorage.setItem('cartDetails', JSON.stringify(cartDetails));
        navigate('/cart/add-booking-details');
    }

    const token = localStorage.getItem('labMantraToken')

    const [selectedPackage, setSelectedPackage] = useState(null);

    const handleViewPackageDetails = (packageId) => {
        if (selectedPackage === packageId) {
            setSelectedPackage(null); // Toggle off if already selected
        } else {
            setSelectedPackage(packageId); // Toggle on to show details
        }
    };

    return (
        <>
            <MetaTag
                title="Your Cart - Lab Mantra"
                description="Review and manage the items in your cart at Lab Mantra. Ensure you have all the necessary tests and services before proceeding to checkout."
                keyword="Lab Mantra, cart, healthcare services, medical tests, checkout"
            />


            {cart.length ? (
                <>
                    <section className="bread">
                        <div className="container">
                            <nav aria-label="breadcrumb ">
                                <h2>Cart</h2>
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                                    <li className="breadcrumb-item active" aria-current="page">Cart</li>
                                </ol>
                            </nav>
                        </div>
                    </section>

                    <section className="cart-page py-5">
                        <div className="container">
                            <div className="head-line">
                                <div className="flex">
                                    <h2>ITEMS IN YOUR CART ({cart.length})</h2>
                                    <Link className='addTest' to={`/lab-tests`}>Add Tests</Link>
                                </div>
                            </div>

                            <div className="row">


                                <div className="col-md-7">
                                    <div className="cart-items mb-4">
                                        {cart.map(item => (
                                            <div key={item._id} className="cart-item d-flex justify-content-between align-items-start py-2">
                                                <div>
                                                    {item.testName && (
                                                        <>
                                                            <h5 className='test-name'>Test : <span className='fw-normal'>{item.testName}</span></h5>
                                                            <div className="text-muted">₹{item.discountPrice || item.actualPrice}</div>

                                                        </>
                                                    )}
                                                    {item.packageName && (
                                                        <>
                                                            <h5 className='test-name'>Package : <span className='fw-normal'>{item.packageName}</span></h5>
                                                            <div className="text-muted">₹{item.currentPrice}</div>
                                                            <button className="re-btn fs-6 mt-2" onClick={() => handleViewPackageDetails(item._id)}>
                                                                {selectedPackage === item._id ? 'Hide Tests' : 'View Tests'}
                                                            </button>
                                                            {selectedPackage === item._id && (
                                                                <ul className="list-unstyled mt-2">
                                                                    {item.testDetails.map((test, index) => (
                                                                        <li key={index} className="d-flex justify-content-between">
                                                                            <span>{test.testName}</span>
                                                                            <span>₹{test.discountPrice || test.actualPrice}</span>
                                                                        </li>
                                                                    ))}
                                                                </ul>
                                                            )}
                                                        </>
                                                    )}
                                                </div>
                                                <button className="re-btn" onClick={() => handleRemoveFromCart(item._id || item.id)}>
                                                    <i className="fa-solid fa-trash-can"></i>
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="col-md-1"></div>
                                <div className="col-md-4">
                                    <div className="cart-side">
                                        <div className="coupon p-2">
                                            <div className="appy-cop">
                                                <input type="text" placeholder='ENTER COUPON CODE' value={coupon} onChange={(e) => setCoupon(e.target.value)} />
                                                <button onClick={handleCouponApply}>Apply Coupon</button>
                                            </div>
                                            {token ? "" : (
                                                <p><small>Please Login To Apply</small></p>
                                            )}
                                        </div>

                                        <div className="totals">
                                            <div className="d-flex justify-content-between">
                                                <span>Subtotal</span>
                                                <span>₹{subtotal}</span>
                                            </div>
                                            <div className="d-flex justify-content-between">
                                                <span>Home Collection Charges</span>
                                                <span>₹{homeCollectionCharges}</span>
                                            </div>
                                            <div className="discount d-flex justify-content-between">
                                                <span>Discount</span>
                                                <span>₹{discount}</span>
                                            </div>
                                            <div className="pay d-flex justify-content-between font-weight-bold">
                                                <span>To Pay</span>
                                                <span>₹{totalToPay}</span>
                                            </div>
                                        </div>
                                        {token ? (
                                            <button className='link' onClick={handleContinue}>Continue</button>

                                        ) : (
                                            <Link className='link' to={'/login'}>Please Login to continue</Link>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                </>
            ) : (
                <>
                    <section className="container emptycart my-5">
                        <div className="row">
                            <div className="col-md-4 col-8 mx-auto ">
                                <img src={emptyCartImage} alt="Empty Cart Image" />
                            </div>
                            <div className="col-12 text-center">
                                <h1 >Sorry, Your Cart is Empty</h1>
                                <div className="view-more-container">
                                    <Link className='viewMoreBtn' to="/lab-tests">Book Your Test</Link>
                                </div>
                            </div>
                        </div>
                    </section>
                </>
            )}

        </>
    );
}

export default CartPage;
