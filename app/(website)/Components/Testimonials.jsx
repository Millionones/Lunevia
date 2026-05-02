"use client"
import React, { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectFade, Autoplay, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';

const Testimonials = () => {
    const [data, setData] = useState([
        {
            img: "/leader-image1.jpg",
            name: 'Christine Glassier',
            job: 'Interior Designer',
            title: 'Comfortable & Relaxing',
            description: 'Was great not have to use the inter-island terminal. The service is impeccable and they make you feel so welcome and everything is truly a can-do attitude.'
        },
        {
            name: 'Aisha & Rahman',
            place: 'Dubai',
            job: 'Interior Designer',
            title: 'An Experience Beyond Luxury',
            description: "From the moment we arrived at LUNEVIA Backwater Reserve, time seemed to slow. The stillness of the water, the warmth of the hospitality, and the attention to detail created something far more meaningful than a vacation. It was restoration."
        },
        {
            name: 'Daniel M.',
            place: 'London',
            job: 'Interior Designer',
            title: 'Kerala, Reimagined',
            description: "We have visited Kerala before, but never like this. LUNEVIA transformed familiar landscapes into something cinematic and intimate. The private tea estate dinner in Munnar was unforgettable."
        },
        {
            name: 'Meera S.',
            place: 'Mumbai',
            job: 'Interior Designer',
            title: 'Effortless Perfection',
            description: "Every detail felt curated just for us — from the Ayurvedic rituals to the sunset cruise. The staff anticipated our needs with grace and precision. This is hospitality at its finest."
        },
        {
            name: 'Priyanka N.',
            place: 'Bangalore',
            job: 'Interior Designer',
            title: 'Cliffside Serenity',
            description: "Waking up to panoramic Arabian Sea views from our infinity suite in Kovalam was surreal. The sunsets alone made the journey worthwhile."
        },
        {
            name: 'Thomas K.',
            place: 'Berlin',
            job: 'Interior Designer',
            title: 'A Private World in the Forest',
            description: "Our villa at the Wayanad Forest Sanctuary felt like a hidden sanctuary. Morning birdsong, rain against wood, and uninterrupted tranquility created a deeply immersive escape."
        },
        {
            name: 'Fatima A.',
            place: 'Abu Dhabi',
            job: 'Interior Designer',
            title: 'Timeless Lakeside Elegance',
            description: "Kumarakom Lake Estate was serene and beautifully designed. The backwater canoe experience at dusk felt intimate, peaceful, and truly unforgettable."
        },
        {
            name: 'Arjun & Neha',
            place: 'Hyderabad',
            job: 'Interior Designer',
            title: 'A Wedding Beyond Our Dreams',
            description: "Our intimate destination wedding at LUNEVIA Bekal Shoreline was flawlessly curated. Every detail was handled with elegance and care, making it feel deeply personal and magical."
        }
    ])
    return (
        <section className='testimonials'>
            <div className='cmpad'>
                <div className='testimonials-inner'>
                    <div className='testimonials-header'>
                        <h1>Testimonials</h1>
                        <h5>Lovely people - Amazing experiences</h5>
                    </div>
                    <div className='testimonial-grid'>
                        <div className='testimonial-swiper'>
                            <Swiper
                                spaceBetween={0}
                                slidesPerView={1}
                                autoplay={{
                                    delay: 3000, // 3 seconds
                                    disableOnInteraction: false,
                                }}
                                loop={true}
                                pagination={true}
                                modules={[Pagination, Autoplay]}
                            >
                                {
                                    data.map((item) => {
                                        return (
                                            <SwiperSlide>
                                                <div className='testimonial-slide'>
                                                    <div className='testimonial-media'>
                                                        <img src={item.img} alt="" />
                                                    </div>
                                                    <div>
                                                        <h1>{item.title}</h1>
                                                        <h2>{item.description}</h2>
                                                        <p>
                                                            {item.name}
                                                            <span>{item.job}</span>
                                                        </p>
                                                    </div>
                                                </div>
                                            </SwiperSlide>
                                        )
                                    })
                                }
                            </Swiper>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Testimonials