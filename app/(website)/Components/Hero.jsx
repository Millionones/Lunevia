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
                        <img src="/lunevia_home_hero3.jpg" alt="" />
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className='hero-slide'>
                        <img src="/lunevia_home_hero2.jpg" alt="" />
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className='hero-slide no-after'>
                        <img src="/client-room-gallery/LBM05356.jpg" alt="" />
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className='hero-slide no-after'>
                        <img src="https://djwonpcpwhtovzdkcdbt.supabase.co/storage/v1/object/public/lunevia/gallery/d3416ff7-84fb-461f-a04f-0cb541dbfb13.webp" alt="" />
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className='hero-slide no-after'>
                        <img src="https://djwonpcpwhtovzdkcdbt.supabase.co/storage/v1/object/public/lunevia/gallery/c988153f-ce7b-4058-9c4f-1c3112c7c848.webp" alt="" />
                    </div>
                </SwiperSlide>
            </Swiper>
        </section>
    )
}

export default Hero