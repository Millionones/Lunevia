"use client"
import React, { useState } from 'react'
const Features = () => {

    const [data, setData] = useState([
        {
            img: "/amenteties-1.jpg",
            title: "A lakeside pool",
            desc: "The swimming pool at Coconut lagoon is a water body with twin purposes. While it will certainly help you cool off on a hot day, it will also help you take in the beauty and grandeur of the Vembanad lake from a unique location."
        },
        {
            img:"/amenteties-2.jpg",
            title:"Club of nature",
            desc:"Join our naturalists at the Darter Club - the interpretation center at Coconut Lagoon - to know about the fascinating bio diversity of the Vembanad Lake and its satellite ecosystems that are unique in the world."
        },
        {
            img:"/amenteties-3.jpg",
            title:"WiFi access",
            desc:"WiFi is available across the property to enable you to stay connected at work. However, we at CGH Earth think that a holiday with us is best enjoyed unplugged, or plugged minimally. Let nature lead your eyes and heart for a change!"
        }
    ])
    return (
        <section className='amenteties-section'>
            <div className='cmpad'>
                <div className='amenteties-inner'>
                    <h2>
                        Ameneties
                    </h2>
                    <div className='amenteties-inner-content'>
                        <ul className='amenteties-grid'>
                            {
                                data.map((item, idx) => (
                                    <li >
                                        <div>
                                            <img src={item.img} alt="" />
                                        </div>
                                        <div className='amenteties-grid-content'>
                                            <h6>{item.title}</h6>
                                            <p>{item.desc}</p>
                                        </div>
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