import React from 'react'
import PageHero from '../../Components/PageHero'

const Hero = ({ slug, data }) => {
    const title = data?.title || 'Blogs'
    const date = data?.date || ''
    const category = data?.category || ''
    // Use the article's own image as the hero backdrop when available.
    const image = data?.image || '/About_us_banner.png'

    return (
        <PageHero
            eyebrow={category || 'The Journal'}
            title={title}
            subtitle={date || undefined}
            image={image}
            imageAlt={title}
        />
    )
}

export default Hero
