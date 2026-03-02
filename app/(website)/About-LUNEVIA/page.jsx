import React from 'react'
import Hero from './Hero'
import About from './About'
import Testimonials from '../Components/Testimonials'
import Gallery from '../Components/Gallery'
import './styles.css'
const page = () => {
  return (
    <>
      <Hero />
      <About />
      <Gallery />
      <Testimonials />
    </>
  )
}

export default page