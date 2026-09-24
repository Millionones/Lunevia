"use client"
import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'motion/react'
import { X } from 'lucide-react'
import { LUNA_AVATAR, LUNA_FALLBACK_AVATAR, LUNA_SPRING } from './lunaConfig'

// Fixed round launcher pinned to the bottom-right corner (Luna's home). Sized a
// touch larger than the WhatsApp button stacked above it. Springs in/out, reacts
// to hover/tap, and Luna waves shortly after load, periodically, and on hover.
// `hidden` retires it while the homepage-hero character is on screen so there is
// only ever one Luna visible (see LunaWidget / LunaContext).
const WAVE_MS = 1100
const WAVE_EVERY_MS = 7000

const LunaLauncher = ({ open, onToggle, hidden = false }) => {
    const reduce = useReducedMotion()
    const [waving, setWaving] = useState(false)

    const wave = () => {
        setWaving(true)
        window.setTimeout(() => setWaving(false), WAVE_MS)
    }

    // Wave once shortly after mount, then keep waving periodically. Skipped while
    // the button is retired (hero character on screen) or while the chat is open.
    useEffect(() => {
        if (hidden || open) return
        const intro = window.setTimeout(wave, 1200)
        const id = window.setInterval(wave, WAVE_EVERY_MS)
        return () => { clearTimeout(intro); clearInterval(id) }
    }, [hidden, open])

    return (
        <motion.button
            type="button"
            onClick={onToggle}
            onMouseEnter={() => { if (!open) wave() }}
            onFocus={() => { if (!open) wave() }}
            aria-label={open ? 'Close Luna assistant' : 'Open Luna assistant'}
            aria-expanded={open}
            aria-hidden={hidden}
            tabIndex={hidden ? -1 : 0}
            initial={false}
            animate={{ scale: hidden ? 0 : 1, opacity: hidden ? 0 : 1 }}
            transition={LUNA_SPRING}
            whileHover={reduce || hidden ? undefined : { scale: 1.1 }}
            whileTap={reduce || hidden ? undefined : { scale: 0.9 }}
            className={[
                'fixed bottom-6 right-5 z-[9991] flex h-12 w-12 items-center justify-center overflow-hidden rounded-full border border-border bg-card shadow-xl focus:outline-none focus:ring-2 focus:ring-primary/50 sm:h-14 sm:w-14',
                hidden ? 'pointer-events-none' : 'pointer-events-auto',
            ].join(' ')}
        >
            <AnimatePresence mode="wait" initial={false}>
                {open ? (
                    <motion.span
                        key="close"
                        initial={{ opacity: 0, rotate: -90, scale: 0.6 }}
                        animate={{ opacity: 1, rotate: 0, scale: 1 }}
                        exit={{ opacity: 0, rotate: 90, scale: 0.6 }}
                        transition={LUNA_SPRING}
                        className="flex items-center justify-center"
                    >
                        <X className="h-6 w-6 text-foreground" />
                    </motion.span>
                ) : (
                    // motion wrapper owns the crossfade; the inner <img> owns the
                    // CSS wave so the two transforms never fight over one element.
                    <motion.span
                        key="avatar"
                        initial={{ opacity: 0, scale: 0.6 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.6 }}
                        transition={LUNA_SPRING}
                        className="flex h-full w-full items-center justify-center"
                    >
                        <img
                            src={LUNA_AVATAR}
                            onError={(e) => { e.currentTarget.src = LUNA_FALLBACK_AVATAR }}
                            alt="Luna"
                            className={['h-full w-full object-cover', waving ? 'luna-wave' : ''].join(' ')}
                        />
                    </motion.span>
                )}
            </AnimatePresence>
        </motion.button>
    )
}

export default LunaLauncher
