"use client"
import React from 'react'
import { RadialScrollGallery } from '@/components/ui/portfolio-and-image-gallery'
import { Badge } from '@/components/ui/badge'
import { ArrowUpRight, X, ChevronLeft, ChevronRight } from 'lucide-react'
import { motion, AnimatePresence } from 'motion/react'

// Real Lunevia interiors/grounds mapped onto the radial scroll wheel.
const items = [
    { img: "/client-room-gallery/LBM04282.jpg", title: "Backwater Suite", cat: "Rooms", desc: "A serene suite opening onto the still backwaters — where daylight and water become part of the room." },
    { img: "/client-room-gallery/LBM05356.jpg", title: "Infinity Pool", cat: "Pool", desc: "An edge that dissolves into the horizon, the pool mirrors the sky from first light to dusk." },
    { img: "/client-room-gallery/LBM05383.jpg", title: "Private Villa", cat: "Villas", desc: "Secluded and self-contained, each villa is a private world framed by the landscape." },
    { img: "/client-room-gallery/LBM04998.jpg", title: "Sunset Deck", cat: "Views", desc: "A deck composed for the golden hour, drawing the eye out across the reserve." },
    { img: "/client-room-gallery/LBM04960.jpg", title: "Spa Pavilion", cat: "Wellness", desc: "A calm pavilion for restorative rituals, wrapped in greenery and quiet." },
    { img: "/client-room-gallery/LBM05237.jpg", title: "Garden Court", cat: "Grounds", desc: "Manicured courts and native planting knit the architecture into its setting." },
    { img: "/client-room-gallery/LBM05418.jpg", title: "Lakeside Dining", cat: "Dining", desc: "Considered menus served beside the water, where every table has a view." },
    { img: "/client-room-gallery/LBM05518.jpg", title: "Heritage Room", cat: "Rooms", desc: "Craft and character in equal measure — a room that honours place and tradition." },
]

