"use client"
import Link from 'next/link'
import React, { useState } from 'react'

const Rooms = () => {

    const [data, setData] = useState([
        {
            img: 'https://templates.sparklethings.com/palmea/wp-content/uploads/sites/246/2026/02/3d-rendering-luxury-tropical-bedroom-suite-in-reso-2026-01-07-02-15-56-utc-1024x682.webp',
            title: 'Superior Room',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio libero maiores quo dicta odit voluptas. Qui nulla dolorum excepturi, amet doloribus expedita quam exercitationem ab necessitatibus fuga velit reiciendis totam.'
        },
        {
            img: 'https://templates.sparklethings.com/palmea/wp-content/uploads/sites/246/2026/02/3d-rendering-luxury-tropical-bedroom-suite-in-reso-2026-01-07-02-15-56-utc-1024x682.webp',
            title: 'Deluxe Room ',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio libero maiores quo dicta odit voluptas. Qui nulla dolorum excepturi, amet doloribus expedita quam exercitationem ab necessitatibus fuga velit reiciendis totam.'
        },
        {
            img: 'https://templates.sparklethings.com/palmea/wp-content/uploads/sites/246/2026/02/3d-rendering-luxury-tropical-bedroom-suite-in-reso-2026-01-07-02-15-56-utc-1024x682.webp',
            title: 'Suite Room',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio libero maiores quo dicta odit voluptas. Qui nulla dolorum excepturi, amet doloribus expedita quam exercitationem ab necessitatibus fuga velit reiciendis totam.'
        },
    ])
    return (
        <section className='rooms-section'>
            <div className='cmpad'>
                <div className='rooms-list-inner'>
                    <ul className='rooms-list-grid'>
                        {
                            data.map((item) => (
                                <li className='rooms-grid-card'>
                                    <Link href="/destinations/details/room#detail">
                                        <div className='rooms-card-media'>
                                            <img src={item.img} alt="" />
                                        </div>
                                        <div className='rooms-card-detail'>
                                            <div className='rooms-card-header'>
                                                <h2>{item.title}</h2>
                                                {/* <h2>$200 <span>/ Night</span></h2> */}
                                            </div>
                                            {/* <div className='rooms-card-desc'>
                                                <p>{item.description}</p>
                                            </div> */}
                                            <div className="line-separator"></div>
                                            <ul className='rooms-card-features'>
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
                                            <button className='rooms-card-button'>
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