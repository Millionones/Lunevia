"use client"
import { Button } from '@/components/ui/button'
import React, { useState } from 'react'

const Destinations = () => {

  const [data, setData] = useState([
    {
      img: '/destination1.png',
      title: 'LUNEVIA Backwater Reserve – Alleppey',
      description: 'Floating gently along tranquil canals, Backwater Reserve is a sanctuary of slow luxury. Private houseboat suites, palm-framed horizons, and golden reflections at dusk define this intimate waterside escape.'
    },
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
    },
    {
      img: '/destination5.png',
      title: 'LUNEVIA Kumarakom Lake Estate',
      description: 'Bordering Vembanad Lake, Lake Estate is a refined waterfront retreat where lotus-filled waters and heritage-inspired design create timeless elegance.'
    },
    {
      img: '/destination6.png',
      title: 'LUNEVIA Bekal Shoreline',
      description: 'Where historic fort views meet endless coastline, Bekal Shoreline offers contemporary beachfront villas infused with Kerala’s cultural warmth.'
    },
    {
      img: '/destination7.png',
      title: 'LUNEVIA Athirappilly Falls Retreat',
      description: 'Overlooking cascading waterfalls and dense greenery, Falls Retreat is a rare blend of power and tranquility — a place where nature performs endlessly.'
    },
    {
      img: '/destination8.png',
      title: 'LUNEVIA Marari Coastal Haven',
      description: 'A private beach sanctuary inspired by Kerala’s fishing villages, Coastal Haven combines understated design with barefoot elegance and uninterrupted ocean horizons.'
    },
  ])
  return (
    <section className='destination'>
      <div className='cmpad'>
        <div className='destination-inner'>
          <div className='destination-header'>
            <div>
              <h4>Discover Our Destinations</h4>
              <p>Each LUNEVIA property is a world of its own — united by philosophy, distinct in character.</p>
            </div>
            <Button>Show All</Button>
          </div>
          <div className='destination-grids'>
            <ul>
              {
                data.map((item, index) => {
                  return (
                    <li>
                      <div className='destination-grid'>
                        <div className="image-wrapper">
                          <img src={item.img} alt="" />
                        </div>
                        <div className='grid-details'>
                          <h5>{item.title}</h5>
                          <p>{item.description}</p>
                        </div>
                      </div>
                    </li>
                  )
                })
              }
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Destinations