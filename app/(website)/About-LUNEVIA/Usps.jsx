import React from 'react'
import { BorderBeamPanel } from '@/components/ui/creative/border-beam-panel'

const usps = [
    { title: 'Curated Hospitality Experiences', body: 'We do not merely operate properties; we create thoughtfully designed hospitality experiences that leave a lasting impression on our guests.' },
    { title: 'Guest-Centric Approach', body: 'Every decision at Lunevia is made with the guest experience in mind, ensuring comfort, convenience, and memorable service at every touchpoint.' },
    { title: 'Strong Operational Management', body: 'Our properties are backed by structured systems, professional oversight, and operational discipline that ensure consistency and quality.' },
    { title: 'Distinctive Property Selection', body: 'We focus on hospitality properties with character, potential, and location value, enabling us to create unique and appealing destinations.' },
    { title: 'End-to-End Hospitality Vision', body: 'From concept to execution, Lunevia brings together property strategy, branding, operations, and service delivery under one unified vision.' },
    { title: 'Focus on Quality and Trust', body: 'We maintain high standards in service, upkeep, compliance, and guest satisfaction, building trust among guests, landlords, partners, and stakeholders.' },
    { title: 'Growth with Sustainability', body: 'Our approach balances expansion with long-term sustainability, ensuring every venture is built on strong fundamentals and enduring value.' },
]

const Usps = () => {
    return (
        <section className='Usps-section'>
            <div className='cmpad'>
                <div className='Usps-inner'>
                    <div className='Usps-header'>
                        <h2>Our USPs</h2>
                        <p>No two journeys are the same. Each LUNEVIA stay is tailored to the guest — from personalized dining to curated local adventures.</p>
                    </div>
                    <div className='mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
                        {usps.map((u, i) => (
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
