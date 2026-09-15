import React from 'react'
import Hero from './Hero'
import TestimonialContents from './TestimonialContents'
import { loadPage } from '@/helpers/serverPage'

export const revalidate = 3600

const page = async () => {
    const content = await loadPage('testimonials')
    return (
        <>
            <Hero hero={content.hero} />
            <TestimonialContents data={content.section} />
        </>
    )
}

export default page
