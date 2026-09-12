import React from 'react'
import PageHero from '../Components/PageHero'

const Hero = () => {
    return (
        <PageHero
            eyebrow="Legal"
            title="Privacy Policy"
            breadcrumbs={['Home', 'Privacy Policy']}
            image="/About_us_banner.png"
        />
    )
}

export default Hero
