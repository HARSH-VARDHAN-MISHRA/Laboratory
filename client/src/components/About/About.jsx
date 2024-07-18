import React from 'react'
import './About.css'
const About = () => {
  return (
    <>
        <section className="about-sec mt-5">
            <div className="container">
                <div className="row">
                    <div className="col-md-8">
                        <h1>Welcome To Lab Mantra </h1>
                        <p>Lab Mantra is an initiative to make quality healthcare affordable and accessible for all Indian Citizens. We believe in and value affordability but our priority is to provide quality diagnostic services being offered by our lab Partners.</p>
                        <p>A small hand of friendship for a better relationship between the country and healthcare providers.</p>
                        <div className="row">
                            <div className="col-md-6">
                                <h2>Our Vision</h2>
                                <p>To Provide superior quality healthcare services that patients can recommend to family and friends, Physicians can suggest to their patients about the affordability and accessibility.</p>
                            </div>
                            <div className="col-md-6">
                                <h2>Our Mission</h2>
                                <p>Working to improve the healthcare experience of Indian Citizens. Our system is designed to deliver high-quality, accessible, understandable and affordable experiences.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <img src="https://img.freepik.com/free-photo/team-medical-scientist-modern-laboratory-searching-coronavirus-vaccine-wearing-ppe-chemist-researcher-during-global-pandemic-with-covid-19-checking-sample-biochemistry-lab_482257-8802.jpg?size=626&ext=jpg&ga=GA1.1.201442503.1690221148&semt=ais_user_b" alt="" />
                    </div>
                </div>
            </div>
        </section>
    </>
  )
}

export default About