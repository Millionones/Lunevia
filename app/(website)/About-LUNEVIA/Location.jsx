"use client"
import React from 'react'
import { LocationMap } from '@/components/ui/expand-map'

const Location = () => {
    return (
        <section className='Usps-section'>
            <div className='cmpad'>
                <div className='flex flex-col items-center text-center gap-10 py-6'>
                    <div className='Usps-header'>
                        <h2>Where to Find Us</h2>
                        <p>Rooted in God&apos;s Own Country — our flagship retreats trace the backwaters, hills, and shoreline of Kerala. Tap the card to explore.</p>
                    </div>
                    <LocationMap
                        location="Kerala, India"
                        coordinates="9.4981° N, 76.3388° E"
                    />
                </div>
            </div>
        </section>
    )
}

export default Location
