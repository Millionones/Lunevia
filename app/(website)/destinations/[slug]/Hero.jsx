import React from 'react'
import { locationIcon, mailSvg, phoneSvg } from '../../../styles/icons'

const Hero = ({ data }) => {

    return (
        <section>
            <div className='hero'>
                {/* <img src="/Banner_Image_Lunevia.webp" alt="" /> */}
                <img src={data.mainImage} alt="" />
                {/* <h1>{data.title}</h1> */}
            </div>
            <div className='hero-support-badge'>
                <ul>
                    <li><a href="tel:+916238829339" target='_blank'>{phoneSvg}</a></li>
                    <li><a href="mailto:info@lunevia.in" target='_blank'>{mailSvg}</a></li>
                    <li><a href="https://maps.app.goo.gl/VnXir9Z3hjZdwDPT9" target='_blank'>{locationIcon}</a></li>
                </ul>
            </div>
        </section>
    )
}

export default Hero