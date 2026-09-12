"use client"
import React from 'react'
import Reveal from '../../Components/Reveal'
import { MapPin } from 'lucide-react'

const Locations = ({ data = [] }) => {
    return (
        <section className="relative py-20 md:py-28">
            <div className="cmpad">
                <Reveal className="mb-12 text-center" y={24}>
                    <span className="text-xs font-semibold uppercase tracking-[0.35em] text-neutral-500 dark:text-neutral-400">
                        Explore Around
                    </span>
                    <h2 className="mt-3 text-3xl font-bold tracking-tight text-neutral-900 dark:text-white md:text-5xl">
                        Nearby Locations
                    </h2>
                </Reveal>

                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {data.map((item, i) => (
                        <Reveal as="div" key={i} delay={(i % 3) * 0.08} y={28}>
                            <div className="group h-full overflow-hidden rounded-2xl border border-border/60 bg-card shadow-lg transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl">
                                <div className="relative aspect-[16/10] overflow-hidden">
                                    <img
                                        src={item.image || '/dummy-location.avif'}
                                        alt={item.title || ''}
                                        loading="lazy"
                                        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                    />
                                </div>
                                <div className="p-5">
                                    <h3 className="flex items-start gap-2 text-base font-bold tracking-tight text-foreground">
                                        <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                                        {item.title}
                                    </h3>
                                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground line-clamp-4">{item.description}</p>
                                </div>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Locations
