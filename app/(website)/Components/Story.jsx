import React from 'react'
import Image from 'next/image'
import Reveal from './Reveal'
import { BorderBeamPanel } from '@/components/ui/creative/border-beam-panel'
import { DotPattern } from '@/components/ui/dot-pattern'
import LiquidLink from './LiquidLink'

const Story = () => {
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
                                src='/About_Image_Lunevia.png'
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
                            Our Philosophy
                        </span>
                        <h1 className='text-4xl md:text-5xl font-bold leading-tight tracking-tight text-neutral-900 dark:text-white'>
                            The LUNEVIA Way
                        </h1>
                        <h5 className='text-lg md:text-xl font-bold text-neutral-700 dark:text-neutral-300'>
                            At LUNEVIA, we believe travel is not about places — it is about transformation.
                        </h5>
                        <p className='text-base leading-relaxed text-neutral-600 dark:text-neutral-400'>
                            Each of our properties is carefully selected, thoughtfully designed, and deeply connected to
                            its surroundings. From secluded beachfront sanctuaries to hillside retreats wrapped in nature,
                            every LUNEVIA stay is curated to awaken the senses and slow the rhythm of life.
                        </p>
                        <p className='text-base leading-relaxed text-neutral-600 dark:text-neutral-400'>
                            We create spaces where architecture meets landscape, where culture meets comfort, and where
                            every detail is intentional.
                        </p>
                        <div className='mt-3'>
                            <LiquidLink href='/destinations' className='px-8'>Explore our locations</LiquidLink>
                        </div>
                    </Reveal>
                </div>
            </div>
        </section>
    )
}

export default Story
