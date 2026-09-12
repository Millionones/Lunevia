"use client"
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { get } from '../../../../helpers/api'
import Reveal from '../../Components/Reveal'

const Details = ({ slug, data }) => {
    const [others, setOthers] = useState([])

    const fetchOtherBlogs = async () => {
        const response = await get(`website/blogs?limit=6&exclude=${slug}`);
        if (response && response.data) {
            setOthers(response.data);
        } else setOthers([])
    }

    useEffect(() => {
        fetchOtherBlogs();
    }, [slug]);

    return (
        <section className="bg-transparent py-16 md:py-24">
            <div className="cmpad">
                <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-16">
                    {/* Article body */}
                    <Reveal as="article" className="mx-auto w-full max-w-2xl lg:mx-0">
                        <div
                            className="cms-reset blog-details-content-desc max-w-none text-[16px] leading-relaxed text-neutral-700 dark:text-neutral-300"
                            dangerouslySetInnerHTML={{ __html: data?.description }}
                        />
                        {data?.category ? (
                            <div className="mt-10 border-t border-neutral-200 pt-6 dark:border-neutral-800">
                                <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                                    Category
                                </span>
                                <p className="mt-1 text-sm font-semibold text-neutral-900 dark:text-white">
                                    {data.category}
                                </p>
                            </div>
                        ) : null}
                    </Reveal>

                    {/* More stories */}
                    {others.length > 0 ? (
                        <aside className="lg:sticky lg:top-28 lg:self-start">
                            <h3 className="mb-5 text-sm font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                                More Stories
                            </h3>
                            <ul className="space-y-4">
                                {others.map((blog) => (
                                    <li key={blog.id || blog.slug}>
                                        <Link href={`/blog/${blog.slug}`} className="group flex gap-4">
                                            <div className="relative h-16 w-20 shrink-0 overflow-hidden rounded-xl">
                                                <img
                                                    src={blog.image}
                                                    alt={blog.title}
                                                    loading="lazy"
                                                    decoding="async"
                                                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                                />
                                            </div>
                                            <div>
                                                <h4 className="line-clamp-2 text-sm font-bold leading-snug tracking-tight text-neutral-900 transition-colors group-hover:text-neutral-600 dark:text-neutral-100 dark:group-hover:text-neutral-300">
                                                    {blog.title}
                                                </h4>
                                                <p className="mt-1 text-xs text-neutral-500">{blog.date}</p>
                                            </div>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </aside>
                    ) : null}
                </div>
            </div>
        </section>
    )
}

export default Details
