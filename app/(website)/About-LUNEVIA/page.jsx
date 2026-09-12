import React from 'react'
import Hero from './Hero'
import About from './About'
import Testimonials from '../Components/Testimonials'
import Gallery from '../Components/Gallery'
import './styles.css'
import Usps from './Usps'
import Location from './Location'
const page = () => {
  return (
    <>
      <Hero />
      <About />
      <Usps />
      <Location />
      <Gallery />
      {/* <Testimonials /> */}
    </>
  )
}

export default page