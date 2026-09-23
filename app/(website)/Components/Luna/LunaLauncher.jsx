"use client"
import React from 'react'
import { X } from 'lucide-react'
import { LUNA_AVATAR, LUNA_FALLBACK_AVATAR } from './lunaConfig'

// Fixed round launcher pinned to the bottom-right corner (Luna's home). Sits
// below the WhatsApp button in the same corner stack. Toggles the chat panel.
const LunaLauncher = ({ open, onToggle }) => (
    <button
        type="button"
        onClick={onToggle}
        aria-label={open ? 'Close Luna assistant' : 'Open Luna assistant'}
        aria-expanded={open}
        className="fixed bottom-6 right-5 z-[9991] flex h-14 w-14 items-center justify-center overflow-hidden rounded-full border border-border bg-card shadow-xl transition-transform duration-300 hover:scale-110 active:scale-95 focus:outline-none focus:ring-2 focus:ring-primary/50 sm:h-16 sm:w-16"
    >
        {open ? (
            <X className="h-6 w-6 text-foreground" />
        ) : (
            <img
                src={LUNA_AVATAR}
                onError={(e) => { e.currentTarget.src = LUNA_FALLBACK_AVATAR }}
                alt="Luna"
                className="h-full w-full object-cover"
            />
        )}
    </button>
)

export default LunaLauncher
