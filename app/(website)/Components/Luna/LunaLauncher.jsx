"use client"
import React, { useEffect, useState } from 'react'
import { X } from 'lucide-react'
import { LUNA_AVATAR, LUNA_FALLBACK_AVATAR } from './lunaConfig'

// Fixed round launcher pinned to the bottom-right corner (Luna's home). Sized a
// touch larger than the WhatsApp button stacked above it. Luna waves shortly
// after load, periodically, and on hover to invite a click. `hidden` retires it
// while the homepage-hero character is on screen so there is only ever one Luna
// visible (see LunaWidget / LunaContext).
const WAVE_MS = 1100
const WAVE_EVERY_MS = 7000

const LunaLauncher = ({ open, onToggle, hidden = false }) => {
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
        <button
            type="button"
            onClick={onToggle}
            onMouseEnter={() => { if (!open) wave() }}
            onFocus={() => { if (!open) wave() }}
            aria-label={open ? 'Close Luna assistant' : 'Open Luna assistant'}
            aria-expanded={open}
            aria-hidden={hidden}
            tabIndex={hidden ? -1 : 0}
            className={[
                'fixed bottom-6 right-5 z-[9991] flex h-12 w-12 items-center justify-center overflow-hidden rounded-full border border-border bg-card shadow-xl transition-all duration-300 hover:scale-110 active:scale-95 focus:outline-none focus:ring-2 focus:ring-primary/50 sm:h-14 sm:w-14',
                hidden ? 'pointer-events-none scale-50 opacity-0' : 'scale-100 opacity-100',
            ].join(' ')}
        >
            {open ? (
                <X className="h-6 w-6 text-foreground" />
            ) : (
                <img
                    src={LUNA_AVATAR}
                    onError={(e) => { e.currentTarget.src = LUNA_FALLBACK_AVATAR }}
                    alt="Luna"
                    className={['h-full w-full object-cover', waving ? 'luna-wave' : ''].join(' ')}
                />
            )}
        </button>
    )
}

export default LunaLauncher
