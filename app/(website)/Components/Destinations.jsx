"use client"
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { get } from "../../../helpers/api"
const Destinations = () => {

  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchDestinations = async () => {
    let response = await get('website/destination?limit=6')
    if (response.data) {
      setData(response.data)
      setLoading(false)
    }
  }
  useEffect(() => {
    fetchDestinations()
  }, [])


  return (
    <section className='destination'>
      <div className='cmpad'>
        <div className='destination-inner'>
          <div className='destination-header'>
            <div>
              <h4>Discover Our Destinations</h4>
              <p>Each LUNEVIA property is a world of its own — united by philosophy, distinct in character.</p>
            </div>
            <Link href="/destinations">
              <Button>Show All</Button>
            </Link>
          </div>
          <div className='destination-grids'>
            {
              loading ?
                (
                  <div className='loader-div'>
                    <img src="/loader_black.svg" alt="" />
                  </div>
                )
                :
                <ul>
                  {
                    data.map((item, index) => {
                      return (
                        <li>
                          <Link href={`/destinations/${item.slug}`}>
                            <div className='destination-grid'>
                              <div className="image-wrapper">
                                <img src={item.mainImage} alt="" />
                              </div>
                              <div className='grid-details'>
                                <h5>{item.title}</h5>
                                <p>{item.description}</p>
                              </div>
                            </div>
                          </Link>
                        </li>
                      )
                    })
                  }
                </ul>
            }
          </div>
          <div className='flex sm:hidden justify-center'>
            <Link href="/destinations">
              <Button>Show More</Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Destinations