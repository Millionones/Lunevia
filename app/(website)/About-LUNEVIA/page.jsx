import React from 'react'
import Hero from './Hero'
import About from './About'
import Gallery from '../Components/Gallery'
import './styles.css'
import Usps from './Usps'
import Location from './Location'
import { loadPage } from '@/helpers/serverPage'

export const revalidate = 3600

const page = async () => {
  const content = await loadPage('about')
  return (
    <>
      <Hero hero={content.hero} />
      <About data={content.about} />
      <Usps data={content.usps} />
      <Location data={content.location} />
      <Gallery />
    </>
  )
}

export default page
