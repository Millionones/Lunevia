import React from 'react'
import { locationIcon, mailSvg, phoneSvg } from '../../../styles/icons'

const Hero = () => {
    return (
        <section>
            <div className='hero'>
                <img src="/Banner_Image_Lunevia.webp" alt="" />
                {/* <h1>Crown woods Munnar By Lunevia</h1> */}
            </div>
            <div className='hero-support-badge'>
                <ul>
                    <li><a href="tel:+916238829339">{phoneSvg}</a></li>
                    <li><a href="mailto:info@lunevia.in">{mailSvg}</a></li>
                    <li><a href="">{locationIcon}</a></li>
                </ul>
            </div>
        </section>
    )
}

export default Hero