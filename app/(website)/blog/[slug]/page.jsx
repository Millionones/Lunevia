import React from 'react'
import Hero from './Hero'

import '../styles.css'
import Details from './Details'
import { API_URL } from '../../../../config'

const page = async ({ params }) => {
    const { slug } = await params

    const fetchBlog = async () => {
        try {
            const response = await fetch(`${API_URL}website/blogs/${slug}`, {
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

    let data = await fetchBlog();
    const blogData = await data.json();
    return (
        <>
            <Hero slug={slug} data={blogData.data} />
            <Details slug={slug} data={blogData.data} />
        </>
    )
}

export default page