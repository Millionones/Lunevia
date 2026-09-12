"use client"
import Link from 'next/link'
import React from 'react'
import Reveal from '../../Components/Reveal'
import { ArrowUpRight } from 'lucide-react'

const Rooms = ({ data = [], slug }) => {
    return (
        <section className="relative py-20 md:py-28">
            <div className="cmpad">
                <Reveal className="mb-12 text-center" y={24}>
                    <span className="text-xs font-semibold uppercase tracking-[0.35em] text-neutral-500 dark:text-neutral-400">
                        Accommodation
                    </span>
                    <h2 className="mt-3 text-3xl font-bold tracking-tight text-neutral-900 dark:text-white md:text-5xl">
                        Rooms &amp; Suites
                    </h2>
                </Reveal>

                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {data.map((item, i) => (
                        <Reveal as="div" key={item.slug || i} delay={(i % 3) * 0.08} y={28}>
                            <Link
                                href={`/destinations/${slug}/${item.slug}#detail`}
                                className="group block overflow-hidden rounded-2xl border border-border/60 bg-card shadow-lg transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl"
                            >
                                <div className="relative aspect-[4/3] overflow-hidden">
                                    <img
                                        src={item.image}
                                        alt={item.title || ''}
                                        loading="lazy"
                                        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                                </div>
                                <div className="flex items-center justify-between gap-3 p-5">
                                    <h3 className="text-lg font-bold tracking-tight text-foreground">{item.title}</h3>
                                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground transition-transform duration-300 group-hover:rotate-45">
                                        <ArrowUpRight size={16} />
                                    </span>
                                </div>
                            </Link>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Rooms
