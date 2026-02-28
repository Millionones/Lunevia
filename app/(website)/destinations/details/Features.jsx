"use client"
import React, { useState } from 'react'
const Features = () => {

    const [data, setData] = useState([
        "1200 sq ft",
        "Private deck",
        "Personal butler",
        "Direct canal access",
        "Waterfront Pool Villa",
        "Infinity plunge pool",
        "Outdoor rain shower",
        "Panoramic canal views"
    ])
    return (
        <section className='features'>
            <div className='cmpad'>
                <div className='features-inner'>
                    <div className='features-box'>
                        <ul>
                            {
                                data.map((i,idx) => (
                                    <li key={idx}>
                                        <img src="/group-star-icon.svg" alt="" />
                                        <p>{i}</p>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Features