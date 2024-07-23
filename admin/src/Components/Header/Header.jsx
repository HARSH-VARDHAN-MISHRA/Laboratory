import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './Header.css'
import logo from './logo.png'

const Header = () => {
  const [sidetoggle,setSideToggle] = useState(false);

  const handletoggleBtn =()=>{
    setSideToggle(!sidetoggle)
  }

  const handleLogOut =()=>{
    sessionStorage.removeItem("labadminToken");
    sessionStorage.removeItem("labMantraUser");
    window.location.href="/";
  }
  return (
    <>
      <header>
        <div className="top-head">
          <div className="right">
            {/* <h2>Lab Mantra</h2> */}
            <div className="logo">
              <img src={logo} alt="logo" style={{width:"220px",height:"auto"}} />
            </div>
            <div className="bar" onClick={handletoggleBtn}>
              <i className="fa-solid fa-bars"></i>
            </div>
          </div>
          <div className="left">
            <a href="https://labmantra.com/" target="_blank">
              <i className="fa-solid fa-globe"></i>
              Go To Website
            </a>

            <div className="logout" onClick={handleLogOut}>
              Log Out <i className="fa-solid fa-right-from-bracket"></i>
            </div>
          </div>

        </div>

        <div className={`rightNav ${sidetoggle ? "active" : "" } `  }>
          <ul>
            <li><Link to="/dashboard" onClick={handletoggleBtn}> <i className="fa-solid fa-gauge"></i> Dashboard</Link></li>

            <li><Link to="/all-laboratory" onClick={handletoggleBtn}> <i className="fa-solid fa-house-chimney-medical"></i> Laboratory</Link></li>
            <li><Link to="/add-laboratory-test" onClick={handletoggleBtn}> <i className="fa-solid fa-vial-virus"></i> Laboratory Test</Link></li>
            {/* <li><Link to="/all-laboratory-branch" onClick={handletoggleBtn}> <i className="fa-solid fa-code-branch"></i> Laboratory Branch</Link></li> */}
            <li><Link to="/all-users" onClick={handletoggleBtn}> <i className="fa-solid fa-user-tag"></i> Users</Link></li>
            <li><Link to="/all-package-title" onClick={handletoggleBtn}> <i className="fa-solid fa-wand-magic-sparkles"></i> Package Title</Link></li>
            <li><Link to="/all-package" onClick={handletoggleBtn}> <i className="fa-solid fa-box-archive"></i> Packages</Link></li>
            <li><Link to="/all-test-category" onClick={handletoggleBtn}> <i className="fa-solid fa-layer-group"></i> Test Category</Link></li>
            <li><Link to="/all-test" onClick={handletoggleBtn}> <i className="fa-solid fa-flask-vial"></i> Test</Link></li>
            <li><Link to="/all-voucher" onClick={handletoggleBtn}> <i className="fa-brands fa-cc-discover"></i> Manage Voucher</Link></li>
            <li><Link to="/all-orders" onClick={handletoggleBtn}> <i className="fa-solid fa-dolly"></i> Manage Orders</Link></li>
            <li><Link to="/all-enquiry" onClick={handletoggleBtn}> <i className="fa-solid fa-envelope-open-text"></i> All Enquiry</Link></li>
            <li><Link to="/all-city" onClick={handletoggleBtn}> <i className="fa-solid fa-earth-americas"></i> All City</Link></li>
            <button className='logout mb-5' onClick={handleLogOut}>Log Out <i className="fa-solid fa-right-from-bracket"></i></button>

          </ul>
        </div>

      </header>
    </>
  )
}

export default Header