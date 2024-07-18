import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './BookingForm.css';
import axios from 'axios';

const BookingForm = () => {
    const navigate = useNavigate();

    const [bookingType, setBookingType] = useState('homeCollection');
    const [formData, setFormData] = useState({
        fullName: '',
        phone: '',
        optionalPhone: '',
        email: '',
        date: '',
        age: '',
        gender: '',
        pinCode: '',
        city: '',
        address: '',
        labName: '',
        labAddress: '',
        labId:'',
        labEmail:'',
        appointTime: '',
        bookingType: 'homeCollection' // To track the current booking type
    });
    const [labDetails, setLabDetails] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const generateTimeOptions = () => {
        const times = [];
        for (let hour = 9; hour < 20; hour++) {
            const nextHour = hour + 1;
            const period = hour < 12 ? 'AM' : 'PM';
            const nextPeriod = nextHour < 12 ? 'AM' : 'PM';
            const displayHour = hour <= 12 ? hour : hour - 12;
            const displayNextHour = nextHour <= 12 ? nextHour : nextHour - 12;
            times.push(`${displayHour}:00 ${period} - ${displayNextHour}:00 ${nextPeriod}`);
        }
        return times;
    };

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [id]: value
        }));

        if (id === 'city' || id === 'pinCode') {
            const city = id === 'city' ? value : formData.city;
            const pinCode = id === 'pinCode' ? value : formData.pinCode;
            if (city && pinCode) {
                fetchLabDetailsByCityAndPincode(pinCode, city);
            }
        }

        if (id === 'labName') {
            const selectedLab = labDetails.find(lab => lab.LabName === value);
            if (selectedLab) {
                setFormData((prevFormData) => ({
                    ...prevFormData,
                    labAddress: selectedLab.address,
                    labEmail: selectedLab.email,
                    labId: selectedLab._id,


                }));
            }
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(e);
        sessionStorage.setItem('bookingFormData', JSON.stringify(formData));
        navigate('/cart/booking-summary');
    };

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }, []);

    const stateNames = [
        "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa",
        "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala",
        "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland",
        "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
        "Uttar Pradesh", "Uttarakhand", "West Bengal", "Andaman and Nicobar Islands",
        "Chandigarh", "Dadra and Nagar Haveli and Daman and Diu", "Lakshadweep", "Delhi",
        "Puducherry", "Ladakh", "Jammu and Kashmir"
    ];

    const statesOptions = stateNames.map((state, index) => (
        <option key={index} value={state}>{state}</option>
    ));

    const fetchLabDetailsByCityAndPincode = async (pinCode, city) => {
        setLoading(true);
        try {
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/lab-info-by-pincode?pinCode=${pinCode}&city=${city}`);
            setLabDetails(response.data);
            setError('');
        } catch (error) {
            console.log(error);
            setError('Failed to fetch labs. Please try again later.');
            setLabDetails([]);
        } finally {
            setLoading(false);
        }
    };

    const renderLabOptions = () => {
        if (loading) {
            return <option>Loading labs...</option>;
        }
        if (error) {
            return <option>{error}</option>;
        }
        if (labDetails.length === 0) {
            return <option>No labs available in this area.</option>;
        }
        return labDetails.map((lab, index) => (
            <option key={index} value={lab.name}>{lab.LabName}</option>
        ));
    };

    return (
        <>
            <section className="bread">
                <div className="container">
                    <nav aria-label="breadcrumb">
                        <h2>Add Booking Details</h2>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                            <li className="breadcrumb-item" aria-current="page"><Link to="/cart">Cart</Link></li>
                            <li className="breadcrumb-item active" aria-current="page">Add Booking Details</li>
                        </ol>
                    </nav>
                </div>
            </section>

            {/* === Booking Form === */}
            <section className="booking-form">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 mx-auto">
                            <div className="form-group">
                                <label htmlFor="bookingType"><h2>Select Booking Type:</h2></label>
                                <select
                                    id="bookingType"
                                    className="form-control"
                                    value={bookingType}
                                    onChange={(e) => {
                                        setBookingType(e.target.value);
                                        setFormData({
                                            ...formData,
                                            bookingType: e.target.value
                                        });
                                    }}
                                >
                                    <option value="homeCollection">Home Collection</option>
                                    <option value="labAppointment">Appointment in the Lab</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="row forms">
                        <div className="col-md-8 mx-auto">
                            {bookingType === 'homeCollection' && (
                                <form className="home-collection-form mt-4" onSubmit={handleSubmit}>
                                    <h3 className='h2 mb-3'>Home Collection Details</h3>
                                    <div className="row g-3">
                                        <h4>Personal Details</h4>
                                        <div className="col-md-6">
                                            <label htmlFor="fullName">Full Name: <span className='text-danger'>*</span></label>
                                            <input
                                                type="text"
                                                id="fullName"
                                                className="form-control"
                                                value={formData.fullName}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <label htmlFor="phone">Phone Number: <span className='text-danger'>*</span></label>
                                            <input
                                                type="tel"
                                                id="phone"
                                                className="form-control"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <label htmlFor="optionalPhone">Optional Second Number:</label>
                                            <input
                                                type="tel"
                                                id="optionalPhone"
                                                className="form-control"
                                                value={formData.optionalPhone}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <label htmlFor="email">Email ID (optional):</label>
                                            <input
                                                type="email"
                                                id="email"
                                                className="form-control"
                                                value={formData.email}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <label htmlFor="date">Preferred Date: <span className='text-danger'>*</span></label>
                                            <input
                                                type="date"
                                                id="date"
                                                className="form-control"
                                                value={formData.date}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <label htmlFor="age">Age: <span className='text-danger'>*</span></label>
                                            <input
                                                type="number"
                                                id="age"
                                                className="form-control"
                                                value={formData.age}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <label htmlFor="gender">Gender:<span className='text-danger'>*</span></label>
                                            <select
                                                id="gender"
                                                className="form-control"
                                                value={formData.gender}
                                                onChange={handleChange}
                                                required
                                            >
                                                <option value="">Select Gender</option>
                                                <option value="male">Male</option>
                                                <option value="female">Female</option>
                                                <option value="other">Other</option>
                                            </select>
                                        </div>
                                        <div className="col-md-6">
                                            <label htmlFor="city">City:<span className='text-danger'>*</span></label>
                                            <select
                                                id="city"
                                                className="form-control"
                                                value={formData.city}
                                                onChange={handleChange}
                                                required
                                            >
                                                <option value="">Select City</option>
                                                {statesOptions}
                                            </select>
                                        </div>
                                        <div className="col-md-6">
                                            <label htmlFor="pinCode">Pincode:<span className='text-danger'>*</span></label>
                                            <input
                                                type="text"
                                                id="pinCode"
                                                className="form-control"
                                                value={formData.pinCode}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <label htmlFor="address">Address:<span className='text-danger'>*</span></label>
                                            <input
                                                type="text"
                                                id="address"
                                                className="form-control"
                                                value={formData.address}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                        <hr />
                                        {/* <div className="col-md-6">
                                            <label htmlFor="labName">Lab Name:<span className='text-danger'>*</span></label>
                                            <select
                                                id="labName"
                                                className="form-control"
                                                value={formData.labName}
                                                onChange={handleChange}
                                                required
                                            >
                                                <option value="">Select Lab</option>
                                                {renderLabOptions()}
                                            </select>
                                        </div>
                                        <div className="col-md-6">
                                            <label htmlFor="labAddress">Lab Address:</label>
                                            <textarea
                                                id="labAddress"
                                                className="form-control"
                                                value={formData.labAddress}
                                                readOnly
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <label htmlFor="labAddress">Lab Email:</label>
                                            <input
                                                id="labEmail"
                                                type='text'
                                                className="form-control"
                                                value={formData.labEmail}
                                                readOnly
                                            />
                                        </div> */}
                                        <div className="col-md-6">
                                            <label htmlFor="appointTime">Preferred Time:</label>
                                            <select
                                                id="appointTime"
                                                className="form-control"
                                                value={formData.appointTime}
                                                onChange={handleChange}
                                            >
                                                <option value="">Select Time</option>
                                                {generateTimeOptions().map((time, index) => (
                                                    <option key={index} value={time}>{time}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>

                                    <button type="submit" className="btn btn-primary mt-3">
                                        Add Details
                                    </button>
                                </form>
                            )}

                            {bookingType === 'labAppointment' && (
                                <form className="lab-appointment-form mt-4" onSubmit={handleSubmit}>
                                    <h3 className='h2 mb-3'>Lab Appointment Details</h3>
                                    <div className="row g-3">
                                        <h4>Personal Details</h4>
                                        <div className="col-md-6">
                                            <label htmlFor="fullName">Full Name: <span className='text-danger'>*</span></label>
                                            <input
                                                type="text"
                                                id="fullName"
                                                className="form-control"
                                                value={formData.fullName}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <label htmlFor="phone">Phone Number: <span className='text-danger'>*</span></label>
                                            <input
                                                type="tel"
                                                id="phone"
                                                className="form-control"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <label htmlFor="optionalPhone">Optional Second Number:</label>
                                            <input
                                                type="tel"
                                                id="optionalPhone"
                                                className="form-control"
                                                value={formData.optionalPhone}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <label htmlFor="email">Email ID (optional):</label>
                                            <input
                                                type="email"
                                                id="email"
                                                className="form-control"
                                                value={formData.email}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <label htmlFor="date">Preferred Date: <span className='text-danger'>*</span></label>
                                            <input
                                                type="date"
                                                id="date"
                                                className="form-control"
                                                value={formData.date}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <label htmlFor="age">Age: <span className='text-danger'>*</span></label>
                                            <input
                                                type="number"
                                                id="age"
                                                className="form-control"
                                                value={formData.age}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <label htmlFor="gender">Gender:<span className='text-danger'>*</span></label>
                                            <select
                                                id="gender"
                                                className="form-control"
                                                value={formData.gender}
                                                onChange={handleChange}
                                                required
                                            >
                                                <option value="">Select Gender</option>
                                                <option value="male">Male</option>
                                                <option value="female">Female</option>
                                                <option value="other">Other</option>
                                            </select>
                                        </div>
                                        <div className="col-md-6">
                                            <label htmlFor="city">City:<span className='text-danger'>*</span></label>
                                            <select
                                                id="city"
                                                className="form-control"
                                                value={formData.city}
                                                onChange={handleChange}
                                                required
                                            >
                                                <option value="">Select City</option>
                                                {statesOptions}
                                            </select>
                                        </div>
                                        <div className="col-md-6">
                                            <label htmlFor="pinCode">Pincode:<span className='text-danger'>*</span></label>
                                            <input
                                                type="text"
                                                id="pinCode"
                                                className="form-control"
                                                value={formData.pinCode}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <label htmlFor="labName">Lab Name:<span className='text-danger'>*</span></label>
                                            <select
                                                id="labName"
                                                className="form-control"
                                                value={formData.labName}
                                                onChange={handleChange}
                                                required
                                            >
                                                <option value="">Select Lab</option>
                                                {renderLabOptions()}
                                            </select>
                                        </div>
                                        <div className="col-md-6">
                                            <label htmlFor="labAddress">Lab Address:</label>
                                            <textarea
                                                id="labAddress"
                                                className="form-control"
                                                value={formData.labAddress}
                                                readOnly
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <label htmlFor="appointTime">Preferred Time:</label>
                                            <select
                                                id="appointTime"
                                                className="form-control"
                                                value={formData.appointTime}
                                                onChange={handleChange}
                                            >
                                                <option value="">Select Time</option>
                                                {generateTimeOptions().map((time, index) => (
                                                    <option key={index} value={time}>{time}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>

                                    <button type="submit" className="btn btn-primary mt-3">
                                        Add Details
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default BookingForm;
