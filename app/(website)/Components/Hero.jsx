"use client"
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectFade, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/effect-fade';

const Hero = () => {
    return (
        <section>
            <Swiper
                spaceBetween={0}
                slidesPerView={1}
                autoplay={{
                    delay: 3000, // 3 seconds
                    disableOnInteraction: false,
                }}
                loop={true}
                modules={[EffectFade, Autoplay]} effect="fade"
            >
                <SwiperSlide>
                    <div className='hero-slide'>
                        <img src="beautiful-view-wooden-huts-ocean-captured-thailand.jpg" alt="" />
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className='hero-slide'>
                        <img src="luxury-thai-massage-pavilion.jpg" alt="" />
                    </div>
                </SwiperSlide>
            </Swiper>
        </section>
    )
}

export default Hero