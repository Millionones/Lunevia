"use client"
import React, { useState } from 'react'
import { facebookSvg, instagramSvg, mailSvg, phoneSvg, twitterSvg } from '../../styles/icons'
import toast from 'react-hot-toast';
import { validateEmail, validateMobile } from '../../../helpers/functions';
import { post } from '../../../helpers/api'
const ContactForm = () => {

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        mobile: "",
        subject: "",
        comments: "",
    });

    const [submit, setSubmit] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmit(true);
        try {
            if (formData.firstName.length == 0) {
                setSubmit(false);
                return toast.error("Please Fill the First Name")
            }
            if (formData.lastName.length == 0) {
                setSubmit(false);
                return toast.error("Please Fill the Last Name")
            }
            if (!validateEmail(formData.email)) {
                setSubmit(false);
                return toast.error("Please Enter Valid Email")
            }
            if (!validateMobile(formData.mobile)) {
                setSubmit(false);
                return toast.error("Please Enter Valid Mobile Number")
            }
            if (formData.subject.length == 0) {
                setSubmit(false);
                return toast.error("Please Fill the Subject")
            }
            const response = await post("contact/", formData)
            if (response.success) {
                setFormData({
                    firstName: "",
                    lastName: "",
                    email: "",
                    mobile: "",
                    subject: "",
                    comments: "",
                });

                toast.success(response.message);
            }
            setSubmit(false);

        } catch (error) {
            console.log(error);
            toast.error(err?.response?.data?.message || err?.message);
            setSubmit(false);
        }
    };
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
                                {/* <div>
                                    <h3>Email</h3>
                                    <a href="mailto:info@lunevia.in">
                                        <span>{mailSvg}</span>
                                        <p>info@lunevia.in</p>
                                    </a>
                                </div> */}
                            </div>
                            <div className='contact-social'>
                                {/* <h3>Social Media</h3>
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
                                </ul> */}
                                <h3>Email</h3>
                                <a href="mailto:info@lunevia.in">
                                    <span>{mailSvg}</span>
                                    <p>info@lunevia.in</p>
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className='contact-right'>
                        <form className='contact-form' onSubmit={handleSubmit}>
                            <div className='contact-input-grid'>
                                <div className='input-row'>
                                    <label htmlFor="">First Name</label>
                                    <input type="text" placeholder='First Name' name='firstName' value={formData.firstName} onChange={handleChange} />
                                </div>
                                <div className='input-row'>
                                    <label htmlFor="">Last Name</label>
                                    <input type="text" placeholder='Last Name' name='lastName' value={formData.lastName} onChange={handleChange} />
                                </div>
                                <div className='input-row'>
                                    <label htmlFor="">Email Address</label>
                                    <input type="text" placeholder='Email Address' name='email' value={formData.email} onChange={handleChange} />
                                </div>
                                <div className='input-row'>
                                    <label htmlFor="">Mobile Number</label>
                                    <input type="number" placeholder='Mobile Number' name='mobile' value={formData.mobile} onChange={handleChange} />
                                </div>
                            </div>
                            <div className='contact-input-section'>
                                <div className='input-row'>
                                    <label htmlFor="">Subject</label>
                                    <input type="text" placeholder='Subject' name='subject' value={formData.subject} onChange={handleChange} />
                                </div>
                            </div>
                            <div className='contact-input-section'>
                                <div className='input-row'>
                                    <label htmlFor="">Comments / Questions</label>
                                    <textarea name="" id="" placeholder='Comments' cols={30} rows={10} name='comments' value={formData.comments} onChange={handleChange}></textarea>
                                </div>
                            </div>
                            <div >
                                {submit == false ?
                                    <button type="submit" className='send-btn'>SEND MESSAGE</button>
                                    : <button className='send-btn loader-btn'>
                                        <img src="/loader.svg" alt="" />
                                    </button>
                                }
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ContactForm