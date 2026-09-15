import React from 'react'
import Reveal from '../Components/Reveal'
import { Waves, Sparkles, Trees, Sunset, ChefHat } from 'lucide-react'
import { PAGE_DEFAULTS } from '@/helpers/pageDefaults'

// Icons stay in code (keyed by position) so CMS edits to title/text can't break
// them; add more here if the experiences list grows.
const ICONS = [Waves, Sparkles, Trees, Sunset, ChefHat]

const ExperienceSection = ({ data }) => {
    const d = { ...PAGE_DEFAULTS.experience.experiences, ...(data || {}) }
    const items = Array.isArray(d.items) && d.items.length ? d.items : PAGE_DEFAULTS.experience.experiences.items
    return (
        <section className="bg-transparent py-20 md:py-28">
            <div className="cmpad">
                <div className="mx-auto mb-14 max-w-2xl text-center">
                    <span className="text-xs font-semibold uppercase tracking-[0.35em] text-neutral-500 dark:text-neutral-400">
                        {d.eyebrow}
                    </span>
                    <h2 className="mt-4 text-3xl font-bold tracking-tight text-neutral-900 dark:text-white md:text-5xl">
                        {d.heading}
                    </h2>
                    <p className="mx-auto mt-5 max-w-xl leading-relaxed text-neutral-600 dark:text-neutral-400">
                        {d.subtext}
                    </p>
                </div>

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {items.map((exp, i) => {
                        const Icon = ICONS[i % ICONS.length]
                        return (
                            <Reveal key={exp.title || i} delay={(i % 3) * 0.08}>
                                <div className="group h-full rounded-3xl border border-neutral-200/80 bg-white/80 p-8 shadow-lg shadow-black/5 backdrop-blur-sm transition-transform duration-300 hover:-translate-y-1 dark:border-neutral-800 dark:bg-neutral-900/80">
                                    <span className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-neutral-900/5 text-neutral-800 transition-colors group-hover:bg-neutral-900/10 dark:bg-white/10 dark:text-neutral-100">
                                        <Icon className="h-6 w-6" />
                                    </span>
                                    <h3 className="mb-2 text-lg font-bold tracking-tight text-neutral-900 dark:text-white">
                                        {exp.title}
                                    </h3>
                                    <p className="text-[15px] leading-relaxed text-neutral-600 dark:text-neutral-400">
                                        {exp.text}
                                    </p>
                                </div>
                            </Reveal>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}

export default ExperienceSection
