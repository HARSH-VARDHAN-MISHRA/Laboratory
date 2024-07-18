import React, { useState } from 'react'
import './Tests.css'
import { Link } from 'react-router-dom'

const Tests = () => {
    const allTests = [
        {
            "service_name": "ANTI-AQUAPORIN-4 (NMO-IGG) ANTIBODIES",
            "actual_price": 6200,
            "discount_price": 4960,
            "discount_percentage": 20
        },
        {
            "service_name": "MENOPAUSAL DIAGNOSTIC PANEL",
            "actual_price": 2760,
            "discount_price": 2484,
            "discount_percentage": 10
        },
        {
            "service_name": "ABS TO EXTRACTABLE NUCLEAR AG: SS-A & SS-B",
            "actual_price": 6770,
            "discount_price": 6770,
            "discount_percentage": 0
        },
        {
            "service_name": "MENOPAUSAL MONITORING PANEL",
            "actual_price": 2760,
            "discount_price": 2208,
            "discount_percentage": 20
        },
        {
            "service_name": "HIRSUTISM SCREENING PANEL",
            "actual_price": 4820,
            "discount_price": 4338,
            "discount_percentage": 10
        },
        {
            "service_name": "HIRSUTISM EVALUATION PANEL",
            "actual_price": 7580,
            "discount_price": 7580,
            "discount_percentage": 0
        },
        {
            "service_name": "PCOD PANEL",
            "actual_price": 5850,
            "discount_price": 4680,
            "discount_percentage": 20
        },
        {
            "service_name": "INHIBIN B, LH, FSH & PROLACTIN",
            "actual_price": 4270,
            "discount_price": 3843,
            "discount_percentage": 10
        },
        {
            "service_name": "BOH PANEL",
            "actual_price": 7430,
            "discount_price": 5944,
            "discount_percentage": 20
        },
        {
            "service_name": "THYROID ANTIBODIES, SERUM",
            "actual_price": 3440,
            "discount_price": 2924,
            "discount_percentage": 15
        },
        {
            "service_name": "OSTEOSCREEN PANEL - I",
            "actual_price": 4820,
            "discount_price": 4820,
            "discount_percentage": 0
        },
        {
            "service_name": "OSTEOSCREEN PANEL II",
            "actual_price": 7580,
            "discount_price": 7580,
            "discount_percentage": 0
        },
        {
            "service_name": "IBD SCREENING PANEL",
            "actual_price": 5520,
            "discount_price": 4968,
            "discount_percentage": 10
        },
        {
            "service_name": "LIVER AND KIDNEY PROFILE",
            "actual_price": 3000,
            "discount_price": 2550,
            "discount_percentage": 15
        },
        {
            "service_name": "CHRONIC FATIGUE SYNDROME PANEL",
            "actual_price": 7840,
            "discount_price": 6272,
            "discount_percentage": 20
        },
        {
            "service_name": "IMMUNOGLOBULIN, SERUM",
            "actual_price": 2840,
            "discount_price": 2840,
            "discount_percentage": 0
        },
        {
            "service_name": "ACUTE MYELOID LEUKEMIA PANEL",
            "actual_price": 14450,
            "discount_price": 11560,
            "discount_percentage": 20
        }
    ];

    const [showAll, setShowAll] = useState(false);

    // const handleShowAll = () => {
    //     setShowAll(true);
    // };

    const displayedTests = showAll ? allTests : allTests.slice(0, 9);

    return (
        <>
            <section className="tests">
                <div className="container">
                    <div className="grid-3">
                        {displayedTests && displayedTests.map((item, index) => (
                            <div className="single-test" key={index}>
                                <h4>{item.service_name}</h4>
                                <div className="flex">
                                    <div className="price">
                                        <span className="discount_price">₹{item.discount_price}</span>
                                        <span className="actual_price">₹{item.actual_price}</span>
                                    </div>
                                    <Link to="/cart" className="bookBtn">
                                        BOOK
                                    </Link>
                                </div>

                                {item.discount_percentage ? (
                                    <div className="abso">
                                        <span>{item.discount_percentage}% Off</span>
                                    </div>
                                ) : null}

                            </div>
                        ))}
                    </div>

                    {!showAll && allTests.length > 12 && (
                        <div className="view-all-btn" >
                            <Link to="/book-your-test" className='butn'>
                                View All
                            </Link>
                        </div>
                    )}
                </div>
            </section>
        </>
    );
};

export default Tests;
