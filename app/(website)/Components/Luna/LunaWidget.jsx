"use client"
import React, { useEffect, useState } from 'react'
import LunaLauncher from './LunaLauncher'
import LunaIntroPopup from './LunaIntroPopup'
import LunaChat from './LunaChat'
import { useLuna } from './LunaContext'
import { getLunaKnowledge } from '@/helpers/lunaKnowledge'

// Orchestrates the Luna feature: loads the knowledge base once and shows the
// first-session intro greeting. The open/closed chat state lives in LunaContext
// so the homepage-hero character and this corner launcher drive the same panel.
// Mounted site-wide on the public site (see app/(website)/layout.jsx).
const INTRO_SEEN_KEY = 'luna_intro_seen'
const INTRO_DELAY_MS = 3200 // let the homepage splash finish first

const LunaWidget = () => {
    const { open, openChat, closeChat, toggleChat, heroActive } = useLuna()
    const [kb, setKb] = useState(null)
    const [intro, setIntro] = useState(false)

    const dismissIntro = () => {
        setIntro(false)
        try { sessionStorage.setItem(INTRO_SEEN_KEY, '1') } catch {}
    }

    // Fetch the knowledge base once per session (cached in sessionStorage).
    useEffect(() => {
        let active = true
        getLunaKnowledge().then((data) => { if (active) setKb(data) })
        return () => { active = false }
    }, [])

    // Show the greeting bubble once per browser session.
    useEffect(() => {
        let seen = true
        try { seen = sessionStorage.getItem(INTRO_SEEN_KEY) === '1' } catch {}
        if (seen) return
        const t = setTimeout(() => setIntro(true), INTRO_DELAY_MS)
        return () => clearTimeout(t)
    }, [])

    // Whenever the chat opens (from any launcher), retire the intro bubble.
    useEffect(() => {
        if (open) dismissIntro()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open])

    // While the hero character owns the screen, the corner launcher and the
    // intro bubble step aside so there is only ever one Luna at a time.
    return (
        <>
            <LunaIntroPopup show={intro && !open && !heroActive} onOpen={openChat} onDismiss={dismissIntro} />
            <LunaChat open={open} onClose={closeChat} kb={kb} />
            <LunaLauncher open={open} onToggle={toggleChat} hidden={heroActive && !open} />
        </>
    )
}

export default LunaWidget
