import React from 'react'
import Image from 'next/image'
import Reveal from './Reveal'
import { BorderBeamPanel } from '@/components/ui/creative/border-beam-panel'
import { DotPattern } from '@/components/ui/dot-pattern'
import LiquidLink from './LiquidLink'
import { PAGE_DEFAULTS } from '@/helpers/pageDefaults'

const Story = ({ data }) => {
    const d = { ...PAGE_DEFAULTS.home.story, ...(data || {}) }
    const paragraphs = Array.isArray(d.paragraphs) && d.paragraphs.length ? d.paragraphs : PAGE_DEFAULTS.home.story.paragraphs
    return (
        <section className='story-section relative overflow-hidden'>
            {/* Subtle textured backdrop */}
            <DotPattern
                className='pointer-events-none absolute inset-0 -z-10 h-full w-full fill-neutral-300/40 dark:fill-neutral-700/40 [mask-image:radial-gradient(60%_60%_at_50%_40%,black,transparent)]'
            />
            <div className='cmpad'>
                <div className='grid items-center gap-10 md:gap-16 md:grid-cols-2'>
                    {/* Media — beam-framed */}
                    <Reveal className='order-1' y={32}>
                        <BorderBeamPanel
                            beams={2}
                            radius={20}
                            thickness={2}
                            glow
                            colors={['#e9dcc3', '#34d399']}
                            className='mx-auto w-full max-w-[560px] bg-background/30 p-2'
                        >
                            <Image
                                src={d.image}
                                alt='A LUNEVIA property where architecture meets landscape'
                                width={800}
                                height={600}
                                sizes='(max-width: 768px) 92vw, 46vw'
                                className='h-auto w-full rounded-2xl object-cover'
                            />
                        </BorderBeamPanel>
                    </Reveal>

                    {/* Copy */}
                    <Reveal className='order-2 flex flex-col gap-5' delay={0.12}>
                        <span className='text-xs font-semibold uppercase tracking-[0.35em] text-neutral-500 dark:text-neutral-400'>
                            {d.eyebrow}
                        </span>
                        <h1 className='text-4xl md:text-5xl font-bold leading-tight tracking-tight text-neutral-900 dark:text-white'>
                            {d.title}
                        </h1>
                        <h5 className='text-lg md:text-xl font-bold text-neutral-700 dark:text-neutral-300'>
                            {d.subhead}
                        </h5>
                        {paragraphs.map((p, i) => (
                            <p key={i} className='text-base leading-relaxed text-neutral-600 dark:text-neutral-400'>
                                {p}
                            </p>
                        ))}
                        <div className='mt-3'>
                            <LiquidLink href={d.ctaLink} className='px-8'>{d.ctaLabel}</LiquidLink>
                        </div>
                    </Reveal>
                </div>
            </div>
        </section>
    )
}

export default Story
