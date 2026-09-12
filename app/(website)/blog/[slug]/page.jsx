import React from 'react'
import { notFound } from 'next/navigation'
import Hero from './Hero'

import '../styles.css'
import Details from './Details'
import { serverGet } from '@/helpers/serverApi'

export const revalidate = 3600

const page = async ({ params }) => {
    const { slug } = await params

    const res = await serverGet(`website/blogs/${slug}`)
    const blogData = res?.data

    if (!blogData) {
        notFound()
    }

    return (
        <>
            <Hero slug={slug} data={blogData} />
            <Details slug={slug} data={blogData} />
        </>
    )
}

export default page
