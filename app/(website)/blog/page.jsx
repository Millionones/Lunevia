import React from 'react'
import Hero from './Hero'
import List from './List'
import { serverGet } from '@/helpers/serverApi'
import { loadPage } from '@/helpers/serverPage'

import './styles.css'

export const revalidate = 3600

const page = async () => {
    const res = await serverGet('website/blogs?limit=6')
    const blogsData = res?.data ?? null
    const content = await loadPage('blog')
    return (
        <>
            <Hero hero={content.hero} />
            <List data={blogsData} header={content.list} />
        </>
    )
}

export default page
