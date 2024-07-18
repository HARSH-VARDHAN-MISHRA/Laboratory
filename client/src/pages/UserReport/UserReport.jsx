import React from 'react'
import { Link } from 'react-router-dom'
import './UserReport.css'

const UserReport = () => {
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
                        <form className="g-3">
                            <div>
                                <label htmlFor="name" className="form-label">Patient Id</label>
                                <input type="text" className="form-control" id="patientId" name="patientId" placeholder='Enter Your Patient Id :' required />
                            </div>
                            <div className="mt-3 text-center">
                                <button type="submit" className="btn1">Search Now</button>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
        </section>
    </>
  )
}

export default UserReport