import React from 'react'
import Hero from './Hero'

import './styles.css'
import ContactForm from './ContactForm'
import Faq from '../Components/Faq'
const page = () => {
    return (
        <>
            <Hero />
            <ContactForm />
            <Faq />
        </>
    )
}

export default page