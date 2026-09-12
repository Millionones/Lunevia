import React from 'react'
import Hero from './Hero'
import List from './List'
import { serverGet } from '@/helpers/serverApi'

import './styles.css'

export const revalidate = 3600

const page = async () => {
    const res = await serverGet('website/blogs?limit=6')
    const blogsData = res?.data ?? null
    return (
        <>
            <Hero />
            <List data={blogsData} />
        </>
    )
}

export default page
