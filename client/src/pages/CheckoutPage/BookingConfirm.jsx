import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';


const BookingConfirm = () => {
  const [bookingId, setBookingId] = useState('');
  const [bookingFormData, setBookingFormData] = useState({});
  const [confirmationDateTime, setConfirmationDateTime] = useState('');

  useEffect(() => {
    // Assuming bookingFormData, bookingId, and confirmationDateTime are stored in sessionStorage
    const storedBookingFormData = JSON.parse(sessionStorage.getItem('bookingFormData')) || {};
    const storedBookingId = sessionStorage.getItem('bookingId') || 'XXXXXXXXX'; // Example ID if not found
    const storedConfirmationDateTime = sessionStorage.getItem('confirmationDateTime') || '';

    setBookingFormData(storedBookingFormData);
    setBookingId(storedBookingId);
    setConfirmationDateTime(storedConfirmationDateTime);
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }, []);

  return (
    <>
    
    <div className="booking-confirm-container my-5" style={{ backgroundColor: 'var(--bg-head)' }}>
      <div className="confirmation-message" style={{ backgroundColor: 'var(--bg-light-green)', padding: '20px', borderRadius: '8px', marginBottom: '20px' }}>
        <h2 style={{ color: 'var(--bg-dark-blue)' }}>Your Booking is Confirmed!</h2>
        <p>Booking ID: <strong>{bookingId}</strong></p>
        {confirmationDateTime && <p>Confirmed at: <strong>{confirmationDateTime}</strong></p>}
      </div>

      <div className="booking-details" style={{ backgroundColor: 'var(--bg-light-greenblue)', padding: '20px', borderRadius: '8px', textAlign: 'left' }}>
        <h3 style={{ color: 'var(--bg-dark-blue)', marginBottom: '20px' }}>Booking Details</h3>
        {bookingFormData.fullName && <p><strong>Name:</strong> {bookingFormData.fullName}</p>}
        {bookingFormData.labName && <p><strong>Lab Name:</strong> {bookingFormData.labName}</p>}
        {bookingFormData.labAddress && <p><strong>Lab Address:</strong> {bookingFormData.labAddress}</p>}
      </div>

      <div className="back-to-home">
        <Link to="/" className="btn btn-primary" style={{ backgroundColor: 'var(--bg-greenblue)', color: 'var(--bg-head)', borderRadius: '4px', padding: '10px 20px', textDecoration: 'none' }}>Back to Homepage</Link>
      </div>
    </div>
    </>
  );
}

export default BookingConfirm;
