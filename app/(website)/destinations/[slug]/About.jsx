"use client"
import React, { useState } from 'react'
import { tickIconSvg } from '../../../styles/icons'

const About = ({ data }) => {
    
    return (
        <section className='destination-about'>
            <div className='cmpad'>
                <div className='about-inner-1'>
                    <div className='about-inner-content'>
                        <div className='inner-para'>
                            <h5>{data.title}</h5>
                            
                            <div className='inner-para-content' dangerouslySetInnerHTML={{ __html: data.description }}></div>
                        </div>
                        <div className='inner-media'>
                            <img src={data.image} alt="" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default About
