import React from 'react'
import PageHero from '../Components/PageHero'

const Hero = () => {
    return (
        <PageHero
            eyebrow="The Journal"
            title="Blogs"
            breadcrumbs={['Home', 'Blogs']}
            image="/About_us_banner.png"
        />
    )
}

export default Hero