const Gallery = () => {
    // Below lg the pinned radial wheel (which needs desktop width) is replaced by a
    // plain horizontal swipe strip; `isCompact` gates whether the GSAP wheel mounts.
    const [isCompact, setIsCompact] = React.useState(false)
    const [mounted, setMounted] = React.useState(false)
    // openIndex → single-image popup; viewAll → all-images grid popup. Both in-page.
    const [openIndex, setOpenIndex] = React.useState(null)
    const [viewAll, setViewAll] = React.useState(false)

    React.useEffect(() => {
        setMounted(true)
        const check = () => setIsCompact(window.innerWidth < 1024)
        check()
        window.addEventListener('resize', check)
        return () => window.removeEventListener('resize', check)
    }, [])

    // Single card renderer shared by the desktop radial wheel and the mobile strip.
    const renderCard = (item, index, isActive) => (
        <div
            className="group relative w-[200px] h-[280px] sm:w-[240px] sm:h-[320px] overflow-hidden rounded-xl bg-card border border-border shadow-lg"
        >
            <div className="absolute inset-0 overflow-hidden">
                <img
                    src={item.img}
                    alt={item.title}
                    loading="lazy"
                    className={`h-full w-full object-cover transition-transform duration-700 ease-out ${isActive ? 'scale-110 blur-0' : 'scale-100 blur-[1px] grayscale-[30%]'}`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/10 to-transparent opacity-60" />
            </div>

            <div className="absolute inset-0 flex flex-col justify-between p-4">
                <div className="flex justify-between items-start">
                    <Badge variant="secondary" className="text-[10px] px-2 py-0 bg-background/80 backdrop-blur">
                        {item.cat}
                    </Badge>
                    <div className={`w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center transition-all duration-500 ${isActive ? 'opacity-100 rotate-0' : 'opacity-0 -rotate-45'}`}>
                        <ArrowUpRight size={12} />
                    </div>
                </div>

                <div className={`transition-transform duration-500 ${isActive ? 'translate-y-0' : 'translate-y-2'}`}>
                    <h3 className="text-xl font-bold leading-tight text-white drop-shadow">{item.title}</h3>
                    <div className={`h-0.5 bg-primary mt-2 transition-all duration-500 ${isActive ? 'w-full opacity-100' : 'w-0 opacity-0'}`} />
                </div>
            </div>
        </div>
    )

    const modalOpen = openIndex !== null || viewAll

    // Lock body scroll while any popup is open.
    React.useEffect(() => {
        if (typeof document === 'undefined') return
        document.body.style.overflow = modalOpen ? 'hidden' : ''
        return () => { document.body.style.overflow = '' }
    }, [modalOpen])

    const closeAll = React.useCallback(() => {
        setOpenIndex(null)
        setViewAll(false)
    }, [])

    const showPrev = React.useCallback(
        () => setOpenIndex((i) => (i === null ? i : (i - 1 + items.length) % items.length)),
        []
    )
    const showNext = React.useCallback(
        () => setOpenIndex((i) => (i === null ? i : (i + 1) % items.length)),
        []
    )

    // Keyboard: ESC closes the topmost layer, arrows navigate the single view.
    React.useEffect(() => {
        if (!modalOpen) return
        const onKey = (e) => {
            if (e.key === 'Escape') {
                if (openIndex !== null) setOpenIndex(null)
                else setViewAll(false)
            } else if (openIndex !== null && e.key === 'ArrowLeft') {
                showPrev()
            } else if (openIndex !== null && e.key === 'ArrowRight') {
                showNext()
            }
        }
        window.addEventListener('keydown', onKey)
        return () => window.removeEventListener('keydown', onKey)
    }, [modalOpen, openIndex, showPrev, showNext])

    const active = openIndex !== null ? items[openIndex] : null

    return (
        <section className='gallery'>
            <div className='cmpad'>
                <div className='gallery-header text-center'>
                    <h6>GALLERY</h6>
                    <h1>Moments of Refined <br />Resort Living</h1>
                    <p className="mt-3 text-sm tracking-widest uppercase text-neutral-500 dark:text-neutral-400 animate-bounce">
                        <span className="hidden lg:inline">↓ Scroll to explore</span>
                        <span className="lg:hidden">Swipe to explore →</span>
                    </p>
                    <button type="button" onClick={() => setViewAll(true)} className="gallery-viewall-btn">
                        View All
                        <ArrowUpRight size={16} />
                    </button>
                </div>
            </div>

            {/* Desktop (lg+): the pinned radial scroll wheel. Only mounted on wide screens
                so GSAP ScrollTrigger never pins on phones/tablets (which left a tall dead gap). */}
            {mounted && !isCompact && (
                <div className="hidden lg:block">
                    <RadialScrollGallery
                        baseRadius={560}
                        mobileRadius={185}
                        visiblePercentage={45}
                        scrollDuration={2400}
                        onItemSelect={(i) => setOpenIndex(i)}
                    >
                        {(hoveredIndex) =>
                            items.map((item, index) => renderCard(item, index, hoveredIndex === index))
                        }
                    </RadialScrollGallery>
                </div>
            )}

            {/* Mobile + tablet (<lg): a compact horizontal swipe strip. Pure CSS visibility
                so it renders on first paint with no layout shift; cards open the same popup. */}
            <div className="lg:hidden">
                <ul className="flex gap-4 overflow-x-auto px-6 pb-4 snap-x snap-mandatory [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                    {items.map((item, index) => (
                        <li key={item.img} className="snap-center shrink-0">
                            <button
                                type="button"
                                aria-label={`View ${item.title}`}
                                onClick={() => setOpenIndex(index)}
                                className="block rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                            >
                                {renderCard(item, index, true)}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>

            {/* In-page popups: all-images grid + single-image detail */}
            <AnimatePresence>
                {viewAll && (
                    <motion.div
                        key="gallery-grid"
                        className="gallery-modal"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setViewAll(false)}
                    >
                        <div className="gallery-modal__panel gallery-modal__panel--grid" onClick={(e) => e.stopPropagation()}>
                            <div className="gallery-modal__bar">
                                <div>
                                    <h4 className="gallery-modal__heading">Gallery</h4>
                                    <p className="gallery-modal__count">{items.length} moments</p>
                                </div>
                                <button type="button" aria-label="Close" onClick={() => setViewAll(false)} className="gallery-modal__close">
                                    <X size={20} />
                                </button>
                            </div>
                            <div className="gallery-modal__grid">
                                {items.map((item, index) => (
                                    <button
                                        type="button"
                                        key={item.img}
                                        className="gallery-modal__thumb"
                                        onClick={() => setOpenIndex(index)}
                                    >
                                        <img src={item.img} alt={item.title} loading="lazy" />
                                        <span className="gallery-modal__thumb-label">
                                            <strong>{item.title}</strong>
                                            <em>{item.cat}</em>
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {active && (
                    <motion.div
                        key="gallery-single"
                        className="gallery-modal gallery-modal--single"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setOpenIndex(null)}
                    >
                        <button type="button" aria-label="Close" onClick={() => setOpenIndex(null)} className="gallery-modal__close gallery-modal__close--float">
                            <X size={22} />
                        </button>
                        <button type="button" aria-label="Previous" onClick={(e) => { e.stopPropagation(); showPrev() }} className="gallery-modal__nav gallery-modal__nav--prev">
                            <ChevronLeft size={26} />
                        </button>
                        <button type="button" aria-label="Next" onClick={(e) => { e.stopPropagation(); showNext() }} className="gallery-modal__nav gallery-modal__nav--next">
                            <ChevronRight size={26} />
                        </button>

                        <motion.div
                            key={active.img}
                            className="gallery-modal__figure"
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3, ease: 'easeOut' }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <img src={active.img} alt={active.title} className="gallery-modal__image" />
                            <div className="gallery-modal__info">
                                <Badge variant="secondary" className="text-[11px] px-2 py-0">{active.cat}</Badge>
                                <h3 className="gallery-modal__info-title">{active.title}</h3>
                                <p className="gallery-modal__info-desc">{active.desc}</p>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    )
}

export default Gallery
