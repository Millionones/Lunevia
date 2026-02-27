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
            img: "/leader-image1.jpg",
            name: 'Christine Glassier',
            job: 'Interior Designer',
            title: 'Comfortable & Relaxing',
            description: 'Was great not have to use the inter-island terminal. The service is impeccable and they make you feel so welcome and everything is truly a can-do attitude.'
        },
        {
            img: "/leader-image1.jpg",
            name: 'Christine Glassier',
            job: 'Interior Designer',
            title: 'Comfortable & Relaxing',
            description: 'Was great not have to use the inter-island terminal. The service is impeccable and they make you feel so welcome and everything is truly a can-do attitude.'
        },
        {
            img: "/leader-image1.jpg",
            name: 'Christine Glassier',
            job: 'Interior Designer',
            title: 'Comfortable & Relaxing',
            description: 'Was great not have to use the inter-island terminal. The service is impeccable and they make you feel so welcome and everything is truly a can-do attitude.'
        },
        {
            img: "/leader-image1.jpg",
            name: 'Christine Glassier',
            job: 'Interior Designer',
            title: 'Comfortable & Relaxing',
            description: 'Was great not have to use the inter-island terminal. The service is impeccable and they make you feel so welcome and everything is truly a can-do attitude.'
        },
        {
            img: "/leader-image1.jpg",
            name: 'Christine Glassier',
            job: 'Interior Designer',
            title: 'Comfortable & Relaxing',
            description: 'Was great not have to use the inter-island terminal. The service is impeccable and they make you feel so welcome and everything is truly a can-do attitude.'
        },
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