import React from 'react'
import { BorderBeamPanel } from '@/components/ui/creative/border-beam-panel'
import { PAGE_DEFAULTS } from '@/helpers/pageDefaults'

const Pillars = ({ data }) => {
    const d = { ...PAGE_DEFAULTS.experience.pillars, ...(data || {}) }
    const items = Array.isArray(d.items) && d.items.length ? d.items : PAGE_DEFAULTS.experience.pillars.items
    return (
        <section className='pillars-section'>
            <div className='cmpad'>
                <div className='pillars-inner'>
                    <h2>{d.heading}</h2>
                    <div className='mt-10 grid gap-6 sm:grid-cols-2'>
                        {items.map((p, i) => (
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
