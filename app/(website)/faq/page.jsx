import React from 'react'
import './styles.css'
import Hero from './Hero'
import FaqSection from './FaqSection'
import { loadPage } from '@/helpers/serverPage'

export const revalidate = 3600

const page = async () => {
  const content = await loadPage('faq')
  return (
    <>
      <Hero hero={content.hero} />
      <FaqSection data={content} />
    </>
  )
}

export default page
