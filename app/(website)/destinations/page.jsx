import React from 'react'
import Hero from './Hero'
import Destinations from '../Components/Destinations'
import Faq from '../Components/Faq'
import { serverGet } from '@/helpers/serverApi'
import "./styles.css"

export const revalidate = 3600

const page = async () => {
  const res = await serverGet('website/destination?limit=6')
  const destinations = res?.data ?? []
  return (
    <>
      <Hero />
      <Destinations data={destinations} showViewAll={false} />
      {/* <Testimonials /> */}
      <Faq/>
    </>
  )
}

export default page
