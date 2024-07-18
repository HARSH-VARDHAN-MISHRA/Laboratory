import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Header.css'
import logo from '../../Assets/logo.png'
import axios from 'axios'

const Header = () => {
    const [toogleMenu,setToogleMenu] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [allTestNames, setAllTestNames] = useState([]);
    const navigate = useNavigate();

    const handleOpenMenu = () =>{
        setToogleMenu(true);
    }
    const handleCloseMenu = () =>{
        setToogleMenu(false);
    }

    useEffect(() => {
        // Fetch test names from API
        const fetchTestNames = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/get-all-test`);
                if (response.data.success) {
                    const testNames = response.data.data.map(test => test.testName);
                    setAllTestNames(testNames);
                } else {
                    console.error('Failed to fetch test names:', response.data.message);
                }
            } catch (error) {
                console.error('Error fetching test names:', error);
            }
        };

        fetchTestNames();
    }, []);

    const handleInputChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
    };

    // Filter test names based on input value
    const filteredTests = allTestNames.filter((test) =>
        test.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Redirect to test details page
    const handleTestClick = (testName) => {
        // navigate(`/lab-tests/${testName.replace(/ /g, '-')}`);
        navigate(`/find-your-test/${testName}`);
        setSearchTerm("")
    };

    const token = localStorage.getItem('labMantraToken')
    const User = localStorage.getItem("labMantraUser")
    const user = JSON.parse(User)

    // Ensure 'lab-cart' is not null before accessing its length
    const cart = JSON.parse(localStorage.getItem('lab-cart')) || [];
    const cartLength = cart.length;

    // const handleScroll = () => {
    //     const header = document.querySelector('header');
    //     if (header) {
    //         if (window.scrollY > 500) {
    //             header.classList.add('fixed-header');
    //         } else {
    //             header.classList.remove('fixed-header');
    //         }
    //     }
    // };
    
    // // Attach scroll event listener when component mounts
    // React.useEffect(() => {
    //     window.addEventListener('scroll', handleScroll);
    //     return () => window.removeEventListener('scroll', handleScroll);
    // }, []);

  return (
    <>
        <header>
            <div className="top-head header">
                <div className="calls">
                    <a href="tel:+918826936006"> <i className="fa-solid fa-phone-volume"></i>+91-8826936006</a>
                </div>
                <div className="search-bar">
                    <input 
                        type="text"
                        name="search"
                        value={searchTerm}
                        onChange={handleInputChange}
                        placeholder="Search for tests..."
                        autoComplete="off"
                    />
                    <i className="fa-solid fa-magnifying-glass"></i>

                    {/* Suggested Test Names */}
                    {searchTerm && filteredTests.length > 0 && (
                        <div className="suggested-tests">
                            <ul>
                                {filteredTests.map((test, index) => (
                                    <li key={index}><div  onClick={() => handleTestClick(test)} >{test}</div></li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
                <div className="book-btn">
                    {/* <Link to="/book-test" >
                        Book a Test
                    </Link> */}
                </div>
            </div>

            <nav className='active'>
                <div className="logo">
                    <Link to="/">
                        <img src={logo} alt="logo" />
                    </Link>
                </div>
                <div className={`links `}>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/about-us">About Us</Link></li>
                        <li><Link to="/lab-tests">Book Test</Link></li>
                        <li><Link to="/our-packages">Our Packages</Link></li>
                        <li><Link to="/report-status">Check Report</Link></li>
                        <li><Link to="/contact-us">Contact Us</Link></li>
                        <div className="closeToggleMenu" onClick={handleCloseMenu}>
                            <i className="fa-solid fa-xmark"></i>
                        </div>
                    </ul>
                </div>
                <div className="tabs">
                    {token ? (
                        <Link to="/profile" className='profile'>
                            <i className="fa-solid fa-circle-user"></i>
                        </Link>

                    ) : (
                        <div >
                            <Link to="/login" className='profile fs-6'> Login </Link> <span style={{color:"var(--bg-dark-blue)"}}>|</span>
                            <Link to="/sign-up" className='profile fs-6'> Create </Link>
                        </div>
                    )}
                    <Link to="/cart" className='cart'>
                        <i className="fa-solid fa-cart-plus"></i>
                        <div className="number">
                        {cartLength}
                        </div>
                    </Link>
                    <div className="toogle-bar" onClick={handleOpenMenu}>
                        <i className="fa-solid fa-bars"></i>
                    </div>
                </div>

            </nav>
        </header>

        <section className={`side-navbar ${toogleMenu ? 'active' : ''}`}>
            <div className="inside">
                <div className="upper">
                    <div className="flex mb-2">
                        <div >
                            
                        </div>
                        <div className="close" onClick={handleCloseMenu}>
                            <i className="fa-solid fa-xmark"></i>
                        </div>

                    </div>
                    <div className="nav-link">
                        <ul>
                            <li><Link onClick={handleCloseMenu} to="/">Home</Link></li>
                            <li><Link onClick={handleCloseMenu} to="/lab-tests">Book Test</Link></li>
                            <li><Link onClick={handleCloseMenu} to="/our-packages">Our Packages</Link></li>
                            <li><Link onClick={handleCloseMenu} to="/report-status">Check Report</Link></li>
                            <li><Link onClick={handleCloseMenu} to="/about-us">About Us</Link></li>
                            <li><Link onClick={handleCloseMenu} to="/contact-us">Contact Us</Link></li>
                        </ul>
                    </div>
                    
                    <div className="circle-icon flex">
                        <Link to="/cart" className="cart" onClick={handleCloseMenu} >
                            <i className="fa-solid fa-cart-plus"></i>
                        </Link>
                        <Link to={'/'} onClick={handleCloseMenu}>
                            <i className="fa-solid fa-house"></i>
                        </Link>
                    </div>
                </div>
                {token ? (
                    <div className="lower">
                        <div className="links">
                            <h5 className='text-center'>Welcome, {user.name}!</h5>
                            <Link to={`/profile`} className='w-100 d-block ' onClick={handleCloseMenu}>View Profile</Link>
                        </div>
                    </div>
                ) : (
                    <div className="lower">
                        <p className='text-center text-danger' > Please Login or Register to access personalized lab services.</p>
                        <div className="links flex">
                            <Link to={`/login`} onClick={handleCloseMenu}>LOGIN</Link>
                            <Link to={`/sign-in`} onClick={handleCloseMenu}>SIGN IN</Link>
                        </div>
                    </div>
                )}
            </div>

        </section>


        {/*  ----------Whatsapp---------- */}
        <a href="https://api.whatsapp.com/send?phone=918826936006" target="_blank" className="whatsapp_float"><i className="fa-brands fa-whatsapp whatsapp-icon"></i></a>

    </>
  )
}

export default Header