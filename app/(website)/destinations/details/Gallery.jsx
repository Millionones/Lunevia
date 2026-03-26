"use client"
import React, { useState } from 'react'
import LightGallery from 'lightgallery/react';

import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-zoom.css';
import 'lightgallery/css/lg-thumbnail.css';
import Drawer from '@mui/material/Drawer';
import { closeIconSvg } from '../../../styles/icons';
const Gallery = () => {

  const [data, setData] = useState([
    "/sample-gallery-img1.jpg",
    "/sample-gallery-img2.jpg",
    "/sample-gallery-img3.jpg",
    "/sample-gallery-img4.jpg",
    "/sample-gallery-img5.jpg",
    "/sample-gallery-img6.jpg",
    "/sample-gallery-img8.jpg",
    "/sample-gallery-img9.jpg",
    "/sample-gallery-img10.jpg",
  ])
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const onInit = () => {
    console.log('lightGallery has been initialized');
  };

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
      <div className='cmpad'>'
        <div className='destination-gallery-inner'>
          <div className='destination-gallery-header'>
            <h1>Explore our property</h1>
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
                  data.slice(3, 8).map((item) => (
                    <img src={item} alt="" onClick={toggleDrawer('bottom', true)} />
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
            <h2>LUNEVIA Backwater Reserve – Alleppey</h2>
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