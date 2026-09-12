import React from 'react'
import Reveal from '../Components/Reveal'
import { Waves, Sparkles, Trees, Sunset, ChefHat } from 'lucide-react'

const experiences = [
    {
        icon: Waves,
        title: 'Private Backwater Cruises',
        text: 'Glide through still canals at dawn on a private canoe — kingfishers overhead and mist rising off the water.',
    },
    {
        icon: Sparkles,
        title: 'Ayurvedic Wellness Rituals',
        text: 'Time-honoured therapies and guided practices that restore body and mind, tailored entirely to you.',
    },
    {
        icon: Trees,
        title: 'Plantation Walks in Munnar',
        text: 'Wander emerald tea slopes with a local guide and taste the estate’s freshest single-origin brew.',
    },
    {
        icon: Sunset,
        title: 'Sunset Beach Dining',
        text: 'A candlelit table on the sand, a menu built around the day’s catch, the Arabian Sea for a backdrop.',
    },
    {
        icon: ChefHat,
        title: 'Kerala Cooking Sessions',
        text: 'Cook alongside our chefs — spices, coconut and coastal recipes passed down through generations.',
    },
]

const ExperienceSection = () => {
    return (
        <section className="bg-transparent py-20 md:py-28">
            <div className="cmpad">
                <div className="mx-auto mb-14 max-w-2xl text-center">
                    <span className="text-xs font-semibold uppercase tracking-[0.35em] text-neutral-500 dark:text-neutral-400">
                        Curated Experiences
                    </span>
                    <h2 className="mt-4 text-3xl font-bold tracking-tight text-neutral-900 dark:text-white md:text-5xl">
                        Designed Around You
                    </h2>
                    <p className="mx-auto mt-5 max-w-xl leading-relaxed text-neutral-600 dark:text-neutral-400">
                        No two journeys are the same. Each LUNEVIA stay is tailored to the guest —
                        from personalized dining to curated local adventures.
                    </p>
                </div>

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {experiences.map((exp, i) => {
                        const Icon = exp.icon
                        return (
                            <Reveal key={exp.title} delay={(i % 3) * 0.08}>
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
