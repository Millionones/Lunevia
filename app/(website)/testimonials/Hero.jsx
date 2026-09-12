import React from 'react'
import PageHero from '../Components/PageHero'

const Hero = () => {
    return (
        <PageHero
            eyebrow="Guest Voices"
            title="Testimonials"
            breadcrumbs={['Home', 'Testimonials']}
            image="/About_us_banner.png"
        />
    )
}

export default Hero
