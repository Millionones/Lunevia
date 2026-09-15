import Link from 'next/link'
import React from 'react'
import Reveal from '../Components/Reveal'
import { blogs } from './blogs'
import { htmlToExcerpt } from '@/helpers/functions'
import { PAGE_DEFAULTS } from '@/helpers/pageDefaults'

// Rich-text descriptions are HTML; strip tags to a short plain-text excerpt.
const excerpt = (html = '', n = 140) => htmlToExcerpt(html, n)

const List = ({ data, header }) => {
    const items = data && data.length ? data : blogs
    const h = { ...PAGE_DEFAULTS.blog.list, ...(header || {}) }
    return (
        <section className="bg-transparent py-20 md:py-28">
            <div className="cmpad">
                <div className="mx-auto mb-14 max-w-2xl text-center">
                    <span className="text-xs font-semibold uppercase tracking-[0.35em] text-neutral-500 dark:text-neutral-400">
                        {h.eyebrow}
                    </span>
                    <h2 className="mt-4 text-3xl font-bold tracking-tight text-neutral-900 dark:text-white md:text-5xl">
                        {h.heading}
                    </h2>
                    <p className="mx-auto mt-5 max-w-xl leading-relaxed text-neutral-600 dark:text-neutral-400">
                        {h.subtext}
                    </p>
                </div>

                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {items.map((blog, index) => (
                        <Reveal key={blog._id || blog.slug || blog.id || index} delay={(index % 3) * 0.08}>
                            <Link
                                href={`/blog/${blog.slug || ''}`}
                                className="group block h-full overflow-hidden rounded-3xl border border-neutral-200/80 bg-white/80 shadow-lg shadow-black/5 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-neutral-800 dark:bg-neutral-900/80"
                            >
                                <div className="relative aspect-[16/10] overflow-hidden">
                                    {/* Raw <img> to match the site's CMS/Supabase image handling
                                        (the next/image optimizer rejects these remote URLs). */}
                                    <img
                                        src={blog.image || blog.img}
                                        alt={blog.title || ''}
                                        loading="lazy"
                                        decoding="async"
                                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                </div>
                                <div className="p-6">
                                    <div className="mb-3 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-neutral-500 dark:text-neutral-400">
                                        <span>{blog.date}</span>
                                        {blog.category ? (
                                            <>
                                                <span className="text-neutral-300 dark:text-neutral-600">•</span>
                                                <span>{blog.category}</span>
                                            </>
                                        ) : null}
                                    </div>
                                    <h3 className="mb-2 line-clamp-2 text-lg font-bold leading-snug tracking-tight text-neutral-900 dark:text-white">
                                        {blog.title}
                                    </h3>
                                    <p className="line-clamp-3 text-[14px] leading-relaxed text-neutral-600 dark:text-neutral-400">
                                        {excerpt(blog.description)}
                                    </p>
                                    <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-neutral-900 transition-all group-hover:gap-2.5 dark:text-white">
                                        Read more <span aria-hidden>→</span>
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

export default List
