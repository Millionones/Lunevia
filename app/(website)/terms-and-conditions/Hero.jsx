import React from 'react'
import PageHero from '../Components/PageHero'

const Hero = () => {
    return (
        <PageHero
            eyebrow="Legal"
            title="Terms & Conditions"
            breadcrumbs={['Home', 'Terms & Conditions']}
            image="/About_us_banner.png"
        />
    )
}

export default Hero
