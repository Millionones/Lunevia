"use client"
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { get } from "../../../helpers/api"
import { htmlToExcerpt } from "@/helpers/functions"

const DestinationList = () => {
    const [data, setData] = useState([])

    const [loading, setLoading] = useState(true)

    const fetchDestinations = async () => {
        try {
            const response = await get('website/destination?limit=6')
            if (response?.data) {
                setData(response.data)
            }
        } catch (err) {
            console.error('Failed to load destinations', err)
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        fetchDestinations()
    }, [])
    return (
        <section className='destination-list-section'>
            <div className='cmpad'>
                <div className='destination-list-inner'>
                    <div className='destination-list-header'>
                        <h5>Our Destinations</h5>
                        <h2>Thoughtfully Designed <br /> Luxury Destinations</h2>
                    </div>
                    {
                        loading ?
                            (
                                <div className='loader-div'>
                                    <img src="/loader_black.svg" alt="" />
                                </div>
                            )
                            :
                            <ul className='destination-list-grid'>
                                {
                                    data.map((item) => (
                                        <li className='destination-grid-card'>
                                            <Link href={`/destinations/${item.slug}`}>
                                                <div className='destination-card-media'>
                                                    <img src={item.mainImage} alt="" />
                                                </div>
                                                <div className='destination-card-detail'>
                                                    <div className='destination-card-header'>
                                                        <h2>{item.title}</h2>
                                                    </div>
                                                    <div className='destination-card-desc'>
                                                        <p>{htmlToExcerpt(item.aboutProperty?.description)}</p>
                                                    </div>
                                                    <div className="line-separator"></div>
                                                    {/* <ul className='destination-card-features'>
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
                                                    </ul> */}
                                                    <button className='destination-card-button'>
                                                        <p>BOOK NOW</p>
                                                    </button>
                                                </div>
                                            </Link>
                                        </li>
                                    ))
                                }
                            </ul>
                    }
                </div>
            </div>
        </section>
    )
}

export default DestinationList