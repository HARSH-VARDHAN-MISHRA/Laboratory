import React from 'react';
import './AddressSuccessfullUpdate.css'; // Import your custom styles for color scheme
import img from './op.png'; // Replace with your actual image path
import no from './no.jpg'; // Replace with your actual image path


const AddressSuccessfullUpdate = () => {
    const searchParams = new URLSearchParams(window.location.search);
    const labId = searchParams.get('LabId');
    return (
        <div className="container">
            <div className="row py-5 justify-content-center">
                <div className="col-md-8">
                    {labId ? (
                        <div className="card success-card">
                            <div className="card-body text-center">
                                <h5 className="card-title" style={{ color: '#007BFF' }}>Location Update Successful</h5>
                                <p className="card-text">You are now ready to take a test at the lab.</p>
                            </div>
                            <div className='d-flex  col-md-6  mx-auto align-items-center justify-content-center'>
                                <img src={img} className="card-img-bottom img-fluid " alt="Success Image" />

                            </div>
                            <div className="card-footer text-center">
                                <a href="/" className="btn btn-primary">Back to lab Panel</a>
                            </div>
                        </div>
                    ) : (
                        <div className="card success-card">
                            <div className="card-body text-center">
                                <h5 className="card-title" style={{ color: '#FF0000' }}>Access Denied</h5>
                                <p className="card-text">You do not have permission to access this resource.</p>
                            </div>
                            <div className='d-flex  col-md-6  mx-auto  align-items-center justify-content-center'>
                                <img src={no} className="card-img-bottom img fluid" alt="Failure Image" />
                            </div>
                            <div className="card-footer text-center">
                                <a href="/" className="btn btn-primary">Back to Home</a>
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
}

export default AddressSuccessfullUpdate;
