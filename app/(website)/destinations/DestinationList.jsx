"use client"
import Link from 'next/link'
import React, { useState } from 'react'

const DestinationList = () => {
    const [data, setData] = useState([
        {
            img: '/Banner-Image-Lunevia-1.jpg',
            // img: '/Crown_woods_Munnar1.jpeg',
            title: 'Crown woods Munnar By Lunevia',
            description: 'Crown woods Munnar, provides a perfect ambience for a relaxed stay. Surrounded by beautiful tea estates, valleys and waterfalls, the hotel is sure to attract hordes of tourists. Well furnished rooms with balcony, quality services and a comfortable setting are the key features of this resort.'
        },
        // {
        //     img: '/destination2.png',
        //     title: 'LUNEVIA Cliffside Kovalam',
        //     description: 'Perched above the Arabian Sea, Cliffside Kovalam offers dramatic ocean panoramas, infinity pools carved into rock, and sun-drenched terraces designed for unhurried indulgence.'
        // },
        // {
        //     img: '/destination3.png',
        //     title: 'LUNEVIA Munnar Mist Retreat',
        //     description: 'Set amid rolling tea plantations, Munnar Mist Retreat is wrapped in mountain air and drifting clouds. Glass-walled suites open to endless green, offering elevated stillness above the valley.'
        // },
        // {
        //     img: '/destination4.png',
        //     title: 'LUNEVIA Wayanad Forest Sanctuary',
        //     description: 'Hidden within dense rainforest, Forest Sanctuary blends eco-conscious architecture with curated comfort. Elevated wooden villas, private plunge pools, and immersive nature experiences define this retreat.'
        // },
        // {
        //     img: '/destination5.png',
        //     title: 'LUNEVIA Kumarakom Lake Estate',
        //     description: 'Bordering Vembanad Lake, Lake Estate is a refined waterfront retreat where lotus-filled waters and heritage-inspired design create timeless elegance.'
        // },
        // {
        //     img: '/destination6.png',
        //     title: 'LUNEVIA Bekal Shoreline',
        //     description: 'Where historic fort views meet endless coastline, Bekal Shoreline offers contemporary beachfront villas infused with Kerala’s cultural warmth.'
        // },
        // {
        //     img: '/destination7.png',
        //     title: 'LUNEVIA Athirappilly Falls Retreat',
        //     description: 'Overlooking cascading waterfalls and dense greenery, Falls Retreat is a rare blend of power and tranquility — a place where nature performs endlessly.'
        // },
        // {
        //     img: '/destination8.png',
        //     title: 'LUNEVIA Marari Coastal Haven',
        //     description: 'A private beach sanctuary inspired by Kerala’s fishing villages, Coastal Haven combines understated design with barefoot elegance and uninterrupted ocean horizons.'
        // },
    ])
    return (
        <section className='destination-list-section'>
            <div className='cmpad'>
                <div className='destination-list-inner'>
                    <div className='destination-list-header'>
                        <h5>Our Destinations</h5>
                        <h2>Thoughtfully Designed <br /> Luxury Destinations</h2>
                    </div>
                    <ul className='destination-list-grid'>
                        {
                            data.map((item) => (
                                <li className='destination-grid-card'>
                                    <Link href="/destinations/details">
                                        <div className='destination-card-media'>
                                            <img src={item.img} alt="" />
                                        </div>
                                        <div className='destination-card-detail'>
                                            <div className='destination-card-header'>
                                                <h2>{item.title}</h2>
                                                {/* <h2>$200 <span>/ Night</span></h2> */}
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
                                                    <p>1 Kingbed</p>
                                                </li>
                                                <li>
                                                    <p>1 Bathroom</p>
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

export default DestinationList