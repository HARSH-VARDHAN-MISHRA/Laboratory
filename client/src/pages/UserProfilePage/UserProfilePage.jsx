import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './UserProfilePage.css';
import { toast } from 'react-toastify';
import MetaTag from '../../components/Meta/MetaTag';
import axios from 'axios';

const UserProfilePage = () => {
    const [activeTab, setActiveTab] = useState('profile');
    const [userData, setUserData] = useState(null); // State to hold user data
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        // Fetch user data from localStorage
        const user = JSON.parse(localStorage.getItem('labMantraUser'));
        if (user) {
            setUserData(user);

            const fetchBooking = async () => {
                try {
                    const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/get-order-by-user/${user._id}`);
                    setBookings(res.data.data);
                } catch (error) {
                    console.error("Something Issue to fetch Bookings: ", error);
                }
            };

            fetchBooking();
        }

        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
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
            <section className="bread">
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
                                <h3>Welcome {userData.name}!</h3>
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
            <table className="table ">
                <thead>
                    <tr>
                        <th>Booking ID</th>
                        <th>Test Name</th>
                        <th>Date</th>
                        <th>Status</th>
                        <th>Details</th>
                    </tr>
                </thead>
                <tbody>
                    {bookings.map((booking) => (
                        <tr key={booking._id}>
                            <td>{booking._id}</td>
                            <td>{booking.requestBody.Cart[0].formattedTestName || 'N/A'}</td> {/* Show test name or 'N/A' if not available */}
                            <td>
                                {booking.createdAt
                                    ? new Date(booking.createdAt).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })
                                    : 'Invalid Date'} {/* Handle invalid dates */}
                            </td>
                            <td>{booking.paymentStatus}</td>
                            <td>
                                <Link to={`/booking-details/${booking._id}`} className="btn btn-primary btn-sm">
                                    View Details
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
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
