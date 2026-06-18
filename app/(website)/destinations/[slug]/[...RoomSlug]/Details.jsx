"use client"
import React, { useState } from 'react'
import { tickIconSvg } from '../../../../styles/icons'
import toast from 'react-hot-toast'
import { validateEmail, validateMobile } from '../../../../../helpers/functions'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
const Details = ({ slug, data }) => {

    const roomImages = {
        superior_room: {
            mainImg: "/Superior_Room.jpeg",
            title: "Superior Room"
        },
        deluxe_room: {
            mainImg: "/Deluxe_Room.jpeg",
            title: "Deluxe Room"
        },
        suite_room: {
            mainImg: "/Suite_Room.jpeg",
            title: "Suite Room"
        },
    }
    // const [data, setData] = useState({
    //     img: roomImages[slug].mainImg,
    //     roomDetails: {
    //         title: roomImages[slug].title,
    //         price: '200',
    //         desc: 'Experience luxury and comfort in this beautifully designed room, offering a perfect blend of style and functionality. Large windows allow natural light to fill the space, creating a bright and inviting atmosphere.'
    //     },
    //     features: {
    //         // desc: 'Lorem ipsum dolor sit amet consectetur adipiscing elit, proin varius vel etiam porta hac porttitor habitasse, suspendisse litora ornare netus facilisi pulvinar. Ad torquent velit lacinia semper.',
    //         list: [
    //             'Daily Breakfast',
    //             'Welcome Drink Upon Arrival',
    //             'Daily Housekeeping'
    //         ]
    //     },
    //     resortDetails: {
    //         desc: 'Our resort is thoughtfully designed to offer a perfect blend of comfort, relaxation, and convenience. Guests can enjoy modern facilities along with serene surroundings, making it an ideal getaway for both leisure and business stays.',
    //         list: [
    //             'Dedicated travel assistance',
    //             'Peaceful natural surroundings',
    //             'Coffee Shop',
    //             '24/7 Guest Services',
    //         ]
    //     }
    // })
    const today = new Date().toISOString().split("T")[0];
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        mobile: "",
        guestNo: "",
        adults: "",
        childrens: "",
        checkIn: "",
        checkInTime: "",
        checkOut: "",
        checkOutTime: "",
        destination: "Crown woods Munnar By Lunevia",
        room: slug
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const getNextDay = (date) => {
        if (!date) return today;

        const nextDay = new Date(date);
        nextDay.setDate(nextDay.getDate() + 1);

        return nextDay.toISOString().split("T")[0];
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            let data = { ...formData }
            if (formData.fullName.length == 0) {
                return toast.error("Please Fill the Full Name")
            }
            if (!validateEmail(formData.email)) {
                return toast.error("Please Enter Valid Email")
            }
            if (!validateMobile(formData.mobile)) {
                return toast.error("Please Enter Valid Mobile Number")
            }
            if (formData.guestNo.length == 0 || formData.guestNo == 0 || formData.guestNo > 10) {
                return toast.error("Please Enter Valid Guest Count")
            }
            if (formData.adults.length == 0 || formData.adults == 0 || formData.adults > 10) {
                return toast.error("Please Enter Valid Adult Count")
            }
            if (formData.childrens > 10) {
                return toast.error("Please Enter Valid Childrens Count")
            }
            if (formData.checkIn.length == 0) {
                return toast.error("Please Enter Valid Check In Date")
            }
            if (formData.checkOut.length == 0) {
                return toast.error("Please Enter Valid Check Out Date")
            }
            const response = await fetch("/api/booking", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            const responseData = await response.json();

            if (responseData.success) {

                // alert("Message Sent Successfully");
                toast.success("Booking Sent Successfully")

                setFormData({
                    fullName: "",
                    email: "",
                    mobile: "",
                    guestNo: "",
                    adults: "",
                    childrens: "",
                    checkIn: "",
                    checkInTime: "",
                    checkOut: "",
                    checkOutTime: ""
                });
                data = {}
            }

        } catch (error) {
            console.log(error);
        }
    };
    return (
        <section className='destination-about' id='detail'>
            <div className='cmpad'>
                <div className='about-inner'>
                    <div className='about-inner-left'>
                        <div className='about-inner-left-media'>
                            <div className='about-inner-left-media-img'>
                                <img src={data.image} />
                            </div>
                        </div>
                        <div className='about-inner-room-detail'>
                            <div className='about-inner-room-detail-header'>
                                <h2 className='about-inner-room-detail-header-title'>{data.title}</h2>
                                {/* <div className='about-inner-room-detail-header-price'>
                                    <h2 className='about-inner-room-detail-header-price-amount'>${data.roomDetails.price}</h2>
                                    <p className='about-inner-room-detail-header-price-per'>/ Night</p>
                                </div> */}
                            </div>
                            <div className="line-separator"></div>
                            <div className='about-inner-room-detail-description' dangerouslySetInnerHTML={{ __html: data?.description }}>
                                {/* <p>{data.description}</p> */}
                            </div>
                        </div>
                        <div className="line-separator"></div>
                        <div className='about-inner-features'>
                            <h2 className='about-inner-features-title'>Included</h2>
                            <div className='about-inner-features-div' dangerouslySetInnerHTML={{ __html: data?.availableFeatures }}></div>
                            {/* <p className='about-inner-features-description'>{data.features.desc}</p> */}
                            {/* <ul className='about-inner-features-list'>
                                {
                                    data.features.map((item, index) => (
                                        <li key={index} className="about-inner-features-list-item">
                                            <span className="about-inner-features-list-icon">
                                                {tickIconSvg}
                                            </span>
                                            <span className="about-inner-features-list-text">{item}</span>
                                        </li>
                                    ))
                                }
                            </ul> */}
                        </div>
                        <div className="line-separator"></div>
                        <div className='about-property'>
                            <h2 className='about-property-title'>Resort Amenities</h2>
                            {/* <p className='about-property-description'>{data.resortDetails.desc}</p> */}
                            <div className='about-property-features-div' dangerouslySetInnerHTML={{ __html: data?.resortAmenities }}>
                                {/* <ul className='about-property-features-list'>
                                    {data.resortDetails.list.map((item, index) => (
                                        <li key={index} className="about-inner-property-list-item">
                                            <span className="about-property-features-list-icon">{tickIconSvg}</span>
                                            <span className="about-inner-property-list-text">{item}</span>
                                        </li>
                                    ))}
                                </ul> */}
                            </div>
                        </div>
                    </div>
                    <div className='about-inner-right'>
                        <div className='about-inner-right-room'>
                            <h2 className='about-inner-right-room-title'>Room Detail</h2>
                            <ul className='about-inner-right-room-list'>
                                {
                                    data?.features?.map((item, inx) => (
                                        <li >
                                            <span className="about-inner-right-room-list-icon">{tickIconSvg}</span>
                                            <span className="about-inner-right-room-text">{item.label}: {item.answer}</span>
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                        <form className='about-inner-right-form' onSubmit={handleSubmit}>
                            <div className='flex gap-4 flex-col sm:flex-row'>
                                <div className='about-inner-right-form-item'>
                                    <label htmlFor="">Full Name</label>
                                    <input type="text" placeholder='Full Name' name='fullName' value={formData.fullName} onChange={handleChange} />
                                </div>
                                <div className='about-inner-right-form-item'>
                                    <label htmlFor="">Email</label>
                                    <input type="text" placeholder='Email Address' name='email' value={formData.email} onChange={handleChange} />
                                </div>
                            </div>
                            <div className='flex gap-4 flex-col sm:flex-row'>
                                <div className='about-inner-right-form-item'>
                                    <label htmlFor="">Mobile</label>
                                    <input type="number" placeholder='Mobile Number' name='mobile' value={formData.mobile} onChange={handleChange} />
                                </div>
                                <div className='about-inner-right-form-item'>
                                    <label htmlFor="">Guest</label>
                                    <input type="number" placeholder='No. of Guest' name='guestNo' value={formData.guestNo} onChange={handleChange} />
                                </div>
                            </div>
                            <div className='flex gap-4 flex-col sm:flex-row'>
                                <div className='about-inner-right-form-item'>
                                    <label htmlFor="">No. of Adults</label>
                                    <input type="number" placeholder='No. of Guest' name='adults' value={formData.adults} onChange={handleChange} />
                                </div>
                                <div className='about-inner-right-form-item'>
                                    <label htmlFor="">No. of Childrens</label>
                                    <input type="number" placeholder='No. of Guest' name='childrens' value={formData.childrens} onChange={handleChange} />
                                </div>
                            </div>
                            <div className='flex gap-4 flex-col sm:flex-row'>
                                <div className='about-inner-right-form-item'>
                                    <label htmlFor="">Check In Date</label>
                                    <input type="date" name='checkIn' value={formData.checkIn} onChange={handleChange} min={today} />
                                </div>
                                <div className='about-inner-right-form-item'>
                                    <label htmlFor="">Check In Time</label>
                                    <input type="time" name='checkInTime' value={formData.checkInTime} onChange={handleChange} disabled={formData.checkIn.length == 0} />
                                    {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DemoContainer components={['TimePicker']}>
                                            <TimePicker label="Select the time" name='checkInTime'value={formData.checkInTime}  onChange={handleChange} disabled={formData.checkIn.length == 0}/>
                                        </DemoContainer>
                                    </LocalizationProvider> */}
                                </div>
                            </div>
                            <div className='flex gap-4 flex-col sm:flex-row'>
                                <div className='about-inner-right-form-item'>
                                    <label htmlFor="">Check Out Date</label>
                                    <input type="date" name='checkOut' value={formData.checkOut} onChange={handleChange} min={getNextDay(formData.checkIn)} />
                                </div>
                                <div className='about-inner-right-form-item'>
                                    <label htmlFor="">Check Out Time</label>
                                    <input type="time" name='checkOutTime' value={formData.checkOutTime} onChange={handleChange} disabled={formData.checkOut.length == 0} />
                                    {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DemoContainer components={['TimePicker']}>
                                            <TimePicker label="Select the time" name='checkOutTime'  onChange={handleChange} disabled={formData.checkOut.length == 0}/>
                                        </DemoContainer>
                                    </LocalizationProvider> */}
                                </div>
                            </div>
                            <div className='about-inner-right-form-submit'>
                                <button type="submit">Book Now</button>
                            </div>
                        </form>
                    </div>

                </div>
            </div>
        </section>
    )
}

export default Details