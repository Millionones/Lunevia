"use client"
import Link from 'next/link'
import React, { useState } from 'react'

const Rooms = ({ data, slug }) => {

    // const [data, setData] = useState([
    //     {
    //         id:"superior_room",
    //         img: '/Superior_Room.jpeg',
    //         title: 'Superior Room',
    //         description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio libero maiores quo dicta odit voluptas. Qui nulla dolorum excepturi, amet doloribus expedita quam exercitationem ab necessitatibus fuga velit reiciendis totam.'
    //     },
    //     {
    //         id:"deluxe_room",
    //         img: '/Deluxe_Room.jpeg',
    //         title: 'Deluxe Room ',
    //         description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio libero maiores quo dicta odit voluptas. Qui nulla dolorum excepturi, amet doloribus expedita quam exercitationem ab necessitatibus fuga velit reiciendis totam.'
    //     },
    //     {
    //         id:"suite_room",
    //         img: '/Suite_Room.jpeg',
    //         title: 'Suite Room',
    //         description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio libero maiores quo dicta odit voluptas. Qui nulla dolorum excepturi, amet doloribus expedita quam exercitationem ab necessitatibus fuga velit reiciendis totam.'
    //     },
    // ])
    return (
        <section className='rooms-section'>
            <div className='cmpad'>
                <div className='rooms-list-inner'>
                    <ul className='rooms-list-grid'>
                        {
                            data.map((item) => (
                                <li className='rooms-grid-card'>
                                    <Link href={`/destinations/${slug}/${item.slug}#detail`}>
                                        <div className='rooms-card-media'>
                                            <img src={item.image} alt="" />
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
                                                    <p>1 Kingbed</p>
                                                </li>
                                                <li>
                                                    <p>1 Bathroom</p>
                                                </li>
                                                <li>
                                                    <p>Free Wifi</p>
                                                </li>
                                            </ul>
                                            <button className='rooms-card-button'>
                                                <p>BOOK NOW</p>
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