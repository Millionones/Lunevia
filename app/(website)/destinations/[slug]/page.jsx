import React from 'react'
import Hero from './Hero'
import './style.css'
import About from './About'
import Features from './Features'
import Gallery from './Gallery'
import BookNow from './BookNow'
import Rooms from './Rooms'
import Locations from './Locations'
import Suggested from './Suggested'
import Highlights from './Highligts'
import { API_URL } from '../../../../config'
const page = async ({ params }) => {
  const { slug } = await params

  const fetchDestination = async () => {
    try {
      const response = await fetch(`${API_URL}website/destination/${slug}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      return response;
    } catch (error) {
      console.error('Error fetching blog:', error);
      return null;
    }
  };

  let data = await fetchDestination();
  let destinationData = await data.json();
  destinationData = destinationData.data
  
  const about = destinationData.aboutProperty
  const rooms = destinationData.roomDetails
  const gallery = destinationData.galleryImages

  const heroData = { title: destinationData.title, mainImage: destinationData.mainImage }
  const aboutData = { description: about.description, title: destinationData.title, image: about.image }
  return (
    <>
      <Hero data={heroData} />
      <About data={aboutData} />
      <Rooms data={rooms} slug={slug} />
      {/* <BookNow /> */}
      <Gallery data={gallery} />
      <Features data={destinationData.amenties} />
      <Locations data={destinationData.locations} />
      <Highlights data={destinationData.aboutProperty.highlights} />
      {/* <Suggested /> */}
    </>
  )
}

export default page