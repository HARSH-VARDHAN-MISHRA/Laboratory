import React from 'react';
import './testimonial.css';
import p1 from './p1.jpg';
import p2 from './p2.jpeg';
import p3 from './p3.jpeg';

const testimonials = [
    {
        img: p1,
        name: 'Gourav Panchal',
        review: "Lab Mantra’s quality equipment has significantly enhanced our healthcare services. Highly recommended by YUGI Health Provider LLP."
    },
    {
        img: p2,
        name: 'Harsh Vardhan Mishra',
        review: "Exceptional service and reliable products. YUGI Health Provider LLP values Lab Mantra's commitment to excellence."
    },
    {
        img: p3,
        name: 'Rahul Sharma',
        review: "Lab Mantra provides outstanding medical products. Our operations at YUGI Health Provider LLP benefit greatly from their support."
    }
];


const Testimonial = () => {
    return (
        <section className="testimonial my-5">
            <div className="container">
                <div className="text-center mb-5">
                    <h2 className="font-weight-bold" style={{color:"var(--bg-greenblue)"}}>Our Happy Clients</h2>
                    <p className="text-muted">Here's what our clients have to say about Lab Mantra</p>
                </div>
                <div className="row">
                    {testimonials.map((testimonial, index) => (
                        <div className="col-md-4" key={index}>
                            <div className="card">
                                <div className="card-body text-center">
                                    <img src={testimonial.img} alt="User Image" />
                                    <h5 className="card-title mt-2 mb-0">{testimonial.name}</h5>
                                    <div className="stars">
                                        <i class="fa-solid fa-star"></i>
                                        <i class="fa-solid fa-star"></i>
                                        <i class="fa-solid fa-star"></i>
                                        <i class="fa-solid fa-star"></i>
                                        <i class="fa-solid fa-star"></i>
                                    </div>
                                    <p className="card-text">{testimonial.review}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonial;
