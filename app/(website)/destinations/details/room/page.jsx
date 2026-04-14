import React from 'react'
import Hero from '../Hero'
import '../style.css'
import Details from './Details'
import Gallery from './Gallery'

const page = () => {
    return (
        <>
            <Hero />
            <Details />
            <Gallery />
        </>
    )
}

export default page