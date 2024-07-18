import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import MetaTag from '../../components/Meta/MetaTag';

const TermsCondition = () => {
    useEffect(()=>{
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    },[])
  return (
    <>
        <MetaTag
            title="Terms & Conditions - Lab Mantra"
            description="Explore Lab Mantra's terms and conditions, including service agreements, user responsibilities, and more."
            keyword="Lab Mantra, terms and conditions, service agreements"
        />
        <section className="bread">
            <div className="container">
                <nav aria-label="breadcrumb ">
                    <h2>Terms & Condition</h2>
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                        <li className="breadcrumb-item active" aria-current="page">Terms & Condition</li>
                    </ol>
                </nav>
            </div>
        </section>
        <section className="container mt-4">
        <div className="row">
          <div className="col">
            <p>
              Lab Mantra is an initiative to provide diagnostic services to patients through the network of its associated diagnostic/collection centres. These services are provided through our website, app, or phone as the case may be. A user, by using our services, consents to our privacy policy, terms of use, and disclaimer as presented on <a href="https://www.labmantra.com" className="highlight-link">www.labmantra.com</a>.
            </p>
            <p>
              The services provided by <Link href="https://www.labmantra.com" className="highlight-link">www.labmantra.com</Link> are in the nature of aggregation with technology intermediation. We are not providing any medical assessment or advice whatsoever.
            </p>
            <p>
              Though we take all precautions to ensure that only high-quality diagnostic labs are allowed to tie up with us, Lab Mantra does not take any responsibility for the accuracy and quality of the service provided by the labs registered/tied up with us. We are merely an intermediary that is acting in good faith. LABMANTRA is not liable for any medical assessment based on the reports of diagnostic tests booked through us at our partner labs.
            </p>
            <p>
              The patients are solely responsible for maintaining the confidentiality of their own account to access information and password.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}

export default TermsCondition