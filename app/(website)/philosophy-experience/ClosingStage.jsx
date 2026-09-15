import React from 'react'
import Reveal from '../Components/Reveal'
import LiquidLink from '../Components/LiquidLink'
import { PAGE_DEFAULTS } from '@/helpers/pageDefaults'

const ClosingStage = ({ data }) => {
    const d = { ...PAGE_DEFAULTS.experience.closing, ...(data || {}) }
    return (
        <section className="bg-transparent py-24 md:py-32">
            <div className="cmpad">
                <Reveal className="mx-auto max-w-3xl text-center">
                    <span className="text-xs font-semibold uppercase tracking-[0.35em] text-neutral-500 dark:text-neutral-400">
                        {d.eyebrow}
                    </span>
                    <h2 className="mt-4 text-3xl font-bold leading-tight tracking-tight text-neutral-900 dark:text-white md:text-5xl">
                        {d.title}
                    </h2>
                    <p className="mx-auto mt-6 max-w-xl leading-relaxed text-neutral-600 dark:text-neutral-400">
                        {d.subtext}
                    </p>
                    <div className="mt-9 flex justify-center">
                        <LiquidLink href={d.ctaLink}>{d.ctaLabel}</LiquidLink>
                    </div>
                </Reveal>
            </div>
        </section>
    )
}

export default ClosingStage
