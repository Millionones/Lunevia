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
                        <img src="/lunevia_home_hero1.webp" alt="" />
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className='hero-slide'>
                        <img src="/lunevia_home_hero2.webp" alt="" />
                    </div>
                </SwiperSlide>
            </Swiper>
        </section>
    )
}

export default Hero