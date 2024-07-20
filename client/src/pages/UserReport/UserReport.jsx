import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './UserReport.css';
import axios from 'axios';

const UserReport = () => {
    const [testdetails, setTestDetails] = useState([]);
    const [patientId, setPatientId] = useState('');
    const [error, setError] = useState('');

    const handleFetchReports = async (event) => {
        event.preventDefault();
        try {
            const res = await axios.get(`http://localhost:6842/api/v1/lab/reports/patient/${patientId}`);
            console.log(res.data.data);
            setTestDetails(res.data.data || []); // Ensure data is an array
            setError('');
        } catch (error) {
            setError('Failed to fetch report. Please check the Patient ID and try again.');
            setTestDetails([]);
        }
    };

    return (
        <>
            <section className="bread">
                <div className="container">
                    <nav aria-label="breadcrumb ">
                        <h2>Check Report Status</h2>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                            <li className="breadcrumb-item active" aria-current="page">Check Report Status</li>
                        </ol>
                    </nav>
                </div>
            </section>

            <section className="check-report-status booking my-5">
                <div className="container">
                    <div className="row bg-green">
                        <div className="col-md-6 mx-auto">
                            <form className="g-3" onSubmit={handleFetchReports}>
                                <div>
                                    <label htmlFor="patientId" className="form-label">Patient Id</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="patientId"
                                        name="patientId"
                                        value={patientId}
                                        onChange={(e) => setPatientId(e.target.value)}
                                        placeholder='Enter Your Patient Id :'
                                        required
                                    />
                                </div>
                                <div className="mt-3 text-center">
                                    <button type="submit" className="btn1">Search Now</button>
                                </div>
                            </form>
                            {error && <div className="mt-3 text-center text-danger">{error}</div>}
                        </div>
                    </div>
                </div>
            </section>

            {testdetails.length > 0 && (
                <section className="report-details my-5">
                    <div className="container">
                        <h3>Report Details</h3>
                        <div className="row">
                            {testdetails.map((testdetail, index) => (
                                <div key={index} className="col-md-6 mb-4">
                                    <div className="card">
                                        <div className="card-body">
                                            <h5 className="card-title">Report ID: {testdetail.ReportId}</h5>
                                            <ul className="list-group list-group-flush">
                                                <li className="list-group-item"><strong>Patient ID:</strong> {testdetail.PatientId}</li>
                                                <li className="list-group-item"><strong>Status of Link:</strong> {testdetail.StatusOfLink}</li>
                                                <li className="list-group-item"><strong>Link Upload Date:</strong> {new Date(testdetail.LinkUploadDate).toLocaleString()}</li>
                                                <li className="list-group-item"><strong>Report Link:</strong> <a href={testdetail.ReportLink} target="_blank" rel="noopener noreferrer">View Report</a></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </>
    );
};

export default UserReport;
