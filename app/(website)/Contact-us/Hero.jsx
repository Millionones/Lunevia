import React from 'react'
import PageHero from '../Components/PageHero'

const Hero = () => {
    return (
        <PageHero
            eyebrow="Say Hello"
            title="Contact Us"
            breadcrumbs={['Home', 'Contact Us']}
            image="/client-room-gallery/LBM04967.jpg"
        />
    )
}

export default Hero
