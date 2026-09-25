"use client"
import React, { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'motion/react'
import { X, Send } from 'lucide-react'
import { LUNA_AVATAR, LUNA_FALLBACK_AVATAR, LUNA_SPRING } from './lunaConfig'
import { matchLuna, getSuggestionPool } from '@/helpers/lunaMatch'
import { getReadSet, markRead, clearRead, normQ } from '@/helpers/lunaRead'

// Luna's chat window. Rule-based: every user message is answered locally by
// matchLuna() against the in-memory knowledge base — no network per message.
// Quick-reply chips rotate: once a question is read it is retired (persisted in
// localStorage) and the next unseen question from the knowledge base takes its
// place; when every question has been seen the pool recycles.
const GREETING = "Hi, I'm Luna 🌙 — your Lunevia assistant. Ask me about our stays, rooms, or anything about Crown Woods Munnar."
const CHIP_COUNT = 5
const WAVE_MS = 1200

const Avatar = ({ className }) => (
    <img
        src={LUNA_AVATAR}
        onError={(e) => { e.currentTarget.src = LUNA_FALLBACK_AVATAR }}
        alt="Luna"
        className={className}
    />
)

const LunaChat = ({ open, onClose, kb }) => {
    const reduce = useReducedMotion()
    const [messages, setMessages] = useState([{ from: 'luna', text: GREETING }])
    const [input, setInput] = useState('')
    const [suggestions, setSuggestions] = useState([])
    const [readSet, setReadSet] = useState(() => new Set())
    const [waving, setWaving] = useState(false)
    const scrollRef = useRef(null)
    const inputRef = useRef(null)

    // Load the persisted read-set once (client-only; empty during SSR).
    useEffect(() => { setReadSet(getReadSet()) }, [])

    // Derive the visible chips from the pool minus already-read questions.
    // When everything has been seen, recycle so the chips never disappear.
    useEffect(() => {
        if (!kb) return
        const pool = getSuggestionPool(kb)
        if (!pool.length) { setSuggestions([]); return }
        const visible = pool.filter((q) => !readSet.has(normQ(q)))
        if (visible.length === 0) {
            clearRead()
            setReadSet(new Set()) // re-runs this effect with a fresh pool
            return
        }
        setSuggestions(visible.slice(0, CHIP_COUNT))
    }, [kb, readSet])

    // Keep the newest message in view.
    useEffect(() => {
        if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }, [messages, open])

    // Give a little wave each time the panel opens. Only auto-focus the input on
    // desktop — on mobile/responsive that would pop up the on-screen keyboard and
    // shove the chat around, so we let the user tap the field when they're ready.
    useEffect(() => {
        if (!open) return
        const canAutoFocus =
            typeof window !== 'undefined' &&
            window.matchMedia('(min-width: 768px)').matches &&
            !window.matchMedia('(pointer: coarse)').matches
        let focusTimer
        if (canAutoFocus) focusTimer = setTimeout(() => inputRef.current?.focus(), 150)
        setWaving(true)
        const t = setTimeout(() => setWaving(false), WAVE_MS)
        return () => { clearTimeout(t); if (focusTimer) clearTimeout(focusTimer) }
    }, [open])

    // Retire a question so it drops off the chips (persisted across visits).
    const retire = (q) => {
        const id = normQ(q)
        if (!id) return
        markRead(q)
        setReadSet((prev) => {
            if (prev.has(id)) return prev
            const next = new Set(prev)
            next.add(id)
            return next
        })
    }

    const ask = (question, fromChip = false) => {
        const q = (question ?? input).trim()
        if (!q) return
        const { answer, question: matchedQ } = matchLuna(q, kb)
        setMessages((m) => [...m, { from: 'user', text: q }, { from: 'luna', text: answer }])
        setInput('')
        // Retire the clicked chip, or a typed query that resolved to a chip question.
        if (fromChip) retire(q)
        else if (matchedQ) retire(matchedQ)
    }

    const onSubmit = (e) => {
        e.preventDefault()
        ask()
    }

    return (
        <motion.div
            role="dialog"
            aria-label="Luna assistant chat"
            aria-hidden={!open}
            className="fixed bottom-24 right-4 sm:right-6 z-[9992] flex w-[92vw] max-w-[380px] flex-col overflow-hidden rounded-2xl border border-border bg-card text-card-foreground shadow-2xl"
            initial={false}
            animate={open
                ? { opacity: 1, scale: 1, y: 0 }
                : { opacity: 0, scale: reduce ? 1 : 0.9, y: reduce ? 0 : 12 }}
            transition={LUNA_SPRING}
            style={{
                height: 'min(72vh, 560px)',
                transformOrigin: 'bottom right',
                pointerEvents: open ? 'auto' : 'none',
            }}
        >
            {/* Header */}
            <div className="flex items-center gap-3 border-b border-border bg-muted/50 px-4 py-3">
                <Avatar className={['h-9 w-9 rounded-full object-cover ring-1 ring-border', waving ? 'luna-wave' : ''].join(' ')} />
                <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold">Luna</p>
                    <p className="truncate text-xs text-muted-foreground">Lunevia assistant</p>
                </div>
                <button
                    type="button"
                    onClick={onClose}
                    aria-label="Close chat"
                    className="flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-foreground/10 hover:text-foreground"
                >
                    <X className="h-4 w-4" />
                </button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
                <AnimatePresence initial={false}>
                    {messages.map((m, i) => (
                        <motion.div
                            key={i}
                            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={LUNA_SPRING}
                            className={m.from === 'user' ? 'flex justify-end' : 'flex items-end gap-2'}
                        >
                            {m.from === 'luna' && <Avatar className="h-6 w-6 shrink-0 rounded-full object-cover" />}
                            <div
                                className={[
                                    'max-w-[80%] rounded-2xl px-3.5 py-2 text-sm leading-relaxed',
                                    m.from === 'user'
                                        ? 'rounded-br-sm bg-primary text-primary-foreground'
                                        : 'rounded-bl-sm bg-muted text-foreground',
                                ].join(' ')}
                            >
                                {m.text}
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>

                {/* Quick-reply chips (rotate as questions are read; reflow smoothly) */}
                {suggestions.length > 0 && (
                    <motion.div layout className="flex flex-wrap gap-2 pt-1">
                        <AnimatePresence initial={false}>
                            {suggestions.map((s) => (
                                <motion.button
                                    key={s}
                                    layout
                                    initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.8 }}
                                    transition={LUNA_SPRING}
                                    type="button"
                                    onClick={() => ask(s, true)}
                                    className="rounded-full border border-border bg-background px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:border-primary hover:text-foreground"
                                >
                                    {s}
                                </motion.button>
                            ))}
                        </AnimatePresence>
                    </motion.div>
                )}
            </div>

            {/* Input */}
            <form onSubmit={onSubmit} className="flex items-center gap-2 border-t border-border px-3 py-3">
                <input
                    ref={inputRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask Luna…"
                    aria-label="Message Luna"
                    className="min-w-0 flex-1 rounded-full border border-border bg-background px-4 py-2 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary"
                />
                <button
                    type="submit"
                    aria-label="Send message"
                    disabled={!input.trim()}
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-40"
                >
                    <Send className="h-4 w-4" />
                </button>
            </form>
        </motion.div>
    )
}

export default LunaChat
