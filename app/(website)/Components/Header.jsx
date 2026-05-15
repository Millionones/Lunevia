"use client"
import React, { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { closeIconSvg } from '../../styles/icons';
const Header = () => {

    const [menuOpen, setMenuOpen] = useState(false);

    const dropdownRef = useRef(null);
    const mobileNavRef = useRef(null);

    useEffect(() => {
        if (menuOpen == true) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
    }, [menuOpen])

    return (
        <>
            <section className='header'>
                <div className='cmpad h-full'>
                    <div className='h-full flex justify-between items-center'>
                        <a href="/">
                            <img src="/logo-white.png" alt="logo" className='max-w-[100px] sm:max-w-[140px]' />
                        </a>
                        <div className='hidden sm:flex flex-col justify-center items-center gap-2.5'>
                            <ul className='flex gap-5 header-menu'>
                                <li>
                                    <a href="/About-LUNEVIA">
                                        About LUNEVIA
                                    </a>
                                </li>
                                <li>
                                    <a href="/philosophy-experience">
                                        Experience
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
                                {/* <li>
                                    <a href="/testimonials">
                                        Testimonials
                                    </a>
                                </li> */}
                            </ul>
                        </div>
                        <div className='hidden sm:flex items-center gap-3'>
                            <Link href="/destinations" className='head-btn'>
                                <p>Book Now</p>
                            </Link>
                            <Link href="/Contact-us" className='head-btn'>
                                <p>Enquire Now</p>
                            </Link>
                        </div>
                        <Link href="https://wa.me/8113027095"
                            target="_blank" className='wtsp-btn'>
                            <img src="/whatsapp.png" alt="" />
                        </Link>
                        {/* Mobile menu button */}
                        <div className="menu flex sm:hidden" ref={dropdownRef}>
                            <button
                                type="button"
                                className={`icon-btn ${menuOpen ? "icon-btn--active" : ""}  mobile-menu-btn inline-flex items-center justify-center w-9 h-9 rounded-md`}
                                aria-expanded={menuOpen}
                                aria-label={menuOpen ? "Close menu" : "Open menu"}
                                onClick={() => setMenuOpen((open) => !open)}
                            >
                                <img src="/menu.svg" alt="" />
                            </button>
                        </div>

                        <div ref={mobileNavRef} className={`${menuOpen ? "block" : "hidden"} absolute bg-white border shadow-lg z-40 min-w-[300px] top-0 right-0 h-full min-h-[100vh]`}>
                            <div className='py-5 px-5 flex flex-col gap-[24px]'>
                                <div className='flex justify-between items-center'>
                                    <img src="/logo-black.png" alt="logo" className='max-w-[140px]' />
                                    <button className='' onClick={() => setMenuOpen(false)}>
                                        <img src="/cross_icon.svg" alt="" className='max-w-[24px]' />
                                    </button>
                                </div>
                                <ul className="grid gap-4 text-black">
                                    <li >
                                        <a href="/About-LUNEVIA">
                                            About LUNEVIA
                                        </a>
                                    </li>
                                    <li >
                                        <a href="/philosophy-experience">
                                            Experience
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
                                    {/* <li>
                                        <a href="/testimonials">
                                            Testimonials
                                        </a>
                                    </li> */}
                                    <li>
                                        <Link href="">Careers</Link>
                                    </li>
                                    <li>
                                        <Link href="">Faq</Link>
                                    </li>
                                    <li>
                                        <Link href="">Terms & Conditions</Link>
                                    </li>
                                    <li>
                                        <Link href="">Privacy Policy</Link>
                                    </li>
                                    <li>
                                        <Link href="">Blogs</Link>
                                    </li>
                                    <li>
                                        <Link href="">Experience</Link>
                                    </li>
                                    <li>
                                        <Link href="">Enquiry Form</Link>
                                    </li>
                                </ul>
                                {/* <div className='flex justify-center'>
                                    <Link href="https://wa.me/8113027095"
                                        target="_blank" className='wtsp-mob-btn'>
                                        <p>Whatsapp Us</p>
                                        <img src="/whatsapp.png" alt="" />
                                    </Link>
                                </div> */}
                                <div className='flex items-center justify-center gap-2.5 '>
                                    <Link href="/destinations" className='head-btn' style={{ borderColor: "#000000", color: "#000000" }}>
                                        <p>Book Now</p>
                                    </Link>
                                    <Link href="/Contact-us" className='head-btn' style={{ borderColor: "#000000", color: "#000000" }}>
                                        <p>Enquire Now</p>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Header