import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Upload = () => {
    const { id } = useParams();
    const [allTestRecords, setAllTestRecords] = useState([]);
    const [filteredRecords, setFilteredRecords] = useState([]);
    const [formData, setFormData] = useState({
        userId: id,
        reportLink: ''
    });
    const [searchReportId, setSearchReportId] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    useEffect(() => {
        handleFetchAll();
    }, []);

    const handleUpload = async () => {
        try {
            await axios.post(`${process.env.REACT_APP_BACKEND_URL}/lab/upload-test-result`, formData);
            handleFetchAll();
        } catch (error) {
            console.error('Error uploading report:', error);
        }
    };

    const handleFetchAll = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/lab/reports`);
            setAllTestRecords(response.data.data);
            filterReports(response.data.data); // Initial filter with empty criteria
        } catch (error) {
            console.error('Error fetching reports:', error);
        }
    };

    const filterReports = (reports) => {
        let filtered = reports;

        // Filter by Report ID
        if (searchReportId) {
            filtered = filtered.filter(report =>
                report.ReportId.toLowerCase().includes(searchReportId.toLowerCase())
            );
        }

        // Filter by Date Range
        if (startDate || endDate) {
            filtered = filtered.filter(report => {
                const uploadDate = new Date(report.LinkUploadDate);
                const start = startDate ? new Date(startDate) : null;
                const end = endDate ? new Date(endDate) : null;

                return (!start || uploadDate >= start) && (!end || uploadDate <= end);
            });
        }

        setFilteredRecords(filtered);
    };

    const handleDelete = async (reportId) => {
        try {
            await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/lab/reports/${reportId}`);
            handleFetchAll();
        } catch (error) {
            console.error('Error deleting report:', error);
        }
    };

    const resendReport = async (reportId) => {
        try {
            await axios.post(`${process.env.REACT_APP_BACKEND_URL}/lab/reports/${reportId}/resend`);
            alert('Report resent successfully');
        } catch (error) {
            console.error('Error resending report:', error);
        }
    };

    return (
        <div className="container mt-4">
            <h2 className="mb-4">Upload and Manage Test Reports</h2>

            <div className="row mb-4">
                <div className="col-md-6">
                    <div className="form-group">
                        <label htmlFor="reportLink">Report Link</label>
                        <input
                            type="text"
                            id="reportLink"
                            className="form-control"
                            value={formData.reportLink}
                            onChange={(e) => setFormData({ ...formData, reportLink: e.target.value })}
                            placeholder="Enter report link"
                        />
                    </div>
                </div>
                <div className="col-md-6 d-flex align-items-end">
                    <button
                        className="btn btn-primary"
                        onClick={handleUpload}
                    >
                        Upload Report
                    </button>
                </div>
            </div>

            <div className="row mb-4">
                <div className="col-md-3">
                    <div className="form-group">
                        <label htmlFor="searchReportId">Search by Report ID</label>
                        <input
                            type="text"
                            id="searchReportId"
                            className="form-control"
                            value={searchReportId}
                            onChange={(e) => {
                                setSearchReportId(e.target.value);
                                filterReports(allTestRecords);
                            }}
                            placeholder="Enter report ID"
                        />
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="form-group">
                        <label htmlFor="startDate">Start Date</label>
                        <input
                            type="date"
                            id="startDate"
                            className="form-control"
                            value={startDate}
                            onChange={(e) => {
                                setStartDate(e.target.value);
                                filterReports(allTestRecords);
                            }}
                        />
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="form-group">
                        <label htmlFor="endDate">End Date</label>
                        <input
                            type="date"
                            id="endDate"
                            className="form-control"
                            value={endDate}
                            onChange={(e) => {
                                setEndDate(e.target.value);
                                filterReports(allTestRecords);
                            }}
                        />
                    </div>
                </div>
            </div>

            <div className="table-responsive">
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>Report ID</th>
                            <th>Patient ID</th>
                            <th>Report Link</th>
                            <th>Link Upload Date</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredRecords.length > 0 ? (
                            filteredRecords.map((report) => (
                                <tr key={report.ReportId}>
                                    <td>{report.ReportId}</td>
                                    <td>{report.PatientId}</td>
                                    <td>
                                        <a href={report.ReportLink} target="_blank" rel="noopener noreferrer">
                                            View Report
                                        </a>
                                    </td>
                                    <td>{new Date(report.LinkUploadDate).toLocaleDateString()}</td>
                                    <td>{report.StatusOfLink}</td>
                                    <td>
                                        <button
                                            className="btn btn-warning btn-sm me-2"
                                            onClick={() => resendReport(report.ReportId)}
                                        >
                                            Resend
                                        </button>
                                        <button
                                            className="btn btn-danger btn-sm"
                                            onClick={() => handleDelete(report.ReportId)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="text-center">No records found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Upload;
