"use client"
import React, { useState } from 'react'

const TestimonialContents = () => {
    const [data, setData] = useState([
        {
            name: 'Aisha & Rahman',
            place: 'Dubai',
            title: 'An Experience Beyond Luxury',
            description: "From the moment we arrived at LUNEVIA Backwater Reserve, time seemed to slow. The stillness of the water, the warmth of the hospitality, and the attention to detail created something far more meaningful than a vacation. It was restoration."
        },
        {
            name: 'Daniel M.',
            place: 'London',
            title: 'Kerala, Reimagined',
            description: "We have visited Kerala before, but never like this. LUNEVIA transformed familiar landscapes into something cinematic and intimate. The private tea estate dinner in Munnar was unforgettable."
        },
        {
            name: 'Meera S.',
            place: 'Mumbai',
            title: 'Effortless Perfection',
            description: "Every detail felt curated just for us — from the Ayurvedic rituals to the sunset cruise. The staff anticipated our needs with grace and precision. This is hospitality at its finest."
        },
        {
            name: 'Priyanka N.',
            place: 'Bangalore',
            title: 'Cliffside Serenity',
            description: "Waking up to panoramic Arabian Sea views from our infinity suite in Kovalam was surreal. The sunsets alone made the journey worthwhile."
        },
        {
            name: 'Thomas K.',
            place: 'Berlin',
            title: 'A Private World in the Forest',
            description: "Our villa at the Wayanad Forest Sanctuary felt like a hidden sanctuary. Morning birdsong, rain against wood, and uninterrupted tranquility created a deeply immersive escape."
        },
        {
            name: 'Fatima A.',
            place: 'Abu Dhabi',
            title: 'Timeless Lakeside Elegance',
            description: "Kumarakom Lake Estate was serene and beautifully designed. The backwater canoe experience at dusk felt intimate, peaceful, and truly unforgettable."
        },
        {
            name: 'Arjun & Neha',
            place: 'Hyderabad',
            title: 'A Wedding Beyond Our Dreams',
            description: "Our intimate destination wedding at LUNEVIA Bekal Shoreline was flawlessly curated. Every detail was handled with elegance and care, making it feel deeply personal and magical."
        }
    ])
    return (
        <section className='testimonial-section'>
            <div className='cmpad'>
                <div className='testimonial-inner'>
                    <div className='testimonial-header'>
                        <h5>Testimonials</h5>
                        <h2>Reflections from guests who experienced LUNEVIA.</h2>
                    </div>
                    <div className='testimonial-grid'>
                        {
                            data.map((item) => (
                                <div className='testimonial'>
                                    <div className='testimonial-cond'>
                                        <h1>{item.title}</h1>
                                        <h2>{item.description}</h2>
                                        <p>
                                            —{item.name}, <span>{item.place}</span>
                                        </p>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </section>
    )
}

export default TestimonialContents