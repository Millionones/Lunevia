"use client"
import React from 'react'
import { motion } from 'motion/react'
import { Star, Quote } from 'lucide-react'
import { PAGE_DEFAULTS } from '@/helpers/pageDefaults'

const EASE = [0.22, 1, 0.36, 1]

const Stars = () => (
    <div className="mb-4 flex gap-0.5 text-amber-400" aria-label="5 out of 5 stars">
        {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className="h-4 w-4 fill-current" aria-hidden />
        ))}
    </div>
)

const TestimonialContents = ({ data }) => {
    const d = { ...PAGE_DEFAULTS.testimonials.section, ...(data || {}) }
    const items = Array.isArray(d.items) && d.items.length ? d.items : PAGE_DEFAULTS.testimonials.section.items
    return (
        <section className="bg-transparent py-20 md:py-28">
            <div className="cmpad">
                {/* Section header */}
                <div className="mx-auto mb-14 max-w-2xl text-center">
                    <span className="text-xs font-semibold uppercase tracking-[0.35em] text-neutral-500 dark:text-neutral-400">
                        {d.eyebrow}
                    </span>
                    <h2 className="mt-4 text-3xl font-bold tracking-tight text-neutral-900 dark:text-white md:text-5xl">
                        {d.heading}
                    </h2>
                    <p className="mx-auto mt-5 max-w-md leading-relaxed text-neutral-600 dark:text-neutral-400">
                        {d.subtext}
                    </p>
                </div>

                {/* Masonry of glass testimonial cards */}
                <div className="columns-1 gap-6 sm:columns-2 lg:columns-3">
                    {items.map((t, i) => (
                        <motion.figure
                            key={i}
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{ duration: 0.6, ease: EASE, delay: (i % 3) * 0.08 }}
                            className="group mb-6 break-inside-avoid rounded-3xl border border-neutral-200/80 bg-white/85 p-8 shadow-lg shadow-black/5 backdrop-blur-sm transition-transform duration-300 hover:-translate-y-1 dark:border-neutral-800 dark:bg-neutral-900/85"
                        >
                            <Quote className="mb-4 h-8 w-8 text-neutral-300 dark:text-neutral-700" aria-hidden />
                            <Stars />
                            <h3 className="mb-3 text-lg font-bold tracking-tight text-neutral-900 dark:text-white">
                                {t.title}
                            </h3>
                            <blockquote className="m-0 p-0">
                                <p className="text-[15px] leading-relaxed text-neutral-600 dark:text-neutral-400">
                                    {t.text}
                                </p>
                                <figcaption className="mt-6 flex items-center gap-3">
                                    <img
                                        src={t.image}
                                        alt={t.name}
                                        width={44}
                                        height={44}
                                        loading="lazy"
                                        className="h-11 w-11 rounded-full object-cover ring-2 ring-neutral-100 dark:ring-neutral-800"
                                    />
                                    <span className="flex flex-col">
                                        <cite className="not-italic font-semibold tracking-tight text-neutral-900 dark:text-white">
                                            {t.name}
                                        </cite>
                                        <span className="text-sm text-neutral-500">{t.place}</span>
                                    </span>
                                </figcaption>
                            </blockquote>
                        </motion.figure>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default TestimonialContents
