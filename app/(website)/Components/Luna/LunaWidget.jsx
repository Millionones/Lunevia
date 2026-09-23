"use client"
import React, { useEffect, useState } from 'react'
import LunaLauncher from './LunaLauncher'
import LunaIntroPopup from './LunaIntroPopup'
import LunaChat from './LunaChat'
import { getLunaKnowledge } from '@/helpers/lunaKnowledge'

// Orchestrates the Luna feature: loads the knowledge base once, owns the
// open/closed chat state, and shows the first-session intro greeting. Mounted
// site-wide on the public site (see app/(website)/layout.jsx).
const INTRO_SEEN_KEY = 'luna_intro_seen'
const INTRO_DELAY_MS = 3200 // let the homepage splash finish first

const LunaWidget = () => {
    const [kb, setKb] = useState(null)
    const [open, setOpen] = useState(false)
    const [intro, setIntro] = useState(false)

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

    const dismissIntro = () => {
        setIntro(false)
        try { sessionStorage.setItem(INTRO_SEEN_KEY, '1') } catch {}
    }

    const openChat = () => {
        setOpen(true)
        dismissIntro()
    }

    const toggleChat = () => {
        if (open) {
            setOpen(false)
        } else {
            openChat()
        }
    }

    return (
        <>
            <LunaIntroPopup show={intro && !open} onOpen={openChat} onDismiss={dismissIntro} />
            <LunaChat open={open} onClose={() => setOpen(false)} kb={kb} />
            <LunaLauncher open={open} onToggle={toggleChat} />
        </>
    )
}

export default LunaWidget
