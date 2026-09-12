import React from 'react'
import { Button } from '@/components/ui/button'
import Reveal from '../../Components/Reveal'
import { BOOKING_URL } from '@/config'

const trim = (s = "", n = 180) => (s.length > n ? s.slice(0, n).trimEnd() + "…" : s)

// "Plan Your Stay" — reuses the homepage "Discover Our Destinations" banner card
// (image left / info right) so the look is consistent across the site.
const BookNow = ({ data = {} }) => {
    return (
        <section className="book-now-section bg-transparent py-16 md:py-24">
            <div className="cmpad">
                <Reveal>
                    <div className="destination-banner">
                        <div className="destination-banner__media">
                            {/* Plain <img> to match the rest of the site's CMS image handling. */}
                            <img
                                src={data.mainImage}
                                alt={data.title || 'Lunevia retreat'}
                                loading="lazy"
                            />
                        </div>
                        <div className="destination-banner__info">
                            <span className="destination-banner__eyebrow">Plan Your Stay</span>
                            <h3 className="destination-banner__title">{data.title}</h3>
                            <p className="destination-banner__subtitle">{trim(data.description)}</p>
                            <div className="destination-banner__actions">
                                <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" aria-label="Book now">
                                    <Button>Book Now</Button>
                                </a>
                                <a
                                    href={BOOKING_URL}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="destination-banner__link"
                                >
                                    Check live availability
                                </a>
                            </div>
                        </div>
                    </div>
                </Reveal>
            </div>
        </section>
    )
}

export default BookNow
