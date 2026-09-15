"use client"
import React from 'react'
import Reveal from '../../Components/Reveal'

const Features = ({ data = [] }) => {
    return (
        <section className="relative bg-muted/30 py-20 md:py-28">
            <div className="cmpad">
                <Reveal className="mb-12 text-center" y={24}>
                    <span className="text-xs font-semibold uppercase tracking-[0.35em] text-neutral-500 dark:text-neutral-400">
                        Comforts
                    </span>
                    <h2 className="mt-3 text-3xl font-bold tracking-tight text-neutral-900 dark:text-white md:text-5xl">
                        Amenities
                    </h2>
                </Reveal>

                <div className="grid gap-6 md:grid-cols-2">
                    {data.map((item, i) => (
                        <Reveal as="div" key={i} delay={(i % 2) * 0.08} y={24}>
                            <div className="flex h-full gap-5 rounded-2xl border border-border/60 bg-card p-5 transition-all duration-500 hover:-translate-y-1 hover:shadow-xl">
                                <img
                                    src={item.image}
                                    alt={item.title || ''}
                                    loading="lazy"
                                    className="h-28 w-28 shrink-0 rounded-xl object-cover"
                                />
                                <div className="flex min-w-0 flex-col justify-center">
                                    <h3 className="text-lg font-bold tracking-tight text-foreground break-words">{item.title}</h3>
                                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground break-words">{item.description}</p>
                                </div>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Features
