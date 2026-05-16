import React from 'react'
import Hero from '../Hero'
import '../style.css'
import Details from './Details'
import Gallery from './Gallery'

const page = async({params }) => {
    const { slug } = await params
    console.log(slug)
    return (
        <>
            <Hero />
            <Details slug={slug}/>
            <Gallery />
        </>
    )
}

export default page