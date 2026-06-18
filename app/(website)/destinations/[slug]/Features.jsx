"use client"
import React, { useState } from 'react'
const Features = ({ data }) => {

    // const [data, setData] = useState([
    //     {
    //         img: "/client-resort-img5.webp",
    //         title: "Restaurent",
    //         desc: "Enjoy a delightful dining experience at our in-house restaurant, offering a variety of multi-cuisine dishes prepared with fresh ingredients. Whether it's a hearty breakfast, a relaxed lunch, or a cozy dinner, our restaurant provides the perfect ambiance to satisfy your cravings."
    //     },
    //     {
    //         img:"/parking.jpg",
    //         title:"Free parking",
    //         desc:"The resort offers complimentary parking facilities for all guests, ensuring a hassle-free stay. With secure and spacious parking areas, guests can conveniently park their vehicles and enjoy their time without any worries."
    //     },
    //     // {
    //     //     img:"/amenteties-3.jpg",
    //     //     title:"WiFi access",
    //     //     desc:"WiFi is available across the property to enable you to stay connected at work. However, we at CGH Earth think that a holiday with us is best enjoyed unplugged, or plugged minimally. Let nature lead your eyes and heart for a change!"
    //     // }
    // ])
    return (
        <section className='amenteties-section'>
            <div className='cmpad'>
                <div className='amenteties-inner'>
                    <h2>
                        Ameneties
                    </h2>
                    <div className='amenteties-inner-content'>
                        <ul className='amenteties-grid'>
                            {
                                data.map((item, idx) => (
                                    <li >
                                        <div>
                                            <img src={item.image} alt="" />
                                        </div>
                                        <div className='amenteties-grid-content'>
                                            <h6>{item.title}</h6>
                                            <p>{item.description}</p>
                                        </div>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Features