import React, { useEffect } from 'react'
import './CheckoutPage.css'
import { Link } from 'react-router-dom'

const CheckoutPage = () => {
    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    }, [])
  return (
    <>
         <section className="booking checkout my-4">
                <div className="container">
                    <div className="row">

                        <div className="col-md-12 mx-auto green">
                            <div className="row">
                                <div className="col-12">
                                    <div className="top-heading text-center">
                                        <h2>Lab Mantra</h2>
                                        <p>Shop No.12, Sec 24, Pocket- 26, Rohini, New Delhi, Delhi 110085</p>
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="information row">
                                        <div className="col-md-6">
                                            <table className="table">
                                                <tr>
                                                    <th>Name</th>
                                                    <td>Mr. harsh vardhan mishra</td>
                                                </tr>
                                                <tr>
                                                    <th>Phone Number</th>
                                                    <td>+91-9876543210</td>
                                                </tr>
                                                <tr>
                                                    <th>Email Id</th>
                                                    <td className='email'>harsh@gmail.com</td>
                                                </tr>
                                                <tr>
                                                    <th>Address</th>
                                                    <td>Shop No.12, Sec 24, Pocket- 26, Rohini, New Delhi, Delhi 110085</td>
                                                </tr>
                                            </table>
                                        </div>
                                        <div className="col-md-6">
                                        <table className="table">
                                                <tr>
                                                    <th>Patient id</th>
                                                    <td>10250001</td>
                                                </tr>
                                                <tr>
                                                    <th>Date</th>
                                                    <td>12-05-2024</td>
                                                </tr>
                                                <tr>
                                                    <th>Time</th>
                                                    <td>12:00 PM</td>
                                                </tr>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12">
                                    <table className="table table-bordered">
                                        <thead>
                                            <tr>
                                                <th scope="col">Test Name</th>
                                                <th scope="col">MRP</th>
                                                <th scope="col">Discount</th>
                                                <th scope="col">Payable</th>
                                                <th scope="col"></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>Redcliffe Fit India Full Body</td>
                                                <td>&#8377; 7920</td>
                                                <td>10%</td>
                                                <td>&#8377; 1599</td>
                                                <td><div className="delete"><i className="fa-solid fa-trash-arrow-up"></i></div></td>
                                            </tr>
                                            <tr>
                                                <td>Redcliffe Fit India Full Body</td>
                                                <td>&#8377; 7920</td>
                                                <td>10%</td>
                                                <td>&#8377; 1599</td>
                                                <td><div className="delete"><i className="fa-solid fa-trash-arrow-up"></i></div></td>
                                            </tr>
                                            <tr>
                                                <td>Home Collection Charges</td>
                                                <td></td>
                                                <td></td>
                                                <td>&#8377; 0</td>
                                            </tr>
                                            <tr>
                                                <td><strong>Total Payable</strong></td>
                                                <td></td>
                                                <td></td>
                                                <td><strong>&#8377; 7290</strong></td>
                                            </tr>
                                        </tbody>
                                    </table>


                                </div>
                                
                                <div className="pay-pro ">
                                    <p className='text-center'>Pay At Lab or During Sample Collection, <strong>100% Risk Free</strong></p>

                                    <div className="row mt-5">
                                            <label htmlFor="paymentMode" className="form-label">Payment Mode</label>
                                        <div className="col-md-6">
                                            <select className="form-control" id="paymentMode" name="paymentMode">
                                                <option value="Male" selected>Online Mode</option>
                                                <option value="Female">Cash on Sample Collection</option>
                                            </select>
                                        </div>
                                        <div className="col-md-6 ">
                                            <Link to="" className='btn1'>Checkout To Proceed <i className="fa-solid fa-arrow-right"></i></Link>
                                        </div>

                                    </div>
                                </div>
                            
                            </div>
                        </div>

                    </div>
                </div>
            </section>
    </>
  )
}

export default CheckoutPage