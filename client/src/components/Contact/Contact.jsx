import React, { useState } from 'react'
import './Contact.css'

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const Contact = () => {

    const [loading,setLoading] = useState(false);
    const [sended,setSended] = useState(false);
    const [formData,setFormData] = useState({
        firstName: '',
        lastName: '',
        phoneNumber: '',
        email_id: '',
        address: ''
    })

    const handleChange = (e) =>{
        const {name,value} = e.target;
        setFormData({
            ...formData,
            [name]:value
        })
    }

    const handleSubmit = async (event)=>{
        setLoading(true);
        event.preventDefault();
        try {
            const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/apply-enquiry`,formData);
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
            console.error("Error while Submit the Form",error.response.data);
            toast.success(error.res)
        }finally{
            setLoading(false);
        }
    }

    return (
        <>

            <section className="contact">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <form className="row" onSubmit={handleSubmit}>
                                {sended ? (
                                    <div className="col-md-12 row">
                                        <div className="col-md-6 mx-auto">
                                            <div class="alert alert-info" role="alert">
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
                                    <button type="submit" className="form-control">{loading ? "Please Wait" : "Send Message"}</button>
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