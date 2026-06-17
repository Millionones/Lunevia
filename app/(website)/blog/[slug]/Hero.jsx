import React from 'react'
import { blogs } from '../blogs'

const Hero = ({ slug, data }) => {

    const title = data?.title || 'Blogs'
    const date = data?.date || ''
    const category = data?.category || ''
    return (
        <section className='testimonials-hero'>
            <div className='testimonials-hero-inner'>
                <h1>{title}</h1>
                <ul>
                    <li><p>{date}</p></li>
                    {/* <li className='separator'><p>»</p></li> */}
                    <li><p>{category}</p></li>
                </ul>
            </div>
        </section>
    )
}

export default Hero