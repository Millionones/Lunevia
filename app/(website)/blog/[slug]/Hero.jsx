import React from 'react'
import { blogs } from '../blogs'

const Hero = ({ slug }) => {

    const title = blogs.find(blog => blog.id === slug)?.title || 'Blogs'
    const date = blogs.find(blog => blog.id === slug)?.date || ''
    const category = blogs.find(blog => blog.id === slug)?.category || ''
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