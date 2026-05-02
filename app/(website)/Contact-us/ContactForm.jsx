import React from 'react'
import { facebookSvg, instagramSvg, mailSvg, phoneSvg, twitterSvg } from '../../styles/icons'

const ContactForm = () => {
    return (
        <section className='contact-section'>
            <div className='cmpad'>
                <div className='contact-inner'>
                    <div className='contact-left'>
                        <div className='contact-header'>
                            <h5>Contact Us</h5>
                            <h2>Get in Touch with Our Hospitality Team</h2>
                            <p>Have questions or need assistance with your booking? Our team is here to help.
                                Feel free to reach out to us anytime, and we’ll ensure your stay is smooth and memorable.</p>
                        </div>
                        <div className='contact-links'>
                            <div className='contact-link'>
                                <div>
                                    <h3>Phone</h3>
                                    <a href="tel:+916238829339">
                                        <span className="icon">{phoneSvg}</span>
                                        <p>+91 6238829339</p>
                                    </a>
                                    <a href="tel:+916238899339">
                                        <span className="icon">{phoneSvg}</span>
                                        <p>+91 6238899339</p>
                                    </a>
                                </div>
                                <div>
                                    <h3>Email</h3>
                                    <a href="mailto:info@lunevia.in">
                                        <span>{mailSvg}</span>
                                        <p>info@lunevia.in</p>
                                    </a>
                                </div>
                            </div>
                            <div className='contact-social'>
                                <h3>Social Media</h3>
                                <ul>
                                    <li>
                                        <a href="/https://www.facebook.com/profile.php?id=61574276712917">
                                            <span>{facebookSvg}</span>
                                            <p>Facebook</p>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="/https://x.com/luneviaresorts">
                                            <span>{twitterSvg}</span>
                                            <p>X Twitter</p>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="/https://www.instagram.com/luneviaresorts/">
                                            <span>{instagramSvg}</span>
                                            <p>Instagram</p>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className='contact-right'>
                        <div className='contact-form'>
                            <div className='contact-input-grid'>
                                <div className='input-row'>
                                    <label htmlFor="">First Name</label>
                                    <input type="text" placeholder='First Name' />
                                </div>
                                <div className='input-row'>
                                    <label htmlFor="">Last Name</label>
                                    <input type="text" placeholder='Last Name' />
                                </div>
                                <div className='input-row'>
                                    <label htmlFor="">Email Address</label>
                                    <input type="text" placeholder='Email Address' />
                                </div>
                                <div className='input-row'>
                                    <label htmlFor="">Mobile Number</label>
                                    <input type="number" placeholder='Mobile Number' />
                                </div>
                            </div>
                            <div className='contact-input-section'>
                                <div className='input-row'>
                                    <label htmlFor="">Subject</label>
                                    <input type="text" placeholder='Subject' />
                                </div>
                            </div>
                            <div className='contact-input-section'>
                                <div className='input-row'>
                                    <label htmlFor="">Comments / Questions</label>
                                    <textarea name="" id="" placeholder='Comments' cols={30} rows={10}></textarea>
                                </div>
                            </div>
                            <div >
                                <button className='send-btn'>SEND MESSAGE</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ContactForm