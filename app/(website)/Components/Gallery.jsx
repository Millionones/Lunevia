import React from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const Gallery = () => {
    return (
        <section className='gallery'>
            <div className='cmpad'>
                <div className='gallery-inner'>
                    <div className='gallery-header'>
                        <div className=''>
                            <h6>GALLERY</h6>
                            <h1>Moments of Refined <br />Resort Living</h1>
                        </div>
                        <Button>
                            DISCOVER MORE
                        </Button>
                    </div>
                    <div className='gallery-grids'>
                        <div className='gallery-grid-1'>
                            <div className='flex flex-col sm:flex-row gap-5'>
                                <div className='gallery-img-1'>
                                    <img src="/gallery-1.webp" alt="" />
                                </div>
                                <div className='gallery-img-2-half'>
                                    <div className="gallery-img-2">
                                        <img src="/gallery-2.webp" alt="" />
                                    </div>
                                    <div className="gallery-img-3">
                                        <img src="/gallery-3.webp" alt="" />
                                    </div>
                                </div>
                            </div>
                            <div className="gallery-img-4">
                                <img src="/gallery-4.webp" alt="" />
                            </div>
                        </div>
                        <div className='gallery-grid-2'>
                            <div className="gallery-img-5">
                                <img src="/gallery-5.webp" alt="" />
                            </div>
                            <div className="gallery-img-6">
                                <img src="/gallery-6.webp" alt="" />
                            </div>
                        </div>
                    </div>
                    <div className='flex sm:hidden justify-center'>
                        <Button>
                            DISCOVER MORE
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Gallery