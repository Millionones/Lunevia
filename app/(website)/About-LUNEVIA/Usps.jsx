import React from 'react'
import { BorderBeamPanel } from '@/components/ui/creative/border-beam-panel'
import { PAGE_DEFAULTS } from '@/helpers/pageDefaults'

const Usps = ({ data }) => {
    const d = { ...PAGE_DEFAULTS.about.usps, ...(data || {}) }
    const items = Array.isArray(d.items) && d.items.length ? d.items : PAGE_DEFAULTS.about.usps.items
    return (
        <section className='Usps-section'>
            <div className='cmpad'>
                <div className='Usps-inner'>
                    <div className='Usps-header'>
                        <h2>{d.heading}</h2>
                        <p>{d.subtext}</p>
                    </div>
                    <div className='mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
                        {items.map((u, i) => (
                            <BorderBeamPanel
                                key={u.title}
                                beams={i % 2 ? 1 : 2}
                                radius={18}
                                thickness={1.5}
                                colors={['#e9dcc3', '#34d399']}
                                className='bg-background/40 p-6 md:p-7'
                            >
                                <h3 className='mb-2 text-lg md:text-xl font-bold text-foreground'>{u.title}</h3>
                                <p className='text-sm leading-relaxed text-neutral-600 dark:text-neutral-400'>{u.body}</p>
                            </BorderBeamPanel>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Usps
