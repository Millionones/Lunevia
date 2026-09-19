"use client"
import React, { useRef } from 'react'
import { Phone, Mail, MapPin } from 'lucide-react'
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from 'motion/react'

const EASE = [0.16, 1, 0.3, 1]

const Hero = ({ data }) => {
    // Use the banner image uploaded in the CMS directly — no local overrides.
    const heroSrc = data.mainImage

    // Scroll parallax on the title block (same idea as the homepage hero): as the
    // hero scrolls out, the copy lifts and fades. Spring-smoothed for the Lenis feel.
    const sectionRef = useRef(null)
    const reduce = useReducedMotion()
    const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] })
    const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 30, mass: 0.4 })
    const titleY = useTransform(progress, [0, 1], [0, -150])
    const titleOpacity = useTransform(progress, [0, 1], [1, 0.15])

    return (
        <section ref={sectionRef} className="relative h-dvh min-h-[600px] w-full overflow-hidden">
            <img
                src={heroSrc}
                alt={data.title || ''}
                fetchPriority="high"
                className="absolute inset-0 h-full w-full object-cover object-center"
            />
            {/* Legibility scrim */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/10 to-black/85" />

            {/* Title + contact chips — vertically centered, parallax on scroll */}
            <motion.div
                style={reduce ? undefined : { y: titleY, opacity: titleOpacity }}
                className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center text-white"
            >
                <motion.span
                    initial={reduce ? false : { opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
                    className="mb-4 text-xs font-semibold uppercase tracking-[0.4em] text-white/80"
                >
                    A Lunevia Retreat
                </motion.span>
                <motion.h1
                    initial={reduce ? false : { opacity: 0, y: 28 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.9, ease: EASE, delay: 0.2 }}
                    className="max-w-4xl text-4xl font-bold leading-[1.06] tracking-tight drop-shadow-[0_4px_30px_rgba(0,0,0,0.55)] md:text-6xl lg:text-7xl"
                >
                    {data.title}
                </motion.h1>

                <motion.div
                    initial={reduce ? false : { opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, ease: EASE, delay: 0.4 }}
                    className="mt-8 flex items-center gap-3"
                >
                    <a href="tel:+916238829339" aria-label="Call us" className="flex h-11 w-11 items-center justify-center rounded-full border border-white/30 bg-white/10 text-white backdrop-blur-md transition-all hover:scale-110 hover:bg-white/20">
                        <Phone className="h-4 w-4" />
                    </a>
                    <a href="mailto:info@lunevia.in" aria-label="Email us" className="flex h-11 w-11 items-center justify-center rounded-full border border-white/30 bg-white/10 text-white backdrop-blur-md transition-all hover:scale-110 hover:bg-white/20">
                        <Mail className="h-4 w-4" />
                    </a>
                    <a href="https://maps.app.goo.gl/VnXir9Z3hjZdwDPT9" target="_blank" rel="noopener noreferrer" aria-label="Find us on the map" className="flex h-11 w-11 items-center justify-center rounded-full border border-white/30 bg-white/10 text-white backdrop-blur-md transition-all hover:scale-110 hover:bg-white/20">
                        <MapPin className="h-4 w-4" />
                    </a>
                </motion.div>
            </motion.div>

            {/* Scroll cue */}
            <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 flex flex-col items-center gap-2 text-white/70">
                <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
                <span className="h-10 w-px animate-pulse bg-gradient-to-b from-white/70 to-transparent" />
            </div>
        </section>
    )
}

export default Hero
