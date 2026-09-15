"use client"
import React from 'react'
import { motion } from 'motion/react'
import { PAGE_DEFAULTS } from '@/helpers/pageDefaults'

const TestimonialsColumn = ({ className, testimonials, duration }) => {
    return (
        <div className={className}>
            <motion.ul
                animate={{ translateY: "-50%" }}
                transition={{
                    duration: duration || 10,
                    repeat: Infinity,
                    ease: "linear",
                    repeatType: "loop",
                }}
                className="flex flex-col gap-6 pb-6 bg-transparent list-none m-0 p-0"
            >
                {[...new Array(2).fill(0)].map((_, index) => (
                    <React.Fragment key={index}>
                        {testimonials.map(({ text, image, name, role }, i) => (
                            <motion.li
                                key={`${index}-${i}`}
                                aria-hidden={index === 1 ? "true" : "false"}
                                whileHover={{
                                    scale: 1.03,
                                    y: -8,
                                    transition: { type: "spring", stiffness: 400, damping: 17 },
                                }}
                                className="p-8 rounded-3xl border border-neutral-200/80 dark:border-neutral-800 shadow-lg shadow-black/5 max-w-xs w-full bg-white/85 dark:bg-neutral-900/85 backdrop-blur-sm transition-colors duration-300 cursor-default select-none group"
                            >
                                <blockquote className="m-0 p-0">
                                    <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed font-normal m-0 text-[15px]">
                                        {text}
                                    </p>
                                    <footer className="flex items-center gap-3 mt-6">
                                        <img
                                            width={40}
                                            height={40}
                                            src={image}
                                            alt={`Guest ${name}`}
                                            loading="lazy"
                                            className="h-10 w-10 rounded-full object-cover ring-2 ring-neutral-100 dark:ring-neutral-800 transition-all duration-300"
                                        />
                                        <div className="flex flex-col">
                                            <cite className="font-semibold not-italic tracking-tight leading-5 text-neutral-900 dark:text-white">
                                                {name}
                                            </cite>
                                            <span className="text-sm leading-5 tracking-tight text-neutral-500 dark:text-neutral-500 mt-0.5">
                                                {role}
                                            </span>
                                        </div>
                                    </footer>
                                </blockquote>
                            </motion.li>
                        ))}
                    </React.Fragment>
                ))}
            </motion.ul>
        </div>
    )
}

const Testimonials = ({ data }) => {
    const d = { ...PAGE_DEFAULTS.home.testimonials, ...(data || {}) }
    const items = Array.isArray(d.items) && d.items.length ? d.items : PAGE_DEFAULTS.home.testimonials.items
    const third = Math.ceil(items.length / 3)
    const firstColumn = items.slice(0, third)
    const secondColumn = items.slice(third, third * 2)
    const thirdColumn = items.slice(third * 2)
    return (
        <section
            aria-labelledby="testimonials-heading"
            className="bg-transparent py-24 relative overflow-hidden"
        >
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="px-4 z-10 mx-auto max-w-6xl"
            >
                <div className="flex flex-col items-center justify-center max-w-[560px] mx-auto mb-16">
                    <div className="border border-neutral-300 dark:border-neutral-700 py-1 px-4 rounded-full text-xs font-semibold tracking-wide uppercase text-neutral-600 dark:text-neutral-400 bg-neutral-100/50 dark:bg-neutral-800/50">
                        {d.badge}
                    </div>
                    <h2
                        id="testimonials-heading"
                        className="text-4xl md:text-5xl font-extrabold tracking-tight mt-6 text-center text-neutral-900 dark:text-white"
                    >
                        {d.heading}
                    </h2>
                    <p className="text-center mt-5 text-neutral-500 dark:text-neutral-400 text-lg leading-relaxed max-w-md">
                        {d.subtext}
                    </p>
                </div>

                <div
                    className="flex justify-center gap-6 mt-10 [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)] max-h-[740px] overflow-hidden"
                    role="region"
                    aria-label="Scrolling guest testimonials"
                >
                    <TestimonialsColumn testimonials={firstColumn} duration={17} />
                    <TestimonialsColumn testimonials={secondColumn} className="hidden md:block" duration={21} />
                    <TestimonialsColumn testimonials={thirdColumn} className="hidden lg:block" duration={19} />
                </div>
            </motion.div>
        </section>
    )
}

export default Testimonials
