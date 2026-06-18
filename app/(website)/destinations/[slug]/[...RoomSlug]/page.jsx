import React from 'react'
import Hero from '../Hero'
import '../style.css'
import Details from './Details'
import Gallery from './Gallery'
import { API_URL } from '../../../../../config'

const page = async ({ params }) => {
    const { slug, RoomSlug } = await params
    console.log(slug, RoomSlug)

    const fetchRoomDetails = async () => {
        try {
            const response = await fetch(`${API_URL}website/room/details?slug=${slug}&roomSlug=${RoomSlug[0]}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            return response;
        } catch (error) {
            console.error('Error fetching blog:', error);
            return null;
        }
    };

    let data = await fetchRoomDetails();
    let roomData = await data.json();
    roomData = roomData.data
    console.log('roomData', roomData)

    const heroData = { title: roomData.title, mainImage: roomData.mainImage }
    const roomDetails = roomData.roomDetails[0]
    return (
        <>
            <Hero data={heroData}/>
            <Details slug={slug} data={roomDetails}/>
            {/* <Gallery slug={slug}/> */}
        </>
    )
}

export default page