"use client"
import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { get } from '@/helpers/api'
import { Input } from '@/components/ui/input'
import LightGallery from 'lightgallery/react';

import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-zoom.css';
import 'lightgallery/css/lg-thumbnail.css';
import Drawer from '@mui/material/Drawer';
import { closeIconSvg } from '../../styles/icons';

const images = [
    "/client-room-gallery/LBM04282.jpg",
    // "/client-room-gallery/LBM04368.jpg",
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
    "/client-room-gallery/LBM05636.jpg"
]
const Gallery = () => {

    const [data, setData] = useState([
        "/client-room-gallery/LBM04282.jpg",
        // "/client-room-gallery/LBM04368.jpg",
        // "/client-room-gallery/LBM04609.jpg",
        "/client-room-gallery/LBM04928.jpg",
        "/client-room-gallery/LBM04960.jpg",
        // "/client-room-gallery/LBM04967.jpg",
        "/client-room-gallery/LBM04998.jpg",
        // "/client-room-gallery/LBM05062.jpg",
        // "/client-room-gallery/LBM05071.jpg",
        // "/client-room-gallery/LBM05080.jpg",
        // "/client-room-gallery/LBM04935.jpg",
        // "/client-room-gallery/LBM05112.jpg",
        // "/client-room-gallery/LBM05140.jpg",
        "/client-room-gallery/LBM05163.jpg",
        "/client-room-gallery/LBM05237.jpg",
        "/client-room-gallery/LBM04630.jpg",
        // "/client-room-gallery/LBM05343.jpg",
        "/client-room-gallery/LBM05356.jpg",
        // "/client-room-gallery/LBM05365.jpg",
        "/client-room-gallery/LBM05383.jpg",
        "/client-room-gallery/LBM05418.jpg",
        // "/client-room-gallery/LBM05474.jpg",
        "/client-room-gallery/LBM05518.jpg",
        "/client-room-gallery/LBM05526.jpg",
        "/client-room-gallery/LBM05562.jpg",
        "/client-room-gallery/LBM05636.jpg"
    ])
    const [loading, setLoading] = useState(false)

    const [state, setState] = useState({
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

    useEffect(() => {
        // fetchGallery()
    }, [])

    const fetchGallery = async () => {
        let response = await get('common/gallery-images')
        if (response.data) {
            setData(response.data)
            setLoading(false)
        }
    }
    return (
        <section className='gallery'>
            <div className='cmpad'>
                <div className='gallery-inner'>
                    <div className='gallery-header'>
                        <div className=''>
                            <h6>GALLERY</h6>
                            <h1>Moments of Refined <br />Resort Living</h1>
                        </div>
                        {/* <Button>
                            DISCOVER MORE
                        </Button> */}
                    </div>
                    {/* <div className='gallery-grids'>
                        <div className='gallery-grid-1'>
                            <div className='flex flex-col sm:flex-row gap-5'>
                                <div className='gallery-img-1'>
                                    <img src="/client-resort-img13.webp" alt="" />
                                </div>
                                <div className='gallery-img-2-half'>
                                    <div className="gallery-img-2">
                                        <img src="/client-resort-img2.jpeg" alt="" />
                                    </div>
                                    <div className="gallery-img-3">
                                        <img src="/client-resort-img3.jpeg" alt="" />
                                    </div>
                                </div>
                            </div>
                            <div className="gallery-img-4">
                                <img src="/client-resort-img11.jpeg" alt="" />
                            </div>
                        </div>
                        <div className='gallery-grid-2'>
                            <div className="gallery-img-5">
                                <img src="/client-resort-img5.webp" alt="" />
                            </div>
                            <div className="gallery-img-6">
                                <img src="/client-resort-img1.webp" alt="" />
                            </div>
                        </div>
                    </div> */}
                    {/* <div className='flex sm:hidden justify-center'>
                        <Button>
                            DISCOVER MORE
                        </Button>
                    </div> */}
                    {loading ?
                        (
                            <div className='loader-div'>
                                <img src="/loader_black.svg" alt="" />
                            </div>
                        )
                        :
                        <div className='common-gallery-grid'>
                            <div className='common-gallery-grid-items'>
                                <img src={data[0]} onClick={toggleDrawer('bottom', true)} alt="" className='common-gallery-grid-item-1' />
                                <div className='common-gallery-grid-item-2'>
                                    <img src={data[1]} alt="" onClick={toggleDrawer('bottom', true)} />
                                    <img src={data[2]} alt="" onClick={toggleDrawer('bottom', true)} />
                                </div>
                            </div>
                            <div className='common-gallery-grid-items2 bottom-grid'>
                                {
                                    data.length > 3 ?
                                        data.slice(3, 8).map((item) => (
                                            <img src={item} alt="" onClick={toggleDrawer('bottom', true)} />
                                        ))
                                        : ''
                                }
                            </div>
                        </div>
                    }
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
                        <h2>LUNEVIA GALLERY</h2>
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