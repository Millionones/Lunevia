import React from 'react'
import Hero from './Hero'

import './styles.css'
import ContactForm from './ContactForm'
import Faq from '../Components/Faq'
import { loadPage } from '@/helpers/serverPage'

export const revalidate = 3600

const page = async () => {
    const content = await loadPage('contact')
    return (
        <>
            <Hero hero={content.hero} />
            <ContactForm data={content.form} />
            <Faq />
        </>
    )
}

export default page
