"use client"
import React from 'react'
import Reveal from '../../Components/Reveal'
import { BorderBeamPanel } from '@/components/ui/creative/border-beam-panel'
import { DotPattern } from '@/components/ui/dot-pattern'

const About = ({ data }) => {
    return (
        <section className="relative overflow-hidden py-20 md:py-28">
            <DotPattern className="pointer-events-none absolute inset-0 -z-10 h-full w-full fill-neutral-300/40 dark:fill-neutral-700/40 [mask-image:radial-gradient(60%_50%_at_50%_30%,black,transparent)]" />
            <div className="cmpad">
                <div className="grid items-start gap-10 md:gap-16 md:grid-cols-2">
                    <Reveal className="flex flex-col gap-5" y={28}>
                        <span className="text-center md:text-left text-xs font-semibold uppercase tracking-[0.35em] text-neutral-500 dark:text-neutral-400">
                            The Property
                        </span>
                        <h2 className="text-center md:text-left text-3xl font-bold leading-tight tracking-tight text-neutral-900 dark:text-white md:text-5xl">
                            {data.title}
                        </h2>
                        <div
                            className="cms-reset max-w-prose leading-relaxed text-neutral-600 dark:text-neutral-400 [&_h1]:text-2xl [&_h2]:text-xl [&_h1]:font-bold [&_h2]:font-bold [&_h1]:text-neutral-900 [&_h2]:text-neutral-900 dark:[&_h1]:text-white dark:[&_h2]:text-white [&_p]:mb-4 [&_ul]:mb-4 [&_ul]:list-disc [&_ul]:pl-5 [&_li]:mb-1"
                            dangerouslySetInnerHTML={{ __html: data.description }}
                        />
                    </Reveal>

                    <Reveal delay={0.12}>
                        <BorderBeamPanel
                            beams={2}
                            radius={20}
                            thickness={2}
                            glow
                            colors={['#e9dcc3', '#34d399']}
                            className="mx-auto w-full max-w-[560px] bg-background/30 p-2"
                        >
                            <img
                                src={data.image}
                                alt={data.title || ''}
                                loading="lazy"
                                className="h-auto w-full rounded-2xl object-cover"
                            />
                        </BorderBeamPanel>
                    </Reveal>
                </div>
            </div>
        </section>
    )
}

export default About
