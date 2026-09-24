"use client"
import React, { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence, useInView, useReducedMotion } from 'motion/react'
import { useLuna } from './LunaContext'
import {
    LUNA_POSE_IDLE,
    LUNA_POSE_WAVE,
    LUNA_AVATAR,
    LUNA_HERO_BUBBLE,
} from './lunaConfig'

// The animated Luna character that lives in the homepage hero. Two full-figure
// poses (idle + wave) are stacked and crossfaded so Luna "raises her hand" to
// wave — on entrance, periodically, and on hover. Clicking her opens the chat
// (shared via LunaContext). While she is on screen she reports heroActive so
// the corner launcher steps aside. Honors prefers-reduced-motion.
const WAVE_MS = 1600
const WAVE_EVERY_MS = 7000

const LunaHero = () => {
    const { openChat, setHeroActive } = useLuna()
    const reduce = useReducedMotion()

    const ref = useRef(null)
    const inView = useInView(ref, { amount: 0.2 })

    const [waving, setWaving] = useState(false)
    const [hovered, setHovered] = useState(false)
    const [showHi, setShowHi] = useState(false)

    // Tell the widget when the hero character owns the screen.
    useEffect(() => { setHeroActive(inView) }, [inView, setHeroActive])

    // Preload both poses so the crossfade never flickers.
    useEffect(() => {
        [LUNA_POSE_IDLE, LUNA_POSE_WAVE].forEach((src) => {
            const img = new window.Image()
            img.src = src
        })
    }, [])

    const wave = () => {
        setWaving(true)
        window.setTimeout(() => setWaving(false), WAVE_MS)
    }

    // Entrance: a quick hello wave + a greeting bubble that lingers a moment.
    useEffect(() => {
        const t1 = window.setTimeout(() => setShowHi(true), 900)
        const t2 = window.setTimeout(() => setShowHi(false), 5200)
        const t3 = reduce ? null : window.setTimeout(wave, 900)
        return () => { [t1, t2, t3].forEach((t) => t && clearTimeout(t)) }
    }, [reduce])

    // Periodic wave to stay lively (skipped under reduced motion).
    useEffect(() => {
        if (reduce) return
        const id = window.setInterval(wave, WAVE_EVERY_MS)
        return () => clearInterval(id)
    }, [reduce])

    const showWave = hovered || waving
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
                        src={LUNA_POSE_IDLE}
                        alt="Luna"
                        className="parallax-hero__luna-img"
                        style={{ opacity: showWave ? 0 : 1 }}
                        onError={(e) => { e.currentTarget.src = LUNA_AVATAR }}
                        draggable={false}
                    />
                    <img
                        src={LUNA_POSE_WAVE}
                        alt=""
                        aria-hidden="true"
                        className="parallax-hero__luna-img parallax-hero__luna-img--wave"
                        style={{ opacity: showWave ? 1 : 0 }}
                        onError={(e) => { e.currentTarget.style.display = 'none' }}
                        draggable={false}
                    />
                </span>
            </motion.button>
        </motion.div>
    )
}

export default LunaHero
