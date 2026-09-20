"use client"
import React from 'react'
import { Navigation } from 'lucide-react'
import { PAGE_DEFAULTS } from '@/helpers/pageDefaults'

// Location shown on the About page "Find Us" section. Change this one value to
// re-point the map + directions (from https://share.google/EatuuDPyhsGcIwYQH).
const MAPS_QUERY = 'Crown Woods Munnar'
const EMBED_SRC = `https://www.google.com/maps?q=${encodeURIComponent(MAPS_QUERY)}&output=embed`
// api=1 directions URL: opens the Google Maps app on mobile, web on desktop.
const DIRECTIONS_URL = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(MAPS_QUERY)}`

const Location = ({ data }) => {
    const d = { ...PAGE_DEFAULTS.about.location, ...(data || {}) }
    return (
        <section className='Usps-section'>
            <div className='cmpad'>
                <div className='flex flex-col items-center text-center gap-8 py-6'>
                    <div className='Usps-header'>
                        <h2>{d.heading}</h2>
                        <p>{d.subtext}</p>
                    </div>

                    {/* Content-width Google map */}
                    <div className='w-full overflow-hidden rounded-2xl border border-border'>
                        <iframe
                            title={`Map showing ${MAPS_QUERY}`}
                            src={EMBED_SRC}
                            className='block w-full h-[320px] sm:h-[400px] md:h-[460px]'
                            style={{ border: 0 }}
                            loading='lazy'
                            referrerPolicy='no-referrer-when-downgrade'
                            allowFullScreen
                        />
                    </div>

                    <a
                        href={DIRECTIONS_URL}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='inline-flex items-center gap-2 rounded-full bg-foreground px-7 py-3 text-sm font-medium text-background transition-opacity hover:opacity-90'
                    >
                        <Navigation size={18} />
                        Get Directions
                    </a>
                </div>
            </div>
        </section>
    )
}

export default Location
