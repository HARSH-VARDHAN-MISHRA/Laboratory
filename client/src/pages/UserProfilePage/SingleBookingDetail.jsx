import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

const SingleBookingDetail = () => {
    const { _id } = useParams();
    const [singleBooking, setSingleBooking] = useState([]);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('labMantraUser'));
        if (user) {
            const fetchBooking = async () => {
                try {
                    const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/lab/reports/order/${_id}`);
                    const singleBookingData = res.data.data;
                    setSingleBooking(singleBookingData);
                } catch (error) {
                    console.error("Error fetching booking id Detail: ", error);
                }
            };

            fetchBooking();
        }

        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }, []);

    // if (singleBooking.length === 0) {
    //     return <div className="text-center my-5">Loading...</div>;
    // }

    return (
        <>
            <section className="bread">
                <div className="container">
                    <nav aria-label="breadcrumb ">
                        <h2>Booking Details</h2>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                            <li className="breadcrumb-item"><Link to="/profile">Profile</Link></li>
                            <li className="breadcrumb-item active" aria-current="page">Booking Details</li>
                        </ol>
                    </nav>
                </div>
            </section>
            <div className="container my-5">
                <div className="row">
                {singleBooking.length > 0 ? (
                    <>
                    
                    {singleBooking.map((booking) => (
                        <div key={booking._id} className="col-md-4 mb-4">
                            <div className="card shadow-sm book-confirm">
                            <div className="card-body">
                                <h5 className="card-title text-info">Report ID : {booking.ReportId}</h5>
                                <p className="card-text"><strong>Patient ID :</strong> {booking.PatientId}</p>
                                <p className="card-text"><strong>Report Link :</strong> <a href={booking.ReportLink} target="_blank" rel="noopener noreferrer">Report Link</a></p>
                                <p className="card-text"><strong>Status of Link :</strong> {booking.StatusOfLink}</p>
                                <p className="card-text"><strong>Report Uploaded :</strong> {new Date(booking.LinkUploadDate).toLocaleString()}</p>
                                
                            </div>
                            </div>
                        </div>
                    ))}
                    </>
                ) : (
                    <div className="col-12">
                        <div className="alert h2 alert-warning text-center">
                            Report not uploaded yet.
                        </div>
                    </div>
                )}
                </div>
            </div>
        </>
    );
};

export default SingleBookingDetail;
