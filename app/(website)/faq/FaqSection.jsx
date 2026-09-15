"use client"
import React, { useState } from 'react'
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { DotPattern } from '@/components/ui/dot-pattern'
import Reveal from '../Components/Reveal'
import { arrowIconSvg } from '../../styles/icons'
import { PAGE_DEFAULTS } from '@/helpers/pageDefaults'

const FaqSection = ({ data }) => {
    const groups = Array.isArray(data?.groups) && data.groups.length ? data.groups : PAGE_DEFAULTS.faq.groups
    // Composite id ("g0-0") so groups don't collide on index.
    const [open, setOpen] = useState(null)
    const handleOpen = (id) => setOpen((prev) => (prev === id ? null : id))

    const renderGroup = (items, group) => (
        <div className='faqs'>
            {(items || []).map((item, idx) => {
                const id = `${group}-${idx}`
                return (
                    <Collapsible
                        key={id}
                        open={open === id}
                        onOpenChange={() => handleOpen(id)}
                        className='Collapsible'
                    >
                        <CollapsibleTrigger>
                            <p>{item.q}</p>
                            <span className={`faq-icon ${open === id ? 'faq-open' : ''}`}>{arrowIconSvg}</span>
                        </CollapsibleTrigger>
                        <CollapsibleContent className='CollapsibleContent'>
                            {item.a}
                        </CollapsibleContent>
                    </Collapsible>
                )
            })}
        </div>
    )

    return (
        <section className='faq-section relative overflow-hidden'>
            <DotPattern className='pointer-events-none absolute inset-0 -z-10 h-full w-full fill-neutral-300/40 dark:fill-neutral-700/40 [mask-image:radial-gradient(70%_60%_at_50%_0%,black,transparent)]' />
            <div className='cmpad'>
                <Reveal>
                    {groups.map((grp, gi) => (
                        <div className='faq-inner' key={gi}>
                            <div className='faq-left-header'>
                                <h5 className={gi > 0 ? 'hidden sm:flex' : ''}>Faq</h5>
                                <h2>{grp.heading}</h2>
                                <p>{grp.subtext}</p>
                            </div>
                            {renderGroup(grp.items, `g${gi}`)}
                        </div>
                    ))}
                </Reveal>
            </div>
        </section>
    )
}

export default FaqSection
