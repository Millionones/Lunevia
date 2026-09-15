import React from 'react'
import Hero from './Hero'
import Destinations from '../Components/Destinations'
import Faq from '../Components/Faq'
import { serverGet } from '@/helpers/serverApi'
import { loadPage } from '@/helpers/serverPage'
import "./styles.css"

export const revalidate = 3600

const page = async () => {
  const res = await serverGet('website/destination?limit=6')
  const destinations = res?.data ?? []
  const content = await loadPage('destinations')
  return (
    <>
      <Hero hero={content.hero} />
      <Destinations data={destinations} showViewAll={false} />
      {/* <Testimonials /> */}
      <Faq/>
    </>
  )
}

export default page
