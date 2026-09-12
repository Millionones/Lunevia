import React from 'react'
import { notFound } from 'next/navigation'
import Hero from '../Hero'
import '../style.css'
import Details from './Details'
import Gallery from './Gallery'
import { serverGet } from '@/helpers/serverApi'

export const revalidate = 3600

const page = async ({ params }) => {
    const { slug, RoomSlug } = await params

    const res = await serverGet(`website/room/details?slug=${slug}&roomSlug=${RoomSlug[0]}`)
    const roomData = res?.data

    if (!roomData || !roomData.roomDetails?.length) {
        notFound()
    }

    const heroData = { title: roomData.title, mainImage: roomData.mainImage }
    const roomDetails = roomData.roomDetails[0]
    return (
        <>
            <Hero data={heroData}/>
            <Details slug={slug} data={roomDetails}/>
            <Gallery slug={RoomSlug[0]} title={roomData.title}/>
        </>
    )
}

export default page
