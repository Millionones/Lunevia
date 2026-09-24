"use client"
import React, { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence, useInView, useReducedMotion } from 'motion/react'
import { useLuna } from './LunaContext'
import { LUNA_POSE_HERO, LUNA_AVATAR, LUNA_HERO_BUBBLE } from './lunaConfig'

// The animated Luna character that lives in the homepage hero. She peeks in from
// the bottom-right corner (already mid-wave) and gently floats. A greeting bubble
// shows on entrance and on hover. Clicking her opens the chat (shared via
// LunaContext). While she is on screen she reports heroActive so the corner
// launcher steps aside. Honors prefers-reduced-motion.
const LunaHero = () => {
    const { openChat, setHeroActive } = useLuna()
    const reduce = useReducedMotion()

    const ref = useRef(null)
    const inView = useInView(ref, { amount: 0.2 })

    const [hovered, setHovered] = useState(false)
    const [showHi, setShowHi] = useState(false)

    // Tell the widget when the hero character owns the screen.
    useEffect(() => { setHeroActive(inView) }, [inView, setHeroActive])

    // Preload the pose so it never pops in late.
    useEffect(() => {
        const img = new window.Image()
        img.src = LUNA_POSE_HERO
    }, [])

    // Entrance: a greeting bubble that lingers a moment.
    useEffect(() => {
        const t1 = window.setTimeout(() => setShowHi(true), 900)
        const t2 = window.setTimeout(() => setShowHi(false), 5200)
        return () => { [t1, t2].forEach((t) => t && clearTimeout(t)) }
    }, [])

    const showBubble = hovered || showHi

    return (
        <motion.div
            ref={ref}
            className="parallax-hero__luna"
            initial={reduce ? false : { opacity: 0, y: 60, scale: 0.85 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ type: 'spring', stiffness: 120, damping: 16, delay: 0.6 }}
        >
            <motion.button
                type="button"
                onClick={openChat}
                onHoverStart={() => setHovered(true)}
                onHoverEnd={() => setHovered(false)}
                onFocus={() => setHovered(true)}
                onBlur={() => setHovered(false)}
                aria-label="Chat with Luna, our assistant"
                className="parallax-hero__luna-btn"
                animate={reduce ? undefined : { y: [0, -10, 0] }}
                transition={reduce ? undefined : { duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
            >
                <AnimatePresence>
                    {showBubble && (
                        <motion.span
                            key="bubble"
                            className="parallax-hero__luna-bubble"
                            initial={{ opacity: 0, y: 8, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 8, scale: 0.9 }}
                            transition={{ duration: 0.25 }}
                        >
                            {LUNA_HERO_BUBBLE}
                        </motion.span>
                    )}
                </AnimatePresence>

                <span className="parallax-hero__luna-art">
                    <img
                        src={LUNA_POSE_HERO}
                        alt="Luna"
                        className="parallax-hero__luna-img"
                        onError={(e) => { e.currentTarget.src = LUNA_AVATAR }}
                        draggable={false}
                    />
                </span>
            </motion.button>
        </motion.div>
    )
}

export default LunaHero
