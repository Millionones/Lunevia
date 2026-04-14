import React from 'react'
import Hero from './Hero'
import './style.css'
import About from './About'
import Features from './Features'
import Gallery from './Gallery'
import BookNow from './BookNow'
import Rooms from './Rooms'
import Locations from './Locations'
const page = () => {
  return (
    <>
      <Hero />
      <About />
      <Rooms />
      {/* <BookNow /> */}
      <Gallery />
      <Features />
      <Locations />
    </>
  )
}

export default page