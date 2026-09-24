"use client"
import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'motion/react'
import { useLuna } from './LunaContext'
import { LUNA_POSE_HERO, LUNA_AVATAR, LUNA_HERO_BUBBLE, LUNA_SPRING, LUNA_SPRING_SOFT } from './lunaConfig'

// The animated Luna character. She is fixed to the viewport's bottom-right corner
// (see .parallax-hero__luna) and shows only while the hero banner is on screen
// and the chat is closed — `heroActive` is driven by the banner's in-view state
// in Hero.jsx. When she leaves (scroll past the banner, or the chat opens) the
// round corner launcher takes over, so there is only ever one Luna. Honors
// prefers-reduced-motion.
const LunaHero = () => {
    const { open, heroActive, openChat } = useLuna()
    const reduce = useReducedMotion()

    const [hovered, setHovered] = useState(false)
    const [showHi, setShowHi] = useState(false)

    const show = heroActive && !open

    // Preload the pose so it never pops in late.
    useEffect(() => {
        const img = new window.Image()
        img.src = LUNA_POSE_HERO
    }, [])

    // Greet with a bubble each time she appears; retire it after a moment.
    useEffect(() => {
        if (!show) { setShowHi(false); return }
        const t1 = window.setTimeout(() => setShowHi(true), 900)
        const t2 = window.setTimeout(() => setShowHi(false), 5200)
        return () => { clearTimeout(t1); clearTimeout(t2) }
    }, [show])

    const showBubble = hovered || showHi

    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    className="parallax-hero__luna"
                    initial={reduce ? { opacity: 0 } : { opacity: 0, y: 60, scale: 0.85 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={reduce ? { opacity: 0 } : { opacity: 0, y: 40, scale: 0.8 }}
                    transition={{ type: 'spring', stiffness: 120, damping: 16, delay: 0.4 }}
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
                        // Gentle idle: float + breathe + a slight sway so she feels alive.
                        animate={reduce ? undefined : { y: [0, -10, 0], scale: [1, 1.03, 1], rotate: [0, -1.5, 0, 1.5, 0] }}
                        transition={reduce ? undefined : { duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                        whileHover={{ scale: 1.06, rotate: -2, transition: LUNA_SPRING }}
                        whileTap={{ scale: 0.94, transition: LUNA_SPRING }}
                    >
                        <AnimatePresence>
                            {showBubble && (
                                <motion.span
                                    key="bubble"
                                    className="parallax-hero__luna-bubble"
                                    initial={{ opacity: 0, y: 8, scale: 0.9 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 8, scale: 0.9 }}
                                    transition={LUNA_SPRING_SOFT}
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
            )}
        </AnimatePresence>
    )
}

export default LunaHero
