import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import Loading from '../../components/Loading/Loading';
import MetaTag from '../../components/Meta/MetaTag';

const PackageByTitlePage = () => {
    const { packagename } = useParams(); // Retrieve the package name from the URL parameter

    const [packageTitles, setPackageTitles] = useState([]);
    const [loadingTitles, setLoadingTitles] = useState(true);
    const [packages, setPackages] = useState([]);
    const [loadingPackages, setLoadingPackages] = useState(true);
    const [testCategories, setTestCategories] = useState([]);
    const [loadingTestCategories, setLoadingTestCategories] = useState(true);
    const [hoveredCategory, setHoveredCategory] = useState(null);
    const [cart, setCart] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const [popupMessage, setPopupMessage] = useState('');

    const fetchPackageTitles = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/get-all-package-title`);
            setPackageTitles(response.data.data);
            console.log('Package Titles:', response.data.data); // Debug log
        } catch (error) {
            console.error("Error while fetching the package titles:", error);
        } finally {
            setLoadingTitles(false);
        }
    };

    const fetchPackages = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/get-all-package`);
            setPackages(response.data.data);
            console.log('Packages:', response.data.data); // Debug log
        } catch (error) {
            console.error("Error while fetching the packages:", error);
        } finally {
            setLoadingPackages(false);
        }
    };

    const fetchTestCategories = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/get-all-test-category`);
            setTestCategories(response.data.data);
            console.log('Test Categories:', response.data.data); // Debug log
        } catch (error) {
            console.error("Error while fetching the test categories:", error);
        } finally {
            setLoadingTestCategories(false);
        }
    };

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
          })
        fetchPackageTitles();
        fetchPackages();
        fetchTestCategories();
        const storedCart = JSON.parse(localStorage.getItem('lab-cart')) || [];
        setCart(storedCart);
    }, []);

    const getPackageDetails = (packageId) => {
        return packages.find(pack => pack._id === packageId);
    };

    const getTestCategoryName = (testCategoryId) => {
        const category = testCategories.find(category => category._id === testCategoryId);
        return category ? `${category.testCategoryName} (${category.testNumber})` : 'Unknown Category';
    };



    const handleAddToCart = (packageId) => {
        const packageDetails = getPackageDetails(packageId);
        if (!packageDetails) return;

        let updatedCart = [...cart];
        let message = '';
        if (cart.some(item => item._id === packageDetails._id)) {
            updatedCart = updatedCart.filter(item => item._id !== packageDetails._id);
            message = `${packageDetails.packageName} Removed from cart`;
        } else {
            updatedCart.push(packageDetails);
            message = `${packageDetails.packageName} added to cart`;
        }
        setCart(updatedCart);
        localStorage.setItem('lab-cart', JSON.stringify(updatedCart));
        setPopupMessage(message);
        setShowPopup(true);
        setTimeout(() => {
            setShowPopup(false);
        }, 2000);
    };
    
    return (
        <>
            <MetaTag
                title={`${packagename} - Lab Mantra`}
                description={`Explore the ${packagename} package offered by Lab Mantra. Comprehensive diagnostic services designed for your health needs.`}
                keyword={`Lab Mantra, ${packagename}, healthcare packages, diagnostic services`}
            />
            <section className="bread">
                <div className="container">
                    <nav aria-label="breadcrumb ">
                        <h2>{packagename}</h2>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                            <li className="breadcrumb-item"><Link to="/our-packages">Our Packages</Link></li>
                            <li className="breadcrumb-item active" aria-current="page">{packagename}</li>
                        </ol>
                    </nav>
                </div>
            </section>

            {loadingTitles || loadingPackages || loadingTestCategories ? (
                <Loading />
            ) : (
                packageTitles.filter(item => item.packageTitle === packagename).map((item, index) => (
                    <div key={index}>
                        
                        <section className="packages my-5">
                            <div className="container">
                                <div className="grid-3">
                                    {item.packagesId.slice(0, 6).map((pack, idx) => {
                                        const packageDetails = getPackageDetails(pack._id);
                                        if (!packageDetails) return null;

                                        return (
                                            <div className="single-package" key={idx}>
                                                <div className="main-head">
                                                    <h4>{pack.packageName}</h4>
                                                    <div className="flex">
                                                        <small>({pack.testGroupQuantity} Tests)</small>
                                                        <div className="price">
                                                            <div className="current_price">{packageDetails.currentPrice}</div>
                                                            <small className="actual_price">{packageDetails.actualPrice}</small>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="test-cate">
                                                    {pack.testCategoryId.map((testId, ind) => {
                                                        const category = testCategories.find(category => category._id === testId);
                                                        if (!category) return null; // Handle case where category is not found

                                                        return (
                                                            <div className="single" key={ind}
                                                                 onMouseEnter={() => setHoveredCategory(testId)}
                                                                 onMouseLeave={() => setHoveredCategory(null)}>
                                                                <div className="naam">{getTestCategoryName(testId)}</div>
                                                                {hoveredCategory === testId && (
                                                                    <div className="test-names">
                                                                        {category.testId.map((test, index) => (
                                                                            <div key={index}>{test.testName} ,</div>
                                                                        ))}
                                                                    </div>
                                                                )}
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                                <div className="content">
                                                    <div className="book-btn">
                                                        {cart.some(item => item._id === packageDetails._id) ? (
                                                            <button onClick={() => handleAddToCart(pack._id)}>REMOVE</button>
                                                        ) : (
                                                            <button onClick={() => handleAddToCart(pack._id)}>Book Now <i className="fa-solid fa-flask-vial"></i></button>
                                                        )}
                                                        {/* <Link to="/cart">Book Now <i className="fa-solid fa-flask-vial"></i></Link> */}
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                                
                            </div>
                        </section>
                    </div>
                ))
            )}
            {showPopup && (
                <div className="popup">
                    <p>{popupMessage}</p>
                </div>
            )}

        </>
    );
};

export default PackageByTitlePage;
