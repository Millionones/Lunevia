"use client"
import React from 'react'
import Link from 'next/link'
import { motion } from 'motion/react'
import { Button } from '@/components/ui/button'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Navigation, Pagination } from 'swiper/modules'
import { BOOKING_URL } from '@/config'
import { htmlToExcerpt } from '@/helpers/functions'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

// Two-column destination banners (image left / info right) as a slider.
// Fed by the live CMS destination data passed down from the homepage.
const DestinationBanners = ({ data = [] }) => {
    if (!data.length) return null

    return (
        <div className="destination-banner-slider">
            <Swiper
                modules={[Autoplay, Navigation, Pagination]}
                slidesPerView={1}
                loop={data.length > 1}
                speed={700}
                autoplay={{ delay: 6000, disableOnInteraction: false }}
                navigation
                pagination={{ clickable: true }}
            >
                {data.map((item, i) => (
                    <SwiperSlide key={item.slug || i}>
                        <div className="destination-banner">
                            <div className="destination-banner__media">
                                {/* Plain <img> to match the rest of the site's CMS image
                                    handling (Supabase URLs); avoids next/image loop/remote quirks. */}
                                <img
                                    src={item.mainImage}
                                    alt={item.title || 'Lunevia destination'}
                                    loading="lazy"
                                />
                            </div>
                            <div className="destination-banner__info">
                                <span className="destination-banner__eyebrow">Destination</span>
                                <h3 className="destination-banner__title">{item.title}</h3>
                                <p className="destination-banner__subtitle">{htmlToExcerpt(item.aboutProperty?.description)}</p>
                                {/* swiper-no-swiping so a slight drag over the CTAs registers as a
                                    click, not a swipe (Swiper would otherwise swallow the tap). */}
                                <div className="destination-banner__actions swiper-no-swiping">
                                    <motion.a
                                        href={BOOKING_URL}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={`Book ${item.title}`}
                                        className="destination-banner__cta-wrap"
                                        style={{ touchAction: 'manipulation' }}
                                        whileTap={{ scale: 0.94 }}
                                        whileHover={{ scale: 1.02 }}
                                    >
                                        <Button>Book Now</Button>
                                    </motion.a>
                                    <motion.div
                                        className="destination-banner__cta-wrap"
                                        whileTap={{ scale: 0.94 }}
                                    >
                                        <Link
                                            href={`/destinations/${item.slug}`}
                                            className="destination-banner__link"
                                            style={{ touchAction: 'manipulation' }}
                                        >
                                            Explore
                                        </Link>
                                    </motion.div>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}

export default DestinationBanners
