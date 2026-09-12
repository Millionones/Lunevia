import React from 'react'
import { BorderBeamPanel } from '@/components/ui/creative/border-beam-panel'

const pillars = [
    {
        title: 'Connection to Nature',
        body: 'Our spaces are designed to blend seamlessly with their surroundings, allowing guests to experience Kerala’s landscapes — from misty hills to serene waters — in their purest form.',
    },
    {
        title: 'Slow Luxury',
        body: 'True luxury lies in time, privacy, and intention. At LUNEVIA, we create environments where guests can unwind, breathe, and rediscover the art of unhurried living.',
    },
    {
        title: 'Cultural Immersion',
        body: 'Every destination celebrates local traditions, cuisine, and craftsmanship — offering authentic experiences that reflect the spirit of Kerala.',
    },
    {
        title: 'Thoughtful Hospitality',
        body: 'Our team anticipates every detail so that guests can focus on what matters most — the experience.',
    },
]

const Pillars = () => {
    return (
        <section className='pillars-section'>
            <div className='cmpad'>
                <div className='pillars-inner'>
                    <h2>Core Philosophy Pillars</h2>
                    <div className='mt-10 grid gap-6 sm:grid-cols-2'>
                        {pillars.map((p, i) => (
                            <BorderBeamPanel
                                key={p.title}
                                beams={i % 2 ? 1 : 2}
                                radius={18}
                                thickness={1.5}
                                colors={['#e9dcc3', '#34d399']}
                                className='bg-background/40 p-7 md:p-9'
                            >
                                <h3 className='mb-3 text-xl md:text-2xl font-bold text-foreground'>{p.title}</h3>
                                <p className='leading-relaxed text-neutral-600 dark:text-neutral-400'>{p.body}</p>
                            </BorderBeamPanel>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Pillars
