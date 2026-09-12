"use client"
import React, { useState } from 'react'
import LightGallery from 'lightgallery/react';

import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-zoom.css';
import 'lightgallery/css/lg-thumbnail.css';
import Drawer from '@mui/material/Drawer';
import { closeIconSvg } from '../../../../styles/icons';
const Gallery = ({ slug, title }) => {

  const roomsGallery = {
    "superior-room": [
      "/client-room-gallery/LBM04630.jpg",
      "/client-room-gallery/LBM04665.jpg",
      "/client-room-gallery/LBM04692.jpg",
      "/client-room-gallery/LBM05528.jpg",
      "/client-room-gallery/LBM05544.jpg",
    ],
    "deluxe-room": [
      "/client-room-gallery/LBM04695.jpg",
      "/client-room-gallery/LBM04668.jpg",
      "/client-room-gallery/LBM04890.jpg",
      "/client-room-gallery/LBM04856.jpg",
      "/client-room-gallery/LBM04855.jpg",
      "/client-room-gallery/LBM05556.jpg",
      "/client-room-gallery/LBM05562.jpg",
    ],
    "suite-room": [
      "/client-room-gallery/LBM04460.jpg",
      "/client-room-gallery/LBM04409.jpg",
      "/client-room-gallery/LBM04543.jpg",
      "/client-room-gallery/LBM04601.jpg",
      "/client-room-gallery/LBM05580.jpg",
      "/client-room-gallery/LBM05581.jpg",
    ],
  }

  const images = [
    "/client-room-gallery/LBM04282.jpg",
    "/client-room-gallery/LBM04368.jpg",
    "/client-room-gallery/LBM04609.jpg",
    "/client-room-gallery/LBM04928.jpg",
    "/client-room-gallery/LBM04935.jpg",
    "/client-room-gallery/LBM04960.jpg",
    "/client-room-gallery/LBM04967.jpg",
    "/client-room-gallery/LBM04998.jpg",
    "/client-room-gallery/LBM05062.jpg",
    "/client-room-gallery/LBM05071.jpg",
    "/client-room-gallery/LBM05080.jpg",
    "/client-room-gallery/LBM05112.jpg",
    "/client-room-gallery/LBM05140.jpg",
    "/client-room-gallery/LBM05163.jpg",
    "/client-room-gallery/LBM05237.jpg",
    "/client-room-gallery/LBM05343.jpg",
    "/client-room-gallery/LBM05356.jpg",
    "/client-room-gallery/LBM05365.jpg",
    "/client-room-gallery/LBM05383.jpg",
    "/client-room-gallery/LBM05418.jpg",
    "/client-room-gallery/LBM05474.jpg",
    "/client-room-gallery/LBM05518.jpg",
    "/client-room-gallery/LBM05526.jpg",
    "/client-room-gallery/LBM05636.jpg"]

  let allImages = [...(roomsGallery[slug] || []), ...images]
  
  const [data, setData] = useState(allImages)
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const onInit = () => {};

  const toggleDrawer =
    (anchor, open) =>
      (event) => {
        if (
          event.type === 'keydown' &&
          ((event).key === 'Tab' ||
            (event).key === 'Shift')
        ) {
          return;
        }

        setState({ ...state, [anchor]: open });
      };

  return (
    <section className='destination-gallery'>
      <div className='cmpad'>
        <div className='destination-gallery-inner'>
          <div className='destination-gallery-header'>
            <h1>Explore our Rooms</h1>
          </div>
          <div className='destination-gallery-grid'>
            <div className='destination-gallery-grid-items'>
              <img src={data[0]} onClick={toggleDrawer('bottom', true)} alt="" className='destination-gallery-grid-item-1' />
              <div className='destination-gallery-grid-item-2'>
                <img src={data[1]} alt="" onClick={toggleDrawer('bottom', true)} />
                <img src={data[2]} alt="" onClick={toggleDrawer('bottom', true)} />
              </div>
            </div>
            <div className='destination-gallery-grid-items2 bottom-grid'>
              {
                data.length > 3 ?
                  data.slice(3, 8).map((item, i) => (
                    <img key={i} src={item} alt="" onClick={toggleDrawer('bottom', true)} />
                  ))
                  : ''
              }
            </div>
          </div>
        </div>
      </div>
      <Drawer
        anchor={'bottom'}
        open={state['bottom']}
        onClose={toggleDrawer('bottom', false)}
        className='gallery-drawer'
      >
        <div className='gallery-drawer-inner'>
          <div className='gallery-drawer-inner-header'>
            <h2>{title}</h2>
            <div className='drawer-close-btn'>
              <button onClick={toggleDrawer('bottom', false)}>
                <span>{closeIconSvg}</span>
              </button>
            </div>
          </div>
          <div className="line-separator"></div>
          <div className='mt-[30px]'>
            <LightGallery speed={500} className="gallery-viewer">
              {data.length > 0 &&
                data.map((item, index) => (
                  <a href={item} key={index}>
                    <img src={item} alt="" />
                  </a>
                ))
              }
            </LightGallery>
          </div>
        </div>
      </Drawer>
    </section>
  )
}

export default Gallery