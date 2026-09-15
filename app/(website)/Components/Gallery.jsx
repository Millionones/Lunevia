"use client"
import React from 'react'
import { RadialScrollGallery } from '@/components/ui/portfolio-and-image-gallery'
import { ArrowUpRight, X, ChevronLeft, ChevronRight } from 'lucide-react'
import { motion, AnimatePresence } from 'motion/react'

// Fallback set (real Lunevia interiors/grounds) used when the CMS provides no
// gallery images. The homepage feeds `data` (client-managed image URLs) from the
// backend; images are rendered raw — no tag/caption overlays.
const DEFAULT_IMAGES = [
    "/client-room-gallery/LBM04282.jpg",
    "/client-room-gallery/LBM05356.jpg",
    "/client-room-gallery/LBM05383.jpg",
    "/client-room-gallery/LBM04998.jpg",
    "/client-room-gallery/LBM04960.jpg",
    "/client-room-gallery/LBM05237.jpg",
    "/client-room-gallery/LBM05418.jpg",
    "/client-room-gallery/LBM05518.jpg",
]

const Gallery = ({ data = [] }) => {
    // Client-managed CMS images when present, else the bundled fallback set.
    const images = Array.isArray(data) && data.length ? data : DEFAULT_IMAGES

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
    // Image-only — no category tag or caption overlay (just a subtle open affordance).
    const renderCard = (img, index, isActive) => (
        <div
            className="group relative w-[200px] h-[280px] sm:w-[240px] sm:h-[320px] overflow-hidden rounded-xl bg-card border border-border shadow-lg"
        >
            <div className="absolute inset-0 overflow-hidden">
                <img
                    src={img}
                    alt=""
                    loading="lazy"
                    className={`h-full w-full object-cover transition-transform duration-700 ease-out ${isActive ? 'scale-110 blur-0' : 'scale-100 blur-[1px] grayscale-[30%]'}`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent opacity-40" />
            </div>

            <div className="absolute inset-0 flex items-start justify-end p-4">
                <div className={`w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center transition-all duration-500 ${isActive ? 'opacity-100 rotate-0' : 'opacity-0 -rotate-45'}`}>
                    <ArrowUpRight size={12} />
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

    const showPrev = React.useCallback(
        () => setOpenIndex((i) => (i === null ? i : (i - 1 + images.length) % images.length)),
        [images.length]
    )
    const showNext = React.useCallback(
        () => setOpenIndex((i) => (i === null ? i : (i + 1) % images.length)),
        [images.length]
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

    const active = openIndex !== null ? images[openIndex] : null

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
                            images.map((img, index) => renderCard(img, index, hoveredIndex === index))
                        }
                    </RadialScrollGallery>
                </div>
            )}

            {/* Mobile + tablet (<lg): a compact horizontal swipe strip. Pure CSS visibility
                so it renders on first paint with no layout shift; cards open the same popup. */}
            <div className="lg:hidden">
                <ul className="flex gap-4 overflow-x-auto px-6 pb-4 snap-x snap-mandatory [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                    {images.map((img, index) => (
                        <li key={`${img}-${index}`} className="snap-center shrink-0">
                            <button
                                type="button"
                                aria-label={`View gallery image ${index + 1}`}
                                onClick={() => setOpenIndex(index)}
                                className="block rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                            >
                                {renderCard(img, index, true)}
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
                                    <p className="gallery-modal__count">{images.length} moments</p>
                                </div>
                                <button type="button" aria-label="Close" onClick={() => setViewAll(false)} className="gallery-modal__close">
                                    <X size={20} />
                                </button>
                            </div>
                            <div className="gallery-modal__grid">
                                {images.map((img, index) => (
                                    <button
                                        type="button"
                                        key={`${img}-${index}`}
                                        className="gallery-modal__thumb"
                                        onClick={() => setOpenIndex(index)}
                                    >
                                        <img src={img} alt="" loading="lazy" />
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
                            key={active}
                            className="gallery-modal__figure"
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3, ease: 'easeOut' }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <img src={active} alt="" className="gallery-modal__image" />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    )
}

export default Gallery
