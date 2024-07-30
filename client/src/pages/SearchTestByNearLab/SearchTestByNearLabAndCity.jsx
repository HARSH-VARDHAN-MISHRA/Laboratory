import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Loading from '../../components/Loading/Loading';
import './SearchTestByNearLab.css';

const SearchTestByNearLabAndCity = () => {
    const QueryParams = new URLSearchParams(window.location.search)
    const testName = QueryParams.get('TestName')
    const longitude = QueryParams.get('longitude')
    const latitude = QueryParams.get('latitude')
    const PinCode = QueryParams.get('PinCode')
    const City = QueryParams.get('City')

    // console.log("TestName", testName);
    // console.log("longitude", longitude);
    // console.log("latitude", latitude);
    // console.log("PinCode", PinCode);
    // console.log("City", City);

    const [labDetails, setLabDetails] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showPopup, setShowPopup] = useState(false);
    const [selectedTest, setSelectedTest] = useState(null);
    const [cart, setCart] = useState(JSON.parse(localStorage.getItem('lab-cart')) || []);
    const navigate = useNavigate()
    const formattedTestName = testName.replace(/-/g, ' ');
    const fetchTestNearestLab = async () => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/lab/get-all-Tests/${formattedTestName}`);
            // const data = res.data.data;
            setLabDetails(res.data.data);
            
            // This is for our Future aspects to Filter it by the City and pincode
            // let dataFilter;
            // if (City || PinCode) {
            //     dataFilter = data.filter((item) => item.pinCode === PinCode || item.city === City)
            // }
            
            // setLabDetails(dataFilter)
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
        navigate('/')
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
    }, []);

    return (
        <>
            <section className="bread">
                <div className="container">
                    <nav aria-label="breadcrumb ">
                        <h2>Search by {formattedTestName}</h2>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                            <li className="breadcrumb-item" aria-current="page"><Link to="/lab-tests">Lab Tests</Link></li>
                            <li className="breadcrumb-item active" aria-current="page">{formattedTestName}</li>
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
                            {labDetails && labDetails.length > 0 ? (
                                <>
                                    <div className="row">
                                        {labDetails.map((lab, index) => (
                                            <div className="col-md-4" key={index}>
                                                <div className="card mb-4">
                                                    <div className="card-body">
                                                        <h5 className="card-title">{lab.labName}</h5>
                                                        <p className="card-text"><strong>Location:</strong> {lab.labLocation}</p>
                                                        <p className="card-text test-name">{formattedTestName}</p>
                                                        {lab.discountPercentage && lab.discountPercentage > 0 ? (
                                                            <>
                                                                <p className="price">
                                                                    <span className='fs-4 pe-1' style={{ color: "var(--bg-dark-blue)", fontWeight: "500" }}>₹{lab.discountPrice.toFixed(0)}</span>
                                                                    <span className='text-decoration-line-through'>₹{lab.price.toFixed(0)}</span>
                                                                </p>
                                                            </>
                                                        ) : (
                                                            <>
                                                                <p className="price">
                                                                    <span className='fs-4 pe-1' style={{ color: "var(--bg-dark-blue)", fontWeight: "500" }}>₹{lab.price.toFixed(0)}</span>

                                                                </p>

                                                            </>
                                                        )}

                                                        {lab.discountPercentage && lab.discountPercentage > 0 ? (
                                                            <p className="card-dicount">{lab.discountPercentage.toFixed(0)}% Off</p>
                                                        ) : null}

                                                        {isInCart({ ...lab, id: `${lab.labName}-${testName}` }) ? (
                                                            <button
                                                                className="btn btn-danger"
                                                                onClick={() => removeFromCart({
                                                                    ...lab,
                                                                    formattedTestName,
                                                                    id: `${lab.labName}-${testName}`,
                                                                    actualPrice: lab.price,
                                                                    discountPrice: lab.discountPrice,
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
                                                                    formattedTestName,
                                                                    id: `${lab.labName}-${testName}`,
                                                                    actualPrice: lab.price,
                                                                    discountPrice: lab.discountPrice,
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
                            ) : (
                                <section className="no-results my-5">
                                    <div className="container text-center">
                                        <div className="alert alert-warning" style={{
                                            backgroundColor: "var(--bg-light-green)",
                                            color: "var(--bg-dark-blue)",
                                            padding: "20px",
                                            borderRadius: "10px",
                                            fontSize: "1.25rem",
                                            fontWeight: "bold"
                                        }}>
                                            <h1>No Results Found</h1>
                                            <p style={{ marginTop: "10px" }}>Unfortunately, there are no labs available in your area at this time.</p>
                                        </div>
                                    </div>
                                </section>

                            )}
                        </>
                    )}
                </div>
            </section>
            {showPopup && selectedTest && (
                <div className="cart-popup">
                    <div className="popup-content">
                        <h4>Test Added to Cart</h4>
                        <p><strong>Test Name:</strong> {selectedTest.formattedTestName}</p>
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

export default SearchTestByNearLabAndCity;
