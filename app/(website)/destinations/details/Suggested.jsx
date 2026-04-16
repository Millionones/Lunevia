"use client"

import Link from 'next/link'
import React, { useState } from 'react'
const Suggested = () => {
    const [data, setData] = useState([
        {
            img: '/destination2.png',
            title: 'LUNEVIA Cliffside Kovalam',
            description: 'Perched above the Arabian Sea, Cliffside Kovalam offers dramatic ocean panoramas, infinity pools carved into rock, and sun-drenched terraces designed for unhurried indulgence.'
        },
        {
            img: '/destination3.png',
            title: 'LUNEVIA Munnar Mist Retreat',
            description: 'Set amid rolling tea plantations, Munnar Mist Retreat is wrapped in mountain air and drifting clouds. Glass-walled suites open to endless green, offering elevated stillness above the valley.'
        },
        {
            img: '/destination4.png',
            title: 'LUNEVIA Wayanad Forest Sanctuary',
            description: 'Hidden within dense rainforest, Forest Sanctuary blends eco-conscious architecture with curated comfort. Elevated wooden villas, private plunge pools, and immersive nature experiences define this retreat.'
        }
    ])

    return (
        <section className='suggested-section'>
            <div className='cmpad'>
                <div className='suggested-list-inner'>
                    <div className='suggested-list-header'>
                        <h2>Explore more Destinations</h2>
                    </div>
                    <ul className='suggested-list-grid'>
                        {
                            data.map((item) => (
                                <li className='suggested-grid-card'>
                                    <Link href="/destinations/details/room">
                                        <div className='suggested-card-media'>
                                            <img src={item.img} alt="" />
                                        </div>
                                        <div className='suggested-card-detail'>
                                            <div className='suggested-card-header'>
                                                <h2>{item.title}</h2>
                                                {/* <h2>$200 <span>/ Night</span></h2> */}
                                            </div>
                                            <div className='suggested-card-desc'>
                                                <p>{item.description}</p>
                                            </div>
                                            <div className="line-separator"></div>
                                            <ul className='suggested-card-features'>
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
                                            <button className='suggested-card-button'>
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

export default Suggested