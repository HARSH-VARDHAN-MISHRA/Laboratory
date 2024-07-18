import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import MetaTag from '../../components/Meta/MetaTag';

const RefundCancelation = () => {
    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }, [])
    return (
        <>
            <MetaTag
                title="Refund and Cancellation Policy - Lab Mantra"
                description="Learn about Lab Mantra's refund and cancellation policy, including conditions for refunds, cancellation procedures, and refund methods."
                keyword="Lab Mantra, refund policy, cancellation policy, refunds, cancellations"
            />
            <section className="bread">
                <div className="container">
                    <nav aria-label="breadcrumb ">
                        <h2>Refund And Cancellation Policy</h2>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                            <li className="breadcrumb-item active" aria-current="page">Refund And Cancellation Policy</li>
                        </ol>
                    </nav>
                </div>
            </section>
            <section className="container mt-4">
                <div className="row">
                    <div className="col">
                        <p>
                            Our focus is on complete customer satisfaction. In the event, if you are displeased with the services provided or we are unable to provide the service, we will refund the money, provided the reasons are genuine and proved after investigation.
                        </p>
                        <p>
                            In case of dissatisfaction from services provided by our lab partners, customers have the liberty to cancel the booking before the test or start of the home visit for sample collection. However, no refund shall be admissible after the test has been completed. In case of any grievances with regards to the service provided by lab partners, customers are encouraged to speak to the concerned person at the lab. Though, LABMANTRA shall provide full assistance for coordination with the labs.
                        </p>
                        <p>
                            Though we take all the care to display MRP, Discount & lab information correctly on our website, sometimes, an inadvertent error may occur. In all such cases, the customer is free to cancel the booking and a full refund <b style={{fontWeight:"500"}}>(in cases where payment has been made to <a href="https://www.labmantra.com" className="highlight-link">LABMANTRA.COM</a> directly)</b> shall be admissible.
                        </p>
                        <h3>Refund Policy</h3>
                        <p>
                            If paid by credit card, refunds will be issued to the original credit card provided at the time of purchase and in case of payment gateway payments, the refund will be made to the same account. The refund shall be provided within 7 working days wherever applicable.
                        </p>
                    </div>
                </div>
            </section>
        </>
    )
}

export default RefundCancelation