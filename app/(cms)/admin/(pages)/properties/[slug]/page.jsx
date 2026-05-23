import React from 'react'
import Properties from './Properties'

const page = async ({ params }) => {
  const { slug } = await params

  return (
    <Properties slug={slug} />
  )
}

export default page