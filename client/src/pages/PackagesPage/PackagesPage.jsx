import React, { useEffect } from 'react'
import Packages from '../../components/Packages/Packages'
import { Link } from 'react-router-dom'
import Head from '../../components/Head/Head'
import MetaTag from '../../components/Meta/MetaTag'

const PackagesPage = () => {
    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    }, [])
  return (
    <>
        <MetaTag
            title="Our Packages - Lab Mantra"
            description="Explore our range of healthcare packages designed to offer comprehensive diagnostic services. Find the right package for your health needs at Lab Mantra."
            keyword="Lab Mantra, healthcare packages, diagnostic services, health packages"
        />
        <section className="bread">
            <div className="container">
                <nav aria-label="breadcrumb ">
                    <h2>Our Packages</h2>
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                        <li className="breadcrumb-item active" aria-current="page">Our Packages</li>
                    </ol>
                </nav>
            </div>
        </section>

        <Packages/>

    </>
  )
}

export default PackagesPage