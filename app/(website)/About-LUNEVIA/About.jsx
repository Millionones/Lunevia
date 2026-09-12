import React from 'react'
import Reveal from '../Components/Reveal'
import { BorderBeamPanel } from '@/components/ui/creative/border-beam-panel'
import { DotPattern } from '@/components/ui/dot-pattern'

const About = () => {
    return (
        <section className='about-section relative overflow-hidden'>
            <DotPattern className='pointer-events-none absolute inset-0 -z-10 h-full w-full fill-neutral-300/40 dark:fill-neutral-700/40 [mask-image:radial-gradient(65%_55%_at_50%_25%,black,transparent)]' />
            <div className='cmpad'>
                {/* Header */}
                <Reveal className='max-w-4xl' y={24}>
                    <span className='text-xs font-semibold uppercase tracking-[0.35em] text-neutral-500 dark:text-neutral-400'>
                        About Us
                    </span>
                    <h2 className='mt-4 text-3xl md:text-[2.75rem] leading-[1.15] font-bold tracking-tight text-neutral-900 dark:text-white'>
                        Elevated Resort Living — Defined by Thoughtful Design, Genuine Hospitality, and Timeless Comfort
                    </h2>
                </Reveal>

                {/* Media + copy */}
                <div className='mt-12 grid items-center gap-10 md:gap-16 md:grid-cols-2'>
                    <Reveal y={32}>
                        <BorderBeamPanel
                            beams={2}
                            radius={20}
                            thickness={2}
                            glow
                            colors={['#e9dcc3', '#34d399']}
                            className='mx-auto w-full max-w-[560px] bg-background/30 p-2'
                        >
                            <img
                                src='/about-us-about2.webp'
                                alt='A LUNEVIA resort landscape'
                                loading='lazy'
                                className='h-auto w-full rounded-2xl object-cover'
                            />
                        </BorderBeamPanel>
                    </Reveal>

                    <Reveal className='flex flex-col gap-5' delay={0.12}>
                        <p className='text-base leading-relaxed text-neutral-600 dark:text-neutral-400'>
                            Lunevia is a hospitality-focused brand engaged in owning, leasing, developing, and operating
                            resorts, restaurants, and other hospitality properties. Our vision is to create destinations
                            that combine comfort, elegance, and genuine hospitality, while delivering sustainable value
                            through professional management and guest-centric operations.
                        </p>
                        <p className='text-base leading-relaxed text-neutral-600 dark:text-neutral-400'>
                            At Lunevia, we are committed to excellence in every aspect of hospitality — from property
                            selection and concept development to daily operations, service standards, and guest engagement.
                            We seek to create spaces that are not only beautiful and functional, but also enriching for
                            guests, partners, and communities.
                        </p>
                        <p className='text-base leading-relaxed text-neutral-600 dark:text-neutral-400'>
                            Driven by a passion for hospitality and a focus on long-term growth, Lunevia aspires to build a
                            trusted name known for quality experiences, efficient management, and distinctive destinations.
                        </p>
                    </Reveal>
                </div>
            </div>
        </section>
    )
}

export default About
