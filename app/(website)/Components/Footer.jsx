import { Button } from '@/components/ui/button'
import React from 'react'
import Link from 'next/link'

const Footer = () => {
    return (
        <section className='footer'>
            <div className='cmpad'>
                <div className='footer-inner'>
                    <div className='footer-logo-section'>
                        <img src="/logo-white.png" alt="" />
                        <h4>PROVIDING QUALITY SERVICES</h4>
                    </div>
                    <div className='footer-menu'>
                        <ul>
                            <li>
                                <Link href="">careers</Link>
                            </li>
                            <li>
                                <Link href="">faq</Link>
                            </li>
                            <li>
                                <Link href="">terms & conditions</Link>
                            </li>
                            <li>
                                <Link href="">privacy policy</Link>
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
                            <li>
                                <Link href="">Reviews</Link>
                            </li>
                            <li>
                                <Link href="">Tell a Friend</Link>
                            </li>
                        </ul>
                    </div>
                    <div className='footer-social-menus'>
                        <ul>
                            <li>
                                <Link target='_blank' href="https://www.facebook.com/profile.php?id=61574276712917">
                                    <img src="/facebook_white.png" alt="" />
                                </Link>
                            </li>
                            <li>
                                <Link target='_blank' href="https://www.instagram.com/luneviaresorts/">
                                    <img src="/instagram_white.png" alt="" />
                                </Link>
                            </li>
                            <li>
                                <Link target='_blank' href="https://pin.it/B6u8cDOdo">
                                    <img src="/pintrest_white.png" alt="" />
                                </Link>
                            </li>
                            <li>
                                <Link target='_blank' href="https://x.com/luneviaresorts">
                                    <img src="/twitter_white.png" alt="" />
                                </Link>
                            </li>
                            <li>
                                <Link target='_blank' href="https://www.linkedin.com/company/lunevia/?viewAsMember=true">
                                    <img src="/linkedin-app-white-icon.png" alt="" />
                                </Link>
                            </li>
                            <li>
                                <Link target='_blank' href="https://www.youtube.com/@Luneviaresorts">
                                    <img src="/youtube-app-white-icon.png" alt="" />
                                </Link>
                            </li>
                        </ul>
                    </div>
                    {/* <div className='footer-mail'>
                        <input type="email" placeholder='Enter Your Mail Address'/>
                        <Button>Sign Up</Button>
                    </div> */}
                    <div className='line'></div>
                    <div className='footer-bottom'>
                        <p>© 2026 Lunevia, Powered by Horatio</p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Footer