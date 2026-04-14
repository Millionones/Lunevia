"use client"
import React, { useState } from 'react'

const Locations = () => {

    const [data, setData] = useState([
            {
                img: "/locations-1.jpg",
                title: "Canoe Ride",
                desc: "Cruise along the multiple canals of Kumarakom to experience the life on the backwaters or take a canoe ride to explore Coconut Lagoon's canals."
            },
            {
                img:"/locations-2.jpg",
                title:"Sunset Cruise",
                desc:"One of the best ways to enjoy the lake is to take our sunset cruise, an hour-long idyll with flute accompaniment. Water lovers might also enjoy taking an oar or punt-boat out on to the lake with one of the local fishermen, both for company and a steadying hand on the tiller. Within minutes, you're in a watery universe, so quiet, you can hear your own blood pumping around your head."
            },
            {
                img:"/locations-3.jpg",
                title:"Kayaking",
                desc:"Paddle over the enchanting Kumarakom lake during you stay with us at Coconut Lagoon. The backwaters beckon you at sunrise. Go on a guided kayaking trip across tranquil backwaters and experience the languid pace of life in Kuttanad."
            },
            {
                img:"/locations-4.jpg",
                title:"Floating Tea Shop",
                desc:"The life around backwaters is so dependant on being able to float from one place to the other. Our floating tea shop represents one of the aspects of this way of living. This also is a chance to meet our own Tea Lady from the village near the resort."
            }
        ])
  return (
    <section className='location-section'>
            <div className='cmpad'>
                <div className='amenteties-inner'>
                    <h2>
                        Near by Locations
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

export default Locations