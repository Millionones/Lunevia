import React from 'react'
import Hero from './Hero'
import Philosophy from './PhilosophySection'
import Pillars from './Pillars'
import ExperienceSection from './ExperienceSection'
import ClosingStage from './ClosingStage'
import { loadPage } from '@/helpers/serverPage'

import './style.css'

export const revalidate = 3600

const page = async () => {
    const content = await loadPage('experience')
    return (
        <>
            <Hero hero={content.hero} />
            <Philosophy data={content.philosophy} />
            <Pillars data={content.pillars} />
            <ExperienceSection data={content.experiences} />
            <ClosingStage data={content.closing} />
        </>
    )
}

export default page
