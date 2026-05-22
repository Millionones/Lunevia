import React from 'react'
import Hero from './Hero'

import '../styles.css'
import Details from './Details'

const page = async ({ params }) => {
    const { slug } = await params
    return (
        <>
            <Hero slug={slug} />
            <Details slug={slug} />
        </>
    )
}

export default page