import React from 'react'

const Header = () => {
    return (
        <>
            <section className='header'>
                <div className='cmpad h-full'>
                    <div className='h-full flex justify-between items-center'>
                        <div className=''>
                            <img src="/logo-white.png" alt="logo" className='max-w-[140px]' />
                        </div>
                        <div className='flex flex-col justify-center items-center gap-2.5'>
                            {/* <ul className='flex gap-5 header-menu'>
                                <li>
                                    <a href="">
                                        CGH EARTH AYURVEDA
                                    </a>
                                </li>
                                <li>
                                    <a href="">
                                        SWASWARA
                                    </a>
                                </li>
                                <li>
                                    <a href="">
                                        PRAKRITI SHAKTI
                                    </a>
                                </li>
                            </ul> */}
                            <ul className='flex gap-5 header-menu'>
                                <li>
                                    <a href="/About-LUNEVIA">
                                        About LUNEVIA
                                    </a>
                                </li>
                                <li>
                                    <a href="">
                                        Our Philosophy / Experience
                                    </a>
                                </li>
                                <li>
                                    <a href="">
                                        Destinations
                                    </a>
                                </li>
                                <li>
                                    <a href="">
                                        Contact Us
                                    </a>
                                </li>
                                <li>
                                    <a href="">
                                        Enquiry Form
                                    </a>
                                </li>
                                {/* <li>
                                    <a href="">
                                        Careers 
                                    </a>
                                </li> */}
                                <li>
                                    <a href="">
                                        Testimonials
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div className='flex items-center gap-3'>
                            <button className='head-btn'>
                                <p>Book Now</p>
                            </button>
                            <button className='head-btn'>
                                <p>Enquire Now</p>
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Header