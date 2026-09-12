import React from 'react'
import PageHero from '../Components/PageHero'

const Hero = () => {
    return (
        <PageHero
            eyebrow="Good to Know"
            title="FAQs"
            breadcrumbs={['Home', 'FAQs']}
            image="/About_us_banner.png"
        />
    )
}

export default Hero
