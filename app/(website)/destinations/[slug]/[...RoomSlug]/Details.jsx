import React from 'react'
import Image from 'next/image'
import { Check } from 'lucide-react'
import Reveal from '../../../Components/Reveal'
import { BOOKING_URL } from '@/config'

const Details = ({ slug, data }) => {
    return (
        <section id="detail" className="bg-transparent py-16 md:py-24">
            <div className="cmpad">
                <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-16">
                    {/* Main column */}
                    <div>
                        {data?.image ? (
                            <Reveal>
                                <div className="relative aspect-[16/10] w-full overflow-hidden rounded-3xl">
                                    <Image
                                        src={data.image}
                                        alt={data?.title || ''}
                                        fill
                                        priority
                                        sizes="(max-width: 1024px) 100vw, 65vw"
                                        className="object-cover"
                                    />
                                </div>
                            </Reveal>
                        ) : null}

                        <Reveal>
                            <h2 className="mt-8 text-3xl font-bold tracking-tight text-neutral-900 dark:text-white md:text-4xl">
                                {data?.title}
                            </h2>
                            {data?.description ? (
                                <div
                                    className="cms-reset mt-5 max-w-none leading-relaxed text-neutral-600 dark:text-neutral-400"
                                    dangerouslySetInnerHTML={{ __html: data.description }}
                                />
                            ) : null}
                        </Reveal>

                        {data?.availableFeatures ? (
                            <Reveal>
                                <div className="mt-12 border-t border-neutral-200 pt-8 dark:border-neutral-800">
                                    <h3 className="text-lg font-bold tracking-tight text-neutral-900 dark:text-white">Included</h3>
                                    <div
                                        className="cms-reset mt-4 text-neutral-600 dark:text-neutral-400"
                                        dangerouslySetInnerHTML={{ __html: data.availableFeatures }}
                                    />
                                </div>
                            </Reveal>
                        ) : null}

                        {data?.resortAmenities ? (
                            <Reveal>
                                <div className="mt-12 border-t border-neutral-200 pt-8 dark:border-neutral-800">
                                    <h3 className="text-lg font-bold tracking-tight text-neutral-900 dark:text-white">Resort Amenities</h3>
                                    <div
                                        className="cms-reset mt-4 text-neutral-600 dark:text-neutral-400"
                                        dangerouslySetInnerHTML={{ __html: data.resortAmenities }}
                                    />
                                </div>
                            </Reveal>
                        ) : null}
                    </div>

                    {/* Sticky sidebar */}
                    <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">
                        {data?.features?.length ? (
                            <div className="rounded-3xl border border-neutral-200/80 bg-white/80 p-6 shadow-lg shadow-black/5 backdrop-blur-sm dark:border-neutral-800 dark:bg-neutral-900/80">
                                <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                                    Room Detail
                                </h3>
                                <ul className="mt-4 space-y-3">
                                    {data.features.map((item, i) => (
                                        <li key={i} className="flex items-start gap-2.5 text-sm text-neutral-700 dark:text-neutral-300">
                                            <Check className="mt-0.5 h-4 w-4 shrink-0 text-neutral-900 dark:text-white" />
                                            <span><span className="font-semibold">{item.label}:</span> {item.answer}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ) : null}

                        <div className="overflow-hidden rounded-3xl border border-neutral-200/80 bg-white/80 shadow-lg shadow-black/5 backdrop-blur-sm dark:border-neutral-800 dark:bg-neutral-900/80">
                            <div className="relative aspect-[4/3] w-full overflow-hidden">
                                <img src="/booking-creative-1.jpeg" alt="" loading="lazy" decoding="async" className="h-full w-full object-cover" />
                            </div>
                            <div className="p-6 text-center">
                                <h3 className="text-lg font-bold tracking-tight text-neutral-900 dark:text-white">Ready to stay?</h3>
                                <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
                                    Check live availability and book your dates.
                                </p>
                                <a
                                    href={BOOKING_URL}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="mt-5 inline-flex w-full items-center justify-center rounded-full bg-primary px-8 py-3 text-sm font-bold text-primary-foreground transition hover:bg-primary/90"
                                >
                                    Book Now
                                </a>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </section>
    )
}

export default Details
