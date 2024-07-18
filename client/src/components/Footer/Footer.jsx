import React from 'react'
import './Footer.css'
import { Link } from 'react-router-dom'
import logo from '../../Assets/logo.png'

const Footer = () => {
  return (
    <>
      <footer>
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <Link to="/" className="logo"><img src={logo} alt="logo" /></Link>
              <p>Lab Mantra is an initiative to make quality healthcare affordable and accessible for all Indian Citizens. We believe in and value affordability but our priority is to provide quality diagnostic services being offered by our lab Partners.</p>
            </div>
            <div className="col-md-1"></div>
            <div className="col-md-3">
              <h4>Quick Links</h4>
              <ul>
                <li><Link>Home</Link></li>
                <li><Link>About Us</Link></li>
                <li><Link>Book Test</Link></li>
                <li><Link>Download Report</Link></li>
                <li><Link>Contact Us</Link></li>
              </ul>
            </div>
            <div className="col-md-3">
              <h4>Policies</h4>
              <ul>
                <li><Link to={`/privay-policy`} >Privacy policy</Link></li>
                <li><Link to={`/refund-cancellation-policy`} >Refund And Cancellation</Link></li>
                <li><Link to={`/terms-condition`} >Terms & Condition</Link></li>
              </ul>
            </div>

            <div className="copy text-center">
              <p>Copyright © 2024 Lab Mantra. Designed By <a href="https://www.digiindiasolutions.com/" target="_blank">DIGI INDIA SOLUTIONS</a></p>
            </div>

          </div>
        </div>
      </footer>
    </>
  )
}

export default Footer