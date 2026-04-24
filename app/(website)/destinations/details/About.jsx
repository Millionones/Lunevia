"use client"
import React, { useState } from 'react'
import { tickIconSvg } from '../../../styles/icons'

const About = () => {

    const [data, setData] = useState({
        img: 'https://templates.sparklethings.com/palmea/wp-content/uploads/sites/246/2026/02/3d-rendering-luxury-tropical-bedroom-suite-in-reso-2026-01-07-02-15-56-utc-1024x682.webp',
        roomDetails: {
            title: 'Deluxe Room',
            price: '200',
            desc: 'Lorem ipsum dolor sit amet consectetur adipiscing elit sapien velit conubia, bibendum montes pretium fusce torquent curabitur venenatis cubilia donec nullam, purus mauris felis etiam ligula leo gravida nam euismod. Penatibus aliquet turpis et natoque at erat ultrices fames, commodo sollicitudin ac inceptos justo elementum id lobortis orci, mollis lacinia nisl tellus nec magnis.'
        },
        features: {
            desc: 'Lorem ipsum dolor sit amet consectetur adipiscing elit, proin varius vel etiam porta hac porttitor habitasse, suspendisse litora ornare netus facilisi pulvinar. Ad torquent velit lacinia semper.',
            list: [
                'Daily Breakfast',
                'Complimentary Lunch or Dinner',
                'Welcome Drink Upon Arrival',
                'Access to Infinity Pool',
                'Private Beach Access',
                'Daily Housekeeping'
            ]
        },
        resortDetails: {
            desc: 'Lorem ipsum dolor sit amet consectetur adipiscing elit, proin varius vel etiam porta hac porttitor habitasse, suspendisse litora ornare netus facilisi pulvinar. Ad torquent velit lacinia semper.',
            list: [
                'Infinity Swimming Pool',
                'Spa &amp; Wellness Center',
                'Private Beach Area',
                'Fine Dining Restaurant',
                '24/7 Guest Services',
                'Fitness Center'
            ]
        }
    })
    return (
        <section className='destination-about'>
            <div className='cmpad'>
                <div className='about-inner-1'>
                    <div className='about-inner-content'>
                        <div className='inner-para'>
                            <h5>Crown woods Munnar By Lunevia</h5>
                            <p>
                                Crown woods Munnar, provides a perfect ambience for a relaxed stay. Surrounded by beautiful tea estates, valleys and waterfalls, the hotel is sure to attract hordes of tourists. Well furnished rooms with balcony, quality services and a comfortable setting are the key features of this resort.<br/>
                                Crown Woods Munnar is positioned Opp Fort Munnar, Chinnakanal in Munnar. Prominent landmarks like Anayirankal Dam (Approx. 7km) and St. Joseph Church (Approx. 3km) are located nearby. A popular tourist attraction, Anayirankal Dam and lake is surrounded by Tata tea plantations and evergreen forests with herds of elephants visiting the lake. Travellers should make it a point to explore Chinnakanal Waterfalls, Elephant Lake and Echo Point. <br/>
                                Nestled in the breathtaking hills of Munnar, India, Crown woods Munnar Resorts With Balcony is a charming 3-star hotel that invites you to experience the serene beauty of nature while enjoying modern comforts. This delightful resort features 20 elegantly designed rooms, each equipped with a private balcony that offers stunning views of the lush green landscapes and rolling hills that Munnar is famous for. Whether
                                you're here for a romantic escape, a family vacation, or a solo retreat, this hotel provides a perfect blend of hospitality and tranquility. At Crown Woods Munnar Resorts, your comfort is our priority. With a check-in time starting at 1:00 PM and check-out until 11:00 AM, we ensure that your stay is as convenient as possible. Families will appreciate our child policy, which allows children aged between 3 to 8 years
                                to stay free of charge, making it an ideal choice for those traveling with little ones. Come and indulge in the enchanting atmosphere of Munnar, where every moment spent at our resort promises to be a delightful experience. <br/>
                                Address: Opp Fort Munnar Hotel, Suryanelli Road, Chinnakanal, Munnar, Kerala 685618.
                            </p>
                        </div>
                        <div className='inner-media'>
                            <img src="/Crown_woods_Munnar.webp" alt="" />
                        </div>
                    </div>
                </div>
                {/* <div className='about-inner'>
                    <div className='about-inner-left'>
                        <div className='about-inner-left-media'>
                            <div className='about-inner-left-media-img'>
                                <img src={data.img} />
                            </div>
                        </div>
                        <div className='about-inner-room-detail'>
                            <div className='about-inner-room-detail-header'>
                                <h2 className='about-inner-room-detail-header-title'>{data.roomDetails.title}</h2>
                                <div className='about-inner-room-detail-header-price'>
                                    <h2 className='about-inner-room-detail-header-price-amount'>${data.roomDetails.price}</h2>
                                    <p className='about-inner-room-detail-header-price-per'>/ Night</p>
                                </div>
                            </div>
                            <div className="line-separator"></div>
                            <div className='about-inner-room-detail-description'>
                                <p>{data.roomDetails.desc}</p>
                            </div>
                        </div>
                        <div className="line-separator"></div>
                        <div className='about-inner-features'>
                            <h2 className='about-inner-features-title'>Included</h2>
                            <p className='about-inner-features-description'>{data.features.desc}</p>
                            <ul className='about-inner-features-list'>
                                {
                                    data.features.list.map((item, index) => (
                                        <li key={index} className="about-inner-features-list-item">
                                            <span className="about-inner-features-list-icon">
                                                {tickIconSvg}
                                            </span>
                                            <span className="about-inner-features-list-text">{item}</span>
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                        <div className="line-separator"></div>
                        <div className='about-property'>
                            <h2 className='about-property-title'>Resort Amenities</h2>
                            <p className='about-property-description'>{data.resortDetails.desc}</p>
                            <div >
                                <ul className='about-property-features-list'>
                                    {data.resortDetails.list.map((item, index) => (
                                        <li key={index} className="about-inner-property-list-item">
                                            <span className="about-property-features-list-icon">{tickIconSvg}</span>
                                            <span className="about-inner-property-list-text">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className='about-inner-right'>
                        <div className='about-inner-right-room'>
                            <h2 className='about-inner-right-room-title'>Room Detail</h2>
                            <ul className='about-inner-right-room-list'>
                                <li >
                                    <span className="about-inner-right-room-list-icon">
                                        <svg aria-hidden="true" className="e-font-icon-svg e-fas-users" viewBox="0 0 640 512" xmlns="http://www.w3.org/2000/svg"><path d="M96 224c35.3 0 64-28.7 64-64s-28.7-64-64-64-64 28.7-64 64 28.7 64 64 64zm448 0c35.3 0 64-28.7 64-64s-28.7-64-64-64-64 28.7-64 64 28.7 64 64 64zm32 32h-64c-17.6 0-33.5 7.1-45.1 18.6 40.3 22.1 68.9 62 75.1 109.4h66c17.7 0 32-14.3 32-32v-32c0-35.3-28.7-64-64-64zm-256 0c61.9 0 112-50.1 112-112S381.9 32 320 32 208 82.1 208 144s50.1 112 112 112zm76.8 32h-8.3c-20.8 10-43.9 16-68.5 16s-47.6-6-68.5-16h-8.3C179.6 288 128 339.6 128 403.2V432c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48v-28.8c0-63.6-51.6-115.2-115.2-115.2zm-223.7-13.4C161.5 263.1 145.6 256 128 256H64c-35.3 0-64 28.7-64 64v32c0 17.7 14.3 32 32 32h65.9c6.3-47.4 34.9-87.3 75.2-109.4z"></path></svg>						</span>
                                    <span className="about-inner-right-room-text">Guest Capacity: 2 People</span>
                                </li>
                                <li >
                                    <span className="about-inner-right-room-list-icon">
                                        <svg aria-hidden="true" className="e-font-icon-svg e-fas-bed" viewBox="0 0 640 512" xmlns="http://www.w3.org/2000/svg"><path d="M176 256c44.11 0 80-35.89 80-80s-35.89-80-80-80-80 35.89-80 80 35.89 80 80 80zm352-128H304c-8.84 0-16 7.16-16 16v144H64V80c0-8.84-7.16-16-16-16H16C7.16 64 0 71.16 0 80v352c0 8.84 7.16 16 16 16h32c8.84 0 16-7.16 16-16v-48h512v48c0 8.84 7.16 16 16 16h32c8.84 0 16-7.16 16-16V240c0-61.86-50.14-112-112-112z"></path></svg>						</span>
                                    <span className="about-inner-right-room-text">Bed: 1 Kingbeds</span>
                                </li>
                                <li >
                                    <span className="about-inner-right-room-list-icon">
                                        <svg aria-hidden="true" className="e-font-icon-svg e-fas-shower" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="M304,320a16,16,0,1,0,16,16A16,16,0,0,0,304,320Zm32-96a16,16,0,1,0,16,16A16,16,0,0,0,336,224Zm32,64a16,16,0,1,0-16-16A16,16,0,0,0,368,288Zm-32,32a16,16,0,1,0-16-16A16,16,0,0,0,336,320Zm-32-64a16,16,0,1,0,16,16A16,16,0,0,0,304,256Zm128-32a16,16,0,1,0-16-16A16,16,0,0,0,432,224Zm-48,16a16,16,0,1,0,16-16A16,16,0,0,0,384,240Zm-16-48a16,16,0,1,0,16,16A16,16,0,0,0,368,192Zm96,32a16,16,0,1,0,16,16A16,16,0,0,0,464,224Zm32-32a16,16,0,1,0,16,16A16,16,0,0,0,496,192Zm-64,64a16,16,0,1,0,16,16A16,16,0,0,0,432,256Zm-32,32a16,16,0,1,0,16,16A16,16,0,0,0,400,288Zm-64,64a16,16,0,1,0,16,16A16,16,0,0,0,336,352Zm-32,32a16,16,0,1,0,16,16A16,16,0,0,0,304,384Zm64-64a16,16,0,1,0,16,16A16,16,0,0,0,368,320Zm21.65-218.35-11.3-11.31a16,16,0,0,0-22.63,0L350.05,96A111.19,111.19,0,0,0,272,64c-19.24,0-37.08,5.3-52.9,13.85l-10-10A121.72,121.72,0,0,0,123.44,32C55.49,31.5,0,92.91,0,160.85V464a16,16,0,0,0,16,16H48a16,16,0,0,0,16-16V158.4c0-30.15,21-58.2,51-61.93a58.38,58.38,0,0,1,48.93,16.67l10,10C165.3,138.92,160,156.76,160,176a111.23,111.23,0,0,0,32,78.05l-5.66,5.67a16,16,0,0,0,0,22.62l11.3,11.31a16,16,0,0,0,22.63,0L389.65,124.28A16,16,0,0,0,389.65,101.65Z"></path></svg>						</span>
                                    <span className="about-inner-right-room-text">Bathrooms: 1 </span>
                                </li>
                                <li >
                                    <span className="about-inner-right-room-list-icon">
                                        <svg aria-hidden="true" className="e-font-icon-svg e-fas-ruler-combined" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="M160 288h-56c-4.42 0-8-3.58-8-8v-16c0-4.42 3.58-8 8-8h56v-64h-56c-4.42 0-8-3.58-8-8v-16c0-4.42 3.58-8 8-8h56V96h-56c-4.42 0-8-3.58-8-8V72c0-4.42 3.58-8 8-8h56V32c0-17.67-14.33-32-32-32H32C14.33 0 0 14.33 0 32v448c0 2.77.91 5.24 1.57 7.8L160 329.38V288zm320 64h-32v56c0 4.42-3.58 8-8 8h-16c-4.42 0-8-3.58-8-8v-56h-64v56c0 4.42-3.58 8-8 8h-16c-4.42 0-8-3.58-8-8v-56h-64v56c0 4.42-3.58 8-8 8h-16c-4.42 0-8-3.58-8-8v-56h-41.37L24.2 510.43c2.56.66 5.04 1.57 7.8 1.57h448c17.67 0 32-14.33 32-32v-96c0-17.67-14.33-32-32-32z"></path></svg>						</span>
                                    <span className="about-inner-right-room-text">Room Size: 38 m²</span>
                                </li>
                                <li >
                                    <span className="about-inner-right-room-list-icon">
                                        <svg aria-hidden="true" className="e-font-icon-svg e-fas-image" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="M464 448H48c-26.51 0-48-21.49-48-48V112c0-26.51 21.49-48 48-48h416c26.51 0 48 21.49 48 48v288c0 26.51-21.49 48-48 48zM112 120c-30.928 0-56 25.072-56 56s25.072 56 56 56 56-25.072 56-56-25.072-56-56-56zM64 384h384V272l-87.515-87.515c-4.686-4.686-12.284-4.686-16.971 0L208 320l-55.515-55.515c-4.686-4.686-12.284-4.686-16.971 0L64 336v48z"></path></svg>						</span>
                                    <span className="about-inner-right-room-text">View: Infinity Pool View</span>
                                </li>
                            </ul>
                        </div>
                        <div className='about-inner-right-form'>
                            <div className='about-inner-right-form-item'>
                                <label htmlFor="">Full Name</label>
                                <input type="text" placeholder='Full Name' />
                            </div>
                            <div className='about-inner-right-form-item'>
                                <label htmlFor="">Email</label>
                                <input type="text" placeholder='Email Address' />
                            </div>
                            <div className='about-inner-right-form-item'>
                                <label htmlFor="">Guest</label>
                                <input type="number" placeholder='No. of Guest' />
                            </div>
                            <div className='about-inner-right-form-item'>
                                <label htmlFor="">Check in</label>
                                <input type="date" />
                            </div>
                            <div className='about-inner-right-form-item'>
                                <label htmlFor="">Check out</label>
                                <input type="date" />
                            </div>
                            <div className='about-inner-right-form-submit'>
                                <button>Book Now</button>
                            </div>
                        </div>
                    </div>

                </div> */}
            </div>
        </section>
    )
}

export default About
