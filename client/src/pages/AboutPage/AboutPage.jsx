import React, { useEffect } from 'react'
import Service from '../../components/service/Service'
import { Link } from 'react-router-dom'
import About from '../../components/About/About'
import MetaTag from '../../components/Meta/MetaTag'

const AboutPage = () => {
  useEffect(() => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    })
}, [])
  return (
    <>
      <MetaTag
        title="About Lab Mantra - Quality Healthcare for All Indian Citizens"
        description="Learn about Lab Mantra, an initiative to make quality healthcare affordable and accessible for all Indian Citizens. Discover our vision, mission, and the diagnostic services we offer."
        keyword="Lab Mantra, quality healthcare, affordable healthcare, diagnostic services, CT Scan, MRI Scan, Ultrasound, X-ray, ECG, PET/CT, Thyroid Scan, Indian healthcare"
      />

      <section className="bread">
        <div className="container">
          <nav aria-label="breadcrumb ">
            <h2>About Us</h2>
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><Link to="/">Home</Link></li>
              <li className="breadcrumb-item active" aria-current="page">About Us</li>
            </ol>
          </nav>
        </div>
      </section>
      <About/>
      <Service />

    </>
  )
}

export default AboutPage