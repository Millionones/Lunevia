import React from 'react'

const Highlights = ({ data }) => {
    if (!data?.length) return null
    return (
        <section className="relative bg-muted/30 py-20 md:py-28">
            <div className="cmpad text-center">
                <span className="text-xs font-semibold uppercase tracking-[0.35em] text-neutral-500 dark:text-neutral-400">
                    Property Highlights
                </span>
                <h2 className="mt-3 text-3xl font-bold tracking-tight text-neutral-900 dark:text-white md:text-5xl">
                    What Makes It Special
                </h2>
                <p className="mx-auto mt-4 max-w-md text-muted-foreground">
                    The property offers a host of thoughtful amenities.
                </p>

                <div className="mx-auto mt-10 flex max-w-4xl flex-wrap justify-center gap-3">
                    {data.map((item, i) => (
                        <span
                            key={i}
                            className="rounded-full border border-border bg-card px-5 py-2 text-sm font-medium text-foreground shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
                        >
                            {item.name}
                        </span>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Highlights
