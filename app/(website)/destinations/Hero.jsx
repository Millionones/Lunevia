import React from 'react'
import PageHero from '../Components/PageHero'

const Hero = () => {
    return (
        <PageHero
            eyebrow="Where We Are"
            title="Destinations"
            breadcrumbs={['Home', 'Destinations']}
            image="/gallery-4.webp"
        />
    )
}

export default Hero
