"use client"
import Link from 'next/link'
import React, { useState } from 'react'

const Rooms = () => {

    const [data, setData] = useState([
        {
            img: 'https://templates.sparklethings.com/palmea/wp-content/uploads/sites/246/2026/02/3d-rendering-luxury-tropical-bedroom-suite-in-reso-2026-01-07-02-15-56-utc-1024x682.webp',
            title: 'LUNEVIA Backwater Reserve – Alleppey',
            description: 'Floating gently along tranquil canals, Backwater Reserve is a sanctuary of slow luxury. Private houseboat suites, palm-framed horizons, and golden reflections at dusk define this intimate waterside escape.'
        },
        {
            img: 'https://templates.sparklethings.com/palmea/wp-content/uploads/sites/246/2026/02/3d-rendering-luxury-tropical-bedroom-suite-in-reso-2026-01-07-02-15-56-utc-1024x682.webp',
            title: 'LUNEVIA Cliffside Kovalam',
            description: 'Perched above the Arabian Sea, Cliffside Kovalam offers dramatic ocean panoramas, infinity pools carved into rock, and sun-drenched terraces designed for unhurried indulgence.'
        },
    ])
    return (
        <section className='rooms-section'>
            <div className='cmpad'>
                <div className='destination-list-inner'>
                    <ul className='destination-list-grid'>
                        {
                            data.map((item) => (
                                <li className='destination-grid-card'>
                                    <Link href="/destinations/details/room">
                                        <div className='destination-card-media'>
                                            <img src={item.img} alt="" />
                                        </div>
                                        <div className='destination-card-detail'>
                                            <div className='destination-card-header'>
                                                <h2>{item.title}</h2>
                                                <h2>$200 <span>/ Night</span></h2>
                                            </div>
                                            <div className='destination-card-desc'>
                                                <p>{item.description}</p>
                                            </div>
                                            <div className="line-separator"></div>
                                            <ul className='destination-card-features'>
                                                <li>
                                                    <p>2 People</p>
                                                </li>
                                                <li>
                                                    <p>1 Kingbeds</p>
                                                </li>
                                                <li>
                                                    <p>1 Bathrooms</p>
                                                </li>
                                                <li>
                                                    <p>Free Wifi</p>
                                                </li>
                                            </ul>
                                            <button className='destination-card-button'>
                                                <p>BOOK ROOM</p>
                                            </button>
                                        </div>
                                    </Link>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>
        </section>
    )
}

export default Rooms