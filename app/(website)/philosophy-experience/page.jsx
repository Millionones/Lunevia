import React from 'react'
import Hero from './Hero'
import Philosophy from './PhilosophySection'
import Pillars from './Pillars'
import ExperienceSection from './ExperienceSection'
import ClosingStage from './ClosingStage'

import './style.css'
const page = () => {
    return (
        <>
            <Hero />
            <Philosophy />
            <Pillars />
            <ExperienceSection />
            <ClosingStage />
        </>
    )
}

export default page