"use client"
import React from 'react'
import { useRouter } from 'next/navigation'
import { LiquidButton } from '@/components/ui/liquid-glass-button'

// A LiquidButton that navigates like a link (valid markup — no <button> inside <a>).
const LiquidLink = ({ href = "/", children, className = "", onClick }) => {
    const router = useRouter()
    const handle = () => {
        if (onClick) onClick()
        router.push(href)
    }
    return (
        <LiquidButton onClick={handle} className={className}>
            {children}
        </LiquidButton>
    )
}

export default LiquidLink
