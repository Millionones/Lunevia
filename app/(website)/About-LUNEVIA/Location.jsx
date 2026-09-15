"use client"
import React from 'react'
import { LocationMap } from '@/components/ui/expand-map'
import { PAGE_DEFAULTS } from '@/helpers/pageDefaults'

const Location = ({ data }) => {
    const d = { ...PAGE_DEFAULTS.about.location, ...(data || {}) }
    return (
        <section className='Usps-section'>
            <div className='cmpad'>
                <div className='flex flex-col items-center text-center gap-10 py-6'>
                    <div className='Usps-header'>
                        <h2>{d.heading}</h2>
                        <p>{d.subtext}</p>
                    </div>
                    <LocationMap
                        location={d.label}
                        coordinates={d.coordinates}
                    />
                </div>
            </div>
        </section>
    )
}

export default Location
