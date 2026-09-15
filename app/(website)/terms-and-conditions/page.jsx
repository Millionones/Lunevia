import React from 'react'
import Hero from './Hero'
import Content from './Content'
import { loadPage } from '@/helpers/serverPage'

export const revalidate = 3600

const page = async () => {
    const content = await loadPage('terms')
    return (
        <>
            <Hero hero={content.hero} />
            <Content />
        </>
    )
}

export default page
