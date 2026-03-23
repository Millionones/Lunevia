import React from 'react'

const Header = () => {
    return (
        <>
            <section className='header'>
                <div className='cmpad h-full'>
                    <div className='h-full flex justify-between items-center'>
                        <a href="/">
                            <img src="/logo-white.png" alt="logo" className='max-w-[140px]' />
                        </a>
                        <div className='flex flex-col justify-center items-center gap-2.5'>
                            <ul className='flex gap-5 header-menu'>
                                <li>
                                    <a href="/About-LUNEVIA">
                                        About LUNEVIA
                                    </a>
                                </li>
                                <li>
                                    <a href="/philosophy-experience">
                                        Our Philosophy / Experience
                                    </a>
                                </li>
                                <li>
                                    <a href="/destinations">
                                        Destinations
                                    </a>
                                </li>
                                <li>
                                    <a href="/Contact-us">
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
                                    <a href="/testimonials">
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