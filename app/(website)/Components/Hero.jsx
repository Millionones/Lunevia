"use client"
import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import { PAGE_DEFAULTS } from '@/helpers/pageDefaults'

const Hero = ({ hero }) => {
    const h = hero || PAGE_DEFAULTS.home.hero
    // CMS-managed slides/copy, with the shipped defaults as fallback.
    const SLIDES = Array.isArray(h.slides) && h.slides.length ? h.slides : PAGE_DEFAULTS.home.hero.slides
    const eyebrow = h.eyebrow || PAGE_DEFAULTS.home.hero.eyebrow
    const tagline = h.tagline || PAGE_DEFAULTS.home.hero.tagline
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
                <span className="parallax-hero__eyebrow">{eyebrow}</span>
                <h1 className="parallax-hero__title">
                    <img src="/logo-official-white.png" alt="LUNEVIA" className="parallax-hero__logo" />
                </h1>
                <p className="parallax-hero__tagline">
                    {tagline}
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
