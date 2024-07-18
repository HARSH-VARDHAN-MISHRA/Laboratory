import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Contact from '../../components/Contact/Contact'
import MetaTag from '../../components/Meta/MetaTag'

const ContactPage = () => {
    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    }, [])
    return (
        <>
        <MetaTag
            title="Contact Us - Lab Mantra"
            description="Get in touch with Lab Mantra for any inquiries, support, or feedback. We are here to assist you with all your healthcare needs."
            keyword="Lab Mantra, contact, support, inquiries, feedback, healthcare services"
        />

            <section className="bread">
                <div className="container">
                    <nav aria-label="breadcrumb ">
                        <h2>Contact Us</h2>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                            <li className="breadcrumb-item active" aria-current="page">Contact Us</li>
                        </ol>
                    </nav>
                </div>
            </section>
            <Contact />
        </>
    )
}

export default ContactPage