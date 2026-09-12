import React from 'react'
import PageHero from '../Components/PageHero'

const Hero = () => {
    return (
        <PageHero
            eyebrow="Our Story"
            title="About LUNEVIA"
            breadcrumbs={['Home', 'About LUNEVIA']}
            image="/about-us-about.webp"
            zoom="out"
        />
    )
}

export default Hero
