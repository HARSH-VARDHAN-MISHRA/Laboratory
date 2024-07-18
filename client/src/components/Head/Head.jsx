import React from 'react'
import './Head.css'

const Head = ({title}) => {
  return (
    <>
        <section className="heading ">
            <div className="container">
                <h2>{title}</h2>
            </div>
        </section>
    </>
  )
}

export default Head