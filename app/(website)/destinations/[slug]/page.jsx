import React from 'react'
import { notFound } from 'next/navigation'
import Hero from './Hero'
import './style.css'
import About from './About'
import Features from './Features'
import Gallery from './Gallery'
import Rooms from './Rooms'
import Locations from './Locations'
import Highlights from './Highligts'
import BookNow from './BookNow'
import { serverGet } from '@/helpers/serverApi'

export const revalidate = 3600

const page = async ({ params }) => {
  const { slug } = await params

  const res = await serverGet(`website/destination/${slug}`)
  const destinationData = res?.data

  if (!destinationData) {
    notFound()
  }

  const about = destinationData.aboutProperty || {}
  const rooms = destinationData.roomDetails
  const gallery = destinationData.galleryImages

  const heroData = { title: destinationData.title, mainImage: destinationData.mainImage }
  const aboutData = { description: about.description, title: destinationData.title, image: about.image }

  return (
    <>
      <Hero data={heroData} />
      <About data={aboutData} />
      <Rooms data={rooms} slug={slug} />
      <BookNow data={{ title: destinationData.title, mainImage: destinationData.mainImage, description: about.description }} />
      <Gallery data={gallery} title={destinationData.title} />
      <Features data={destinationData.amenties} />
      <Locations data={destinationData.locations} />
      <Highlights data={about.highlights} />
      {/* <Suggested /> */}
    </>
  )
}

export default page
