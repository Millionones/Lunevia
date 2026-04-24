import React from 'react'
import { mailSvg, phoneSvg } from '../../../styles/icons'

const Hero = () => {
    return (
        <section>
            <div className='hero'>
                <img src="/Crown_woods_Munnar.webp" alt="" />
                <h1>Crown woods Munnar By Lunevia</h1>
            </div>
            <div className='hero-support-badge'>
                <ul>
                    <li><a href="">{phoneSvg}</a></li>
                    <li><a href="">{mailSvg}</a></li>
                    {/* <li><a href=""></a></li> */}
                </ul>
            </div>
        </section>
    )
}

export default Hero