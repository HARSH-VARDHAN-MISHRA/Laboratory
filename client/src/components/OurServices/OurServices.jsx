import React from 'react'
import { Link } from 'react-router-dom'
import './OurServices.css'

import Radiology from './Radiology.webp'
import Pathology from './Pathology.jpeg'
import Cardiology from './Cardiology.jpeg'
import Oncology from './Oncology.jpeg'

const OurServices = () => {
    const service = [
        {
            iconImg:Radiology,
            ServName:"Radiology",
            desc:"Discuss any recent illnesses, medical conditions, medications you are taking and allergies – especially to contrast material"
        },
        {                                             
            iconImg:Pathology,
            ServName:"Pathology",
            desc:"Discuss any recent illnesses, medical conditions, medications you are taking and allergies – especially to contrast material"
        },
        {
            iconImg:Cardiology,
            ServName:"Cardiology",
            desc:"Discuss any recent illnesses, medical conditions, medications you are taking and allergies – especially to contrast material"
        },
        {
            iconImg:Oncology,
            ServName:"Oncology",
            desc:"Discuss any recent illnesses, medical conditions, medications you are taking and allergies – especially to contrast material"
        },
    ]
  return (
    <>
        <section className="our-services">
            <div className="container">
                <div className="serivce-grid">
                    {service && service.map((item,index)=>(
                        <div className="single-serv" key={index}>
                            <div className="img">
                                <img src={item.iconImg} alt={item.ServName} />
                            </div>
                            <div className="content">
                                <h4>{item.ServName}</h4>
                                <p>{item.desc}</p>
                                <Link className="known-more">
                                    Known More
                                </Link>
                            </div>
                        </div>
                        
                    ))}

                </div>
            </div>
        </section>
    </>
  )
}

export default OurServices