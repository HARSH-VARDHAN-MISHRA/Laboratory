import React, { useState } from 'react'
import './Contact.css'

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const Contact = () => {

    const [loading, setLoading] = useState(false);
    const [sended, setSended] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        phoneNumber: '',
        email_id: '',
        address: ''
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        })
    }

    const handleSubmit = async (event) => {
        setLoading(true);
        event.preventDefault();
        try {
            const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/apply-enquiry`, formData);
            toast.success(res.data.message);
            setFormData({
                firstName: '',
                lastName: '',
                phoneNumber: '',
                email_id: '',
                address: ''
            })
            setSended(true);
        } catch (error) {
            console.error("Error while submitting the form", error.response.data);
            toast.error(error.response?.data?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    }

    return (
        <>

            <section className="contact">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 mb-4">
                            <h3>Contact Us</h3>
                            <p>Have questions or feedback? Feel free to reach out to us.</p>
                            <p><strong>Address:</strong> 128/129 Sector 2 Rohini New Delhi - 110085</p>
                            <p><strong>Email Id:</strong> <a href="mailto:info@labmantra.com">info@labmantra.com</a></p>
                            <p><strong>Phone Number:</strong> <a href="tel:+918826936006">+91-8826936006</a> , <a href="tel:+918882864997">+91-8882864997</a></p>
                            <div className="social-icons">
                                <a href="https://www.facebook.com/profile.php?id=61560951015517&mibextid=ZbWKwL" target="_blank" rel="noopener noreferrer"><i className="fa-brands fa-square-facebook"></i></a>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <form className="row" onSubmit={handleSubmit}>
                                {sended ? (
                                    <div className="col-md-12 row">
                                        <div className="col-md-12 mx-auto">
                                            <div className="alert alert-info text-center" role="alert">
                                                Inquiry Send Successfully !!
                                            </div>
                                        </div>

                                    </div>
                                )
                                    : ""
                                }
                                <div className="col-md-6 mb-3">
                                    <input type="text" name='firstName' value={formData.firstName} onChange={handleChange} className="form-control" required id="form1" placeholder="First Name" />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <input type="text" name='lastName' value={formData.lastName} onChange={handleChange} className="form-control" required id="form2" placeholder="Last Name" />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <input type="number" name='phoneNumber' value={formData.phoneNumber} onChange={handleChange} className="form-control" required id="form3" placeholder="Phone Number" />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <input type="email" name='email_id' value={formData.email_id} onChange={handleChange} className="form-control" required id="form4" placeholder="Email Id" />
                                </div>
                                <div className="col-12 mb-3">
                                    <textarea name='address' value={formData.address} onChange={handleChange} className="form-control" id="exampleFormControlTextarea1" rows="3" placeholder="Address"></textarea>
                                </div>

                                <div className="col-12 text-center">
                                    <button type="submit" className="form-control w-100">{loading ? "Please Wait" : "Send Message"}</button>
                                </div>

                            </form>
                        </div>
                    </div>


                </div>
            </section>
        </>
    )
}

export default Contact