"use client"
import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'

// Three banner photos, ~3s each.
const SLIDES = [
    { src: '/lunevia_home_hero1.jpg', alt: 'A Lunevia resort amid the landscape' },
    { src: '/lunevia_home_hero2.jpg', alt: 'A Lunevia resort, where architecture meets landscape' },
    { src: '/lunevia_home_hero3.jpg', alt: 'A Lunevia backwater retreat at dusk' },
    { src: '/client-room-gallery/LBM05356.jpg', alt: 'The light-filled reception at a Lunevia retreat' },
]

const Hero = () => {
    const rootRef = useRef(null)

    useEffect(() => {
        const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

        gsap.registerPlugin(ScrollTrigger)

        const ctx = gsap.context((self) => {
            const content = self.selector('[data-parallax-layer="content"]')

            // Intro reveal — minimal, premium
            gsap.from(content[0]?.children ?? [], {
                y: 40,
                opacity: 0,
                duration: 1.2,
                ease: 'power3.out',
                stagger: 0.12,
                delay: 0.15,
            })

            if (prefersReduced) return

            // Scroll: copy lifts & fades. The background is now a Swiper slider, so
            // we no longer parallax it (Swiper owns that layer's transforms).
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: rootRef.current,
                    start: 'top top',
                    end: 'bottom top',
                    scrub: 0.6,
                },
            })
            tl.to(content, { yPercent: -24, opacity: 0.25, ease: 'none' }, 0)
        }, rootRef)

        return () => ctx.revert()
    }, [])

    return (
        <section ref={rootRef} className="parallax-hero" aria-label="Lunevia">
            <div className="parallax-hero__bg" data-parallax-layer="bg">
                <Swiper
                    className="parallax-hero__swiper"
                    modules={[Autoplay, Pagination]}
                    slidesPerView={1}
                    loop
                    speed={1000}
                    autoplay={{ delay: 3000, disableOnInteraction: false }}
                    pagination={{ clickable: true, el: '.parallax-hero__dots' }}
                    allowTouchMove={false}
                >
                    {SLIDES.map((s, i) => (
                        <SwiperSlide key={s.src}>
                            <div className="parallax-hero__slide">
                                {/* Plain <img> (eager): Swiper clones slides for looping and
                                    clones of a lazy next/image never load — leaving a black slide. */}
                                <img
                                    src={s.src}
                                    alt={s.alt}
                                    loading="eager"
                                    fetchPriority={i === 0 ? 'high' : 'auto'}
                                />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            <div className="parallax-hero__scrim" aria-hidden="true" />

            <div className="parallax-hero__content" data-parallax-layer="content">
                <span className="parallax-hero__eyebrow">Luxury Resorts &amp; Retreats</span>
                <h1 className="parallax-hero__title">
                    <img src="/logo-official-white.png" alt="LUNEVIA" className="parallax-hero__logo" />
                </h1>
                <p className="parallax-hero__tagline">
                    Where architecture meets landscape.
                </p>
            </div>

            {/* Pagination lives outside the (z-0) background layer so it sits above the scrim. */}
            <div className="parallax-hero__dots" />

            <div className="parallax-hero__cue" aria-hidden="true">
                <span>Scroll</span>
                <span className="parallax-hero__cue-line" />
            </div>
        </section>
    )
}

export default Hero
