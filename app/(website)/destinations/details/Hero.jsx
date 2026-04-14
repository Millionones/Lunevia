import React from 'react'
import { mailSvg, phoneSvg } from '../../../styles/icons'

const Hero = () => {
    return (
        <section>
            <div className='hero'>
                <img src="/destination1.png" alt="" />
                <h1>LUNEVIA Backwater Reserve – Alleppey</h1>
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