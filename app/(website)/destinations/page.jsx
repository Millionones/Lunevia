import React from 'react'
import Hero from './Hero'
import DestinationList from './DestinationList'
import Testimonials from '../Components/Testimonials'
import Faq from '../Components/Faq'
import "./styles.css"
const page = () => {
  return (
    <>
      <Hero />
      <DestinationList />
      <Testimonials />
      <Faq/>
    </>
  )
}

export default page