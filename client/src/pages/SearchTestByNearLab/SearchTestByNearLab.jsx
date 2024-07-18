import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Loading from '../../components/Loading/Loading';
import './SearchTestByNearLab.css';

const SearchTestByNearLab = () => {
    const { testName } = useParams();
    const [labDetails, setLabDetails] = useState([]);
    const [branchDetails, setBranchDetails] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showPopup, setShowPopup] = useState(false);
    const [selectedTest, setSelectedTest] = useState(null);
    const [cart, setCart] = useState(JSON.parse(localStorage.getItem('lab-cart')) || []);

    const fetchTestNearestLab = async () => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/Search-by-test/${testName}`);
            setLabDetails(res.data.data[0].labDetails);
            setBranchDetails(res.data.data[0].branchDetails);
        } catch (error) {
            console.error("Error While Fetching the Test Nearest Labs : ", error);
        } finally {
            setLoading(false);
        }
    }

    const addToCart = (test) => {
        const newCart = [...cart, test];
        setCart(newCart);
        localStorage.setItem('lab-cart', JSON.stringify(newCart));
        setSelectedTest(test);
        setShowPopup(true);
    }

    const removeFromCart = (test) => {
        const newCart = cart.filter(item => item.id !== test.id);
        setCart(newCart);
        localStorage.setItem('lab-cart', JSON.stringify(newCart));
        setShowPopup(false); // Close popup if open
    }

    const handleClosePopup = () => {
        setShowPopup(false);
    }

    const isInCart = (test) => {
        return cart.some(item => item.id === test.id);
    }

    useEffect(() => {
        fetchTestNearestLab();

        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }, [testName]);

    return (
        <>
            <section className="bread">
                <div className="container">
                    <nav aria-label="breadcrumb ">
                        <h2>Search by {testName}</h2>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                            <li className="breadcrumb-item" aria-current="page"><Link to="/lab-tests">Lab Tests</Link></li>
                            <li className="breadcrumb-item active" aria-current="page">{testName}</li>
                        </ol>
                    </nav>
                </div>
            </section>
            <section className="lab-details my-5">
                <div className="container">
                    {loading ? (
                        <Loading />
                    ) : (
                        <>
                            <div className="row">
                                {branchDetails.map((branch, index) => (
                                    <div className="col-md-4" key={index}>
                                        <div className="card mb-4">
                                            <div className="card-body">
                                                <h5 className="card-title">{branch.branchName}</h5>
                                                <p className="card-text">Location: {branch.branchLocation}</p>
                                                <p className="card-text test-name">{testName}</p>
                                                <p className="price">
                                                    <span className='fs-4 pe-1' style={{ color: "var(--bg-dark-blue)", fontWeight: "500" }}>₹{branch.discountedPrice}</span>
                                                    <span className='text-decoration-line-through'>₹{branch.testPrice}</span>
                                                </p>
                                                <p className="card-dicount">{branch.HowManyDiscountAppliedForThisLab}% Off</p>
                                                {isInCart({ ...branch, id: `${branch.branchName}-${testName}` }) ? (
                                                    <button
                                                        className="btn btn-danger"
                                                        onClick={() => removeFromCart({
                                                            ...branch,
                                                            testName,
                                                            id: `${branch.branchName}-${testName}`,
                                                            actualPrice: branch.testPrice,
                                                            discountPrice: branch.discountedPrice,
                                                            discountPercentage: branch.HowManyDiscountAppliedForThisLab
                                                        })}
                                                    >
                                                        Remove
                                                    </button>
                                                ) : (
                                                    <button
                                                        className="btn btn-primary"
                                                        onClick={() => addToCart({
                                                            ...branch,
                                                            testName,
                                                            id: `${branch.branchName}-${testName}`,
                                                            actualPrice: branch.testPrice,
                                                            discountPrice: branch.discountedPrice,
                                                            discountPercentage: branch.HowManyDiscountAppliedForThisLab
                                                        })}
                                                    >
                                                        Book Test
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="row">
                                {labDetails.map((lab, index) => (
                                    <div className="col-md-4" key={index}>
                                        <div className="card mb-4">
                                            <div className="card-body">
                                                <h5 className="card-title">{lab.labName}</h5>
                                                <p className="card-text">Location: {lab.labLocation}</p>
                                                <p className="card-text test-name">{testName}</p>
                                                <p className="price">
                                                    <span className='fs-4 pe-1' style={{ color: "var(--bg-dark-blue)", fontWeight: "500" }}>₹{lab.discountedPrice}</span>
                                                    <span className='text-decoration-line-through'>₹{lab.testPrice}</span>
                                                </p>
                                                <p className="card-dicount">{lab.discountPercentage}% Off</p>
                                                {isInCart({ ...lab, id: `${lab.labName}-${testName}` }) ? (
                                                    <button
                                                        className="btn btn-danger"
                                                        onClick={() => removeFromCart({
                                                            ...lab,
                                                            testName,
                                                            id: `${lab.labName}-${testName}`,
                                                            actualPrice: lab.testPrice,
                                                            discountPrice: lab.discountedPrice,
                                                            discountPercentage: lab.discountPercentage,
                                                            Branch: lab.Branch
                                                        })}
                                                    >
                                                        Remove
                                                    </button>
                                                ) : (
                                                    <button
                                                        className="btn btn-primary"
                                                        onClick={() => addToCart({
                                                            ...lab,
                                                            testName,
                                                            id: `${lab.labName}-${testName}`,
                                                            actualPrice: lab.testPrice,
                                                            discountPrice: lab.discountedPrice,
                                                            discountPercentage: lab.discountPercentage,
                                                            Branch: lab.Branch
                                                        })}
                                                    >
                                                        Book Test
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </section>
            {showPopup && selectedTest && (
                <div className="cart-popup">
                    <div className="popup-content">
                        <h4>Test Added to Cart</h4>
                        <p><strong>Test Name:</strong> {selectedTest.testName}</p>
                        <p><strong>Lab:</strong> {selectedTest.labName}</p>
                        <p><strong>Location:</strong> {selectedTest.labLocation || selectedTest.branchLocation}</p>
                        <p><strong>Price:</strong> ₹{selectedTest.actualPrice}</p>
                        <p><strong>Discounted Price:</strong> ₹{selectedTest.discountPrice}</p>
                        <div className="popup-buttons">
                            <button className="btn btn-secondary" onClick={handleClosePopup}>Add More Tests</button>
                            <Link to="/cart" className="btn btn-primary">Proceed for Booking</Link>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default SearchTestByNearLab;
