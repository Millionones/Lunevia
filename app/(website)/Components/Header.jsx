"use client"
import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Toaster } from 'react-hot-toast'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { ButtonWithIcon } from '@/components/ui/button-with-icon'
import { BOOKING_URL } from '@/config'

const NAV = [
    { label: 'About LUNEVIA', href: '/About-LUNEVIA' },
    { label: 'Experience', href: '/philosophy-experience' },
    { label: 'Destinations', href: '/destinations' },
    { label: 'Contact Us', href: '/Contact-us' },
]

const MOBILE_EXTRA = [
    { label: 'FAQs', href: '/faq' },
    { label: 'Blogs', href: '/blog' },
    { label: 'Terms & Conditions', href: '/terms-and-conditions' },
    { label: 'Privacy Policy', href: '/privacy-policy' },
]

// CTA buttons: transparent at idle (label inherits the header's current text
// colour so it stays readable over the hero and on the solid bar), filling in
// on hover.
const CTA_TRANSPARENT =
    'bg-transparent text-inherit hover:bg-primary/90 hover:text-primary-foreground'

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)
    const pathname = usePathname()
    const isDestinationPage = pathname === '/destinations/crown-woods-munnar-by-lunevia'

    // Lock body scroll while the mobile panel is open.
    useEffect(() => {
        document.body.style.overflow = menuOpen ? 'hidden' : 'auto'
        return () => { document.body.style.overflow = 'auto' }
    }, [menuOpen])

    // Scroll-aware: transparent over the hero → frosted bar after ~60px.
    useEffect(() => {
        let raf = 0
        const onScroll = () => {
            if (raf) return
            raf = requestAnimationFrame(() => {
                setScrolled(window.scrollY > 60)
                raf = 0
            })
        }
        onScroll()
        window.addEventListener('scroll', onScroll, { passive: true })
        return () => {
            window.removeEventListener('scroll', onScroll)
            if (raf) cancelAnimationFrame(raf)
        }
    }, [])

    const isActive = (href) => pathname === href

    return (
        <>
            <Toaster position="top-center" reverseOrder={false} />

            <header
                className={cn(
                    // Instant state switch — text/bg/border flip together the moment you
                    // cross the scroll threshold (no crossfade, no dark-on-dark flash).
                    'fixed top-0 left-0 z-[9999] w-full transition-none',
                    scrolled
                        ? 'bg-background/80 backdrop-blur-md border-b border-border/40 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.25)] text-foreground'
                        : 'bg-transparent text-white'
                )}
            >
                <div className="cmpad">
                    <div
                        className={cn(
                            'flex items-center justify-between transition-[height] duration-500',
                            scrolled ? 'h-[68px] lg:h-[76px]' : 'h-[80px] lg:h-[100px]'
                        )}
                    >
                        {/* Logo (contrast-swaps when the bar turns solid) */}
                        <Link href="/" aria-label="Lunevia home" className="relative flex items-center">
                            <Image
                                src="/logo-official-white.png"
                                alt="Lunevia"
                                width={140}
                                height={48}
                                priority
                                className={cn('h-auto w-auto max-w-[100px] sm:max-w-[140px]', scrolled ? 'hidden dark:block' : 'block')}
                            />
                            <Image
                                src="/logo-official-black.png"
                                alt="Lunevia"
                                width={140}
                                height={48}
                                className={cn('h-auto w-auto max-w-[100px] sm:max-w-[140px]', scrolled ? 'block dark:hidden' : 'hidden')}
                            />
                        </Link>

                        {/* Desktop menu */}
                        <nav className="hidden lg:block">
                            <ul className="header-menu flex gap-8">
                                {NAV.map((item) => (
                                    <li key={item.href}>
                                        <Link href={item.href} className={cn(isActive(item.href) && 'active')}>
                                            {item.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </nav>

                        {/* Desktop CTAs */}
                        <div className="hidden lg:flex items-center gap-3">
                            {!isDestinationPage && (
                                <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" aria-label="Book Now">
                                    <ButtonWithIcon glass arrowLight={!scrolled} className={CTA_TRANSPARENT}>Book Now</ButtonWithIcon>
                                </a>
                            )}
                            <Link href="/Contact-us" aria-label="Enquire Now">
                                <ButtonWithIcon glass arrowLight={!scrolled} className={CTA_TRANSPARENT}>Enquire Now</ButtonWithIcon>
                            </Link>
                        </div>

                        {/* Mobile toggle */}
                        <button
                            type="button"
                            className="flex lg:hidden items-center justify-center w-10 h-10 rounded-md transition-colors hover:bg-current/10"
                            aria-expanded={menuOpen}
                            aria-label="Open menu"
                            onClick={() => setMenuOpen(true)}
                        >
                            <Menu className="w-6 h-6" />
                        </button>
                    </div>
                </div>
            </header>

            {/* WhatsApp floating button */}
            <Link href="https://wa.me/+916238899339" target="_blank" className="wtsp-btn" aria-label="Chat on WhatsApp">
                <Image src="/whatsapp.png" alt="WhatsApp" width={48} height={48} />
            </Link>

            {/* Mobile slide-in panel + backdrop */}
            <div
                className={cn(
                    'fixed inset-0 z-[9998] bg-black/50 backdrop-blur-sm transition-opacity duration-500 lg:hidden',
                    menuOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
                )}
                onClick={() => setMenuOpen(false)}
            />
            <aside
                className={cn(
                    'fixed top-0 right-0 z-[9999] h-full min-h-screen w-[86%] max-w-[340px] bg-background text-foreground shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] lg:hidden',
                    menuOpen ? 'translate-x-0' : 'translate-x-full'
                )}
            >
                <div className="flex h-full flex-col justify-between gap-6 px-6 py-6">
                    <div className="flex flex-col gap-8">
                        <div className="flex items-center justify-between">
                            <Image src="/logo-official-black.png" alt="Lunevia" width={140} height={48} className="h-auto w-auto max-w-[130px] dark:hidden" />
                            <Image src="/logo-official-white.png" alt="Lunevia" width={140} height={48} className="hidden h-auto w-auto max-w-[130px] dark:block" />
                            <button onClick={() => setMenuOpen(false)} aria-label="Close menu" className="flex h-9 w-9 items-center justify-center rounded-md transition-colors hover:bg-foreground/10">
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        <ul className="flex flex-col gap-1">
                            {[...NAV, ...MOBILE_EXTRA].map((item) => (
                                <li key={item.href}>
                                    <Link
                                        href={item.href}
                                        onClick={() => setMenuOpen(false)}
                                        className={cn(
                                            'block rounded-lg px-3 py-3 text-sm font-bold uppercase tracking-[2px] transition-all hover:bg-foreground/5 hover:pl-5',
                                            isActive(item.href) ? 'text-foreground' : 'text-muted-foreground'
                                        )}
                                    >
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="flex flex-col gap-3">
                        {!isDestinationPage && (
                            <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" onClick={() => setMenuOpen(false)} aria-label="Book Now">
                                <ButtonWithIcon glass className={cn('w-full', CTA_TRANSPARENT)}>Book Now</ButtonWithIcon>
                            </a>
                        )}
                        <Link href="/Contact-us" onClick={() => setMenuOpen(false)} aria-label="Enquire Now">
                            <ButtonWithIcon glass className={cn('w-full', CTA_TRANSPARENT)}>Enquire Now</ButtonWithIcon>
                        </Link>
                    </div>
                </div>
            </aside>
        </>
    )
}

export default Header
