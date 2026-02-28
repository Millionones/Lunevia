"use client"
import React, { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
const Gallery = () => {

  const [data, setData] = useState([
    "/backwater-resort1.jpg",
    "/backwater-resort2.jpg",
    // "/gallery-1.webp",
    // "/gallery-2.webp",
    // "/gallery-3.webp",
    // "/gallery-4.webp",
    "/luxury-thai-massage-pavilion.jpg"
  ])
  return (
    <section className='destination-gallery'>
      <div className='cmpad'>'
        <div className='destination-gallery-inner'>
          <div className='destination-gallery-header'>
            <h1>Explore our property</h1>
          </div>
          {/* <Swiper
            spaceBetween={20}
            slidesPerView={3}
            loop={true}
            navigation={true}
            modules={[Autoplay, Navigation]}
          > */}
          <div className='destination-gallery-media-temp'>

            {data.map((item) => {
              return (
                // <SwiperSlide>
                <div className='destination-gallery-media'>
                  <img src={item} alt="" />
                </div>
                // </SwiperSlide>
              )
            })}
            {/* </Swiper> */}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Gallery