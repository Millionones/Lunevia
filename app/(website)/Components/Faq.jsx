"use client"
import React, { useState } from 'react'
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { arrowIconSvg } from '../../styles/icons'

const Faq = () => {
    const [open, setOpen] = useState(null)
    const [data, setData] = useState([
        {
            qus: 'What makes LUNEVIA different from other luxury resorts in Kerala?',
            ans: 'LUNEVIA is a curated collection of experiential retreats rooted in Kerala’s landscapes and culture. Each property is intentionally designed to reflect its surroundings, offering immersive stays rather than conventional hotel experiences.'
        },
        {
            qus: 'Do you offer personalized or bespoke experiences?',
            ans: 'Yes. Every stay at LUNEVIA can be tailored to your preferences. From private backwater cruises and Ayurvedic wellness programs to curated dining and intimate celebrations, our concierge team crafts experiences exclusively for you.'
        },
        {
            qus: 'Are airport transfers available?',
            ans: 'Private airport transfers can be arranged upon request. Once your reservation is confirmed, our concierge team will coordinate a seamless arrival and departure experience for your comfort.'
        },
        {
            qus: 'Is LUNEVIA suitable for destination weddings or private events?',
            ans: 'Absolutely. LUNEVIA specializes in intimate destination weddings, milestone celebrations, and curated corporate retreats. Each event is designed with elegance, discretion, and meticulous attention to detail.'
        }
    ])

    const handleOpen = (idx) =>{
        if(idx == open){
            setOpen(null)
        }else{
            setOpen(idx)
        }
    }
    return (
        <section className='faq-section'>
            <div className='cmpad'>
                <div className='faq-inner'>
                    <div className='faq-left-header'>
                        <h5>Faq</h5>
                        <h2>Frequently Asked <br /> Questions</h2>
                        <p>Everything you may wish to know before your stay.</p>
                    </div>
                    <div className='faqs'>
                        {
                            data.map((item, idx) => (
                                <Collapsible open={open == idx} onOpenChange={() => handleOpen(idx)} className='Collapsible'>
                                    <CollapsibleTrigger>
                                        <p>{item.qus}</p>
                                        <span className={`faq-icon ${open == idx ? 'faq-open' : ''}`}>{arrowIconSvg}</span>
                                    </CollapsibleTrigger>
                                    <CollapsibleContent className='CollapsibleContent'>
                                        {item.ans}
                                    </CollapsibleContent>
                                </Collapsible>
                            ))
                        }
                    </div>
                </div>
            </div >
        </section >
    )
}

export default Faq