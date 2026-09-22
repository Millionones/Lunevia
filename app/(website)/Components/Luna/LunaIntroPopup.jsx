"use client"
import React from 'react'
import { X } from 'lucide-react'
import { LUNA_AVATAR, LUNA_FALLBACK_AVATAR, LUNA_INTRO_TEXT } from './lunaConfig'

// First-session greeting bubble that pops next to the launcher. Extends to the
// LEFT of the launcher (same bottom level) so it never collides with the
// WhatsApp button stacked above. Dismissed on click, close, or opening chat.
const LunaIntroPopup = ({ show, onOpen, onDismiss }) => (
    <div
        className={[
            'fixed bottom-7 right-24 z-[9991] flex max-w-[240px] items-start gap-3 rounded-2xl rounded-br-sm border border-border bg-card p-3 text-card-foreground shadow-2xl transition-all duration-300',
            show ? 'pointer-events-auto translate-y-0 opacity-100' : 'pointer-events-none translate-y-2 opacity-0',
        ].join(' ')}
        role="dialog"
        aria-label="Luna greeting"
        aria-hidden={!show}
    >
        <img
            src={LUNA_AVATAR}
            onError={(e) => { e.currentTarget.src = LUNA_FALLBACK_AVATAR }}
            alt="Luna"
            className="h-9 w-9 shrink-0 rounded-full object-cover ring-1 ring-border"
        />
        <button type="button" onClick={onOpen} className="min-w-0 text-left">
            <p className="text-sm font-medium leading-snug">{LUNA_INTRO_TEXT}</p>
            <span className="mt-1 inline-block text-xs font-semibold text-primary">Chat with me →</span>
        </button>
        <button
            type="button"
            onClick={(e) => { e.stopPropagation(); onDismiss() }}
            aria-label="Dismiss"
            className="-mr-1 -mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-foreground/10 hover:text-foreground"
        >
            <X className="h-3.5 w-3.5" />
        </button>
    </div>
)

export default LunaIntroPopup
