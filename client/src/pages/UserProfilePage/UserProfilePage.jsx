import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './UserProfilePage.css';
import { toast } from 'react-toastify';
import MetaTag from '../../components/Meta/MetaTag';
import axios from 'axios';


const UserProfilePage = () => {
    const [activeTab, setActiveTab] = useState('profile');
    const [userData, setUserData] = useState(null); // State to hold user data

    const [bookings,setBookings] = useState([]);
    

    
    
      useEffect(() => {
          
        // Fetch user data from localStorage
        const user = JSON.parse(localStorage.getItem('labMantraUser'));
        if (user) {
            setUserData(user);
        }
        

        const fetchBooking = async () => {
            try {
              const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/get-order-by-user/${user._id}`);
              console.log(res.data.data);
              setBookings(res.data.data);
            } catch (error) {
              console.error("Something Issue to fetch Bookings: ", error);
            }
          };

          fetchBooking()
        window.scrollTo({
            top:0,
            behavior:'smooth'
        })
    }, []); // Empty dependency array ensures this runs only once on component mount

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    const handleLogout = () => {
        
        localStorage.removeItem('labMantraToken');
        localStorage.removeItem('labMantraUser');
        toast.success('Logged out successfully');

        window.location.href = '/login'; 
    };

    return (
        <>
            <MetaTag
                title="Your Profile - Lab Mantra"
                description="View and manage your Lab Mantra user profile. Check your bookings, update personal information, and logout securely."
                keyword="Lab Mantra, user profile, bookings, logout"
            />
            <section className="bread" >
                <div className="container">
                    <nav aria-label="breadcrumb">
                        <h2>Your Profile</h2>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                            <li className="breadcrumb-item active" aria-current="page">Your Profile</li>
                        </ol>
                    </nav>
                </div>
            </section>
            <section className="profile-tabs">
                <div className="container">
                    <ul className="nav nav-tabs">
                        <li className="nav-item">
                            <button
                                className={`nav-link ${activeTab === 'profile' ? 'active' : ''}`}
                                onClick={() => handleTabChange('profile')}
                            >
                                My Profile
                            </button>
                        </li>
                        <li className="nav-item">
                            <button
                                className={`nav-link ${activeTab === 'bookings' ? 'active' : ''}`}
                                onClick={() => handleTabChange('bookings')}
                            >
                                My Bookings
                            </button>
                        </li>
                        {/* <li className="nav-item">
                            <button
                                className={`nav-link ${activeTab === 'reports' ? 'active' : ''}`}
                                onClick={() => handleTabChange('reports')}
                            >
                                My Reports
                            </button>
                        </li> */}
                    </ul>

                    <div className="tab-content">
                        {activeTab === 'profile' && userData && (
                            <div className="tab-pane active">
                                <h3>Welcome {userData.name} !</h3>
                                <p>Name: {userData.name}</p>
                                <p>Email: {userData.email}</p>
                                <p>Phone Number: {userData.phoneNumber}</p>
                                <p>Joined: {new Date(userData.createdAt).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}</p>

                                <button className="btn btn-danger" onClick={handleLogout}>Logout</button>

                            </div>
                        )}
                       {activeTab === 'bookings' && (
          <div className="tab-pane active">
            <h3>My Booking History</h3>
            {bookings.length === 0 ? (
              <p>No bookings yet.</p>
            ) : (
              bookings.map(booking => (
                <div key={booking._id} className="booking">
                  <h4>Booking Details:</h4>
                  <ul>
                    <li><strong>Transaction ID:</strong> {booking._id}</li>
                    <li><strong>Amount Paid:</strong> ₹{booking.totalToPay}</li>
                    <li><strong>Payment Status:</strong> {booking.paymentStatus}</li>
                    <li><strong>Appointment Time:</strong> {booking.appointTime}</li>
                    <li><strong>Lab Name:</strong> {booking.fullName}</li>
                    {/* <li><strong>Address:</strong> {booking.labAddress || "N/A"}</li> */}
                  </ul>
                  <h4>Test Details:</h4>
                  {booking.cartDetails.map((item, index) => (
                    <ul key={index}>
                      {/* <li><strong>Package Name:</strong> {item.packageName || "N/A"}</li>
                      <li><strong>Test Quantity:</strong> {item.testQuantity || "N/A"}</li>
                      <li><strong>Test Group Quantity:</strong> {item.testGroupQuantity || "N/A"}</li> */}
                      <li><strong>Actual Price:</strong> ₹{item.actualPrice || "N/A"}</li>
                      {/* <li><strong>Current Price:</strong> ₹{item.currentPrice || "N/A"}</li> */}
                      <li><strong>Off Percentage:</strong> {item.offPercentage}%</li>
               
                      {/* <li><strong>Discount Applied For This Lab:</strong> {item.HowManyDiscountAppliedForThisLab}</li> */}
                      {/* <li><strong>Test Price:</strong> ₹{item.testPrice || "N/A"}</li> */}
                      {/* <li><strong>Discounted Price:</strong> ₹{item.discountedPrice || "N/A"}</li> */}
                      {/* <li><strong>Discount Percentage:</strong> {item.discountPercentage}%</li> */}
                      <li><strong>Test Details:</strong>
                        <ul>
                          {item.testDetails.map((test, index) => (
                            <li key={index}>{test.testName}</li>
                          ))}
                        </ul>
                      </li>
                    </ul>
                  ))}
                </div>
              ))
            )}
          </div>
        )}
                        {activeTab === 'reports' && (
                            <div className="tab-pane active">
                                <h3>My Reports</h3>
                                {/* Placeholder for reports */}
                                <p>No reports yet.</p>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </>
    );
}

export default UserProfilePage;
