"use client"
import React, { createContext, useCallback, useContext, useMemo, useState } from 'react'

// Shared Luna state so the homepage-hero character and the corner launcher —
// which live in different render trees (Hero is in page.tsx, LunaWidget in
// layout.jsx) — control the same chat panel and hand off cleanly:
//   • openChat/closeChat/toggleChat drive the one chat window.
//   • heroActive is true while the hero character is on screen; the corner
//     launcher and the intro bubble hide during that window to avoid two Lunas.
const LunaContext = createContext(null)

export function LunaProvider({ children }) {
    const [open, setOpen] = useState(false)
    const [heroActive, setHeroActive] = useState(false)

    const openChat = useCallback(() => setOpen(true), [])
    const closeChat = useCallback(() => setOpen(false), [])
    const toggleChat = useCallback(() => setOpen((o) => !o), [])

    const value = useMemo(
        () => ({ open, openChat, closeChat, toggleChat, heroActive, setHeroActive }),
        [open, heroActive, openChat, closeChat, toggleChat]
    )

    return <LunaContext.Provider value={value}>{children}</LunaContext.Provider>
}

export function useLuna() {
    const ctx = useContext(LunaContext)
    if (!ctx) throw new Error('useLuna must be used within a LunaProvider')
    return ctx
}
