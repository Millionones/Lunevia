"use client"
import React, { useState } from 'react'

const Locations = () => {

    const [data, setData] = useState([
            {
                img: "/Kolukkumalai_Sunrise.jpg",
                title: "Kolukkumalai Sunrise Trucking (Starting point 1.5KM)",
                desc: "This tourist attraction offers a thrilling jeep safari and breathtaking sunrise views from the highest tea plantation in the world. They highlight the adventurous off-road experience and the magical, dreamlike atmosphere created by the mist rolling over the peaks. They also like the opportunity to visit the Tea Factory and taste fresh tea"
            },
            {
                img:"/Zipline_Suryanelli.jpg",
                title:"Zipline Suryanelli (3KM)",
                desc:"Longest Dual Zipline in Kerala, Experience the thrill of flying side-by-side with a friend or family member on the longest dual zip line in Kerala. This zipline spans impressive lengths, providing an adrenaline-pumping ride from start to finish"
            },
            {
                img:"/Pappathichola.jpg",
                title:"Pappathichola (8.5KM)",
                desc:"Pappathichola, located near Chinnakanal in Munnar, is a high-altitude area known for its mist-covered landscapes, scenic viewpoints, and suitability for adventure activities like trekking and camping. It is part of the scenic Idukki district of Kerala, characterized by rolling hills and close proximity to the popular Kolukkumalai tea estates."
            },
            {
                img:"/anayirangal_Dam.jpg",
                title:"Anayirangal Dam (3.5KM)",
                desc:"Anayirangal Dam is a scenic, large earthen reservoir located about 3.5km from the resort surrounded by lush Tata Tea plantations and dense forests. Built on the Panniyar River, it offers boating, 360-degree views of the Western Ghats, and frequent sightings of wild elephants"
            },
            {
                img:"/gap_road.jpg",
                title:"Gap Road",
                desc:"Gap road is a scenic 12–15 km mountain pass on the -Madurai Highway (NH 85) famous for its panoramic views of tea plantations, misty valleys, and rock-cut pathways"
            },
            {
                title:"Munnar Town (21KM)"
            },
            {
                title:"Cochin Airport (120 KM)"
            },
            {
                title:"Railway station (95 KM)"
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
                                        <div>{item.img ?
                                            <img src={item.img} alt="" />
                                            :
                                            <img src="/dummy-location.avif" alt="" />}
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