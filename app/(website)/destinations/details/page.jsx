import React from 'react'
import Hero from './Hero'
import './style.css'
import About from './About'
import Features from './Features'
import Gallery from './Gallery'
import BookNow from './BookNow'
const page = () => {
  return (
    <>
      <Hero />
      <About />
      {/* <BookNow /> */}
      {/* <Features /> */}
      <Gallery />
    </>
  )
}

export default page