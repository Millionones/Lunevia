"use client"
import React, { useEffect, useState } from 'react'
import { blogs } from '../blogs'
import Link from 'next/link'
import { BASE_URL } from '../../../../config'
import { get } from '../../../../helpers/api'

const Details = ({ slug, data }) => {
   
    const [others, setOthers] = useState([])
    console.log(data, "BLOG DATA IN DETAILS")

    const fetchOtherBlogs = async () => {
        const response = await get(`website/blogs?limit=6&exclude=${slug}`);
        if (response && response.data) {
            setOthers(response.data);
        } else setOthers([])
    }

    useEffect(() => {
        fetchOtherBlogs();
    }, [slug]);
    return (
        <section className='blog-details-section'>
            <div className="cmpad">
                <div className="blog-details-inner">
                    <div className='blog-details-inner-max'>
                        {
                            others.length > 0 ? (
                                <div className="blog-other-posts">
                                    <h3>Other Posts</h3>
                                    <ul>
                                        {others.map((blog) => (
                                            <li key={blog.id}>
                                                <Link href={`/blog/${blog.slug}`}>
                                                    <img src={blog.image} alt={blog.title} />
                                                    <div className='list-desc'>
                                                        <h4>{blog.title}</h4>
                                                        <p>{blog.date}</p>
                                                    </div>
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )
                                :
                                <></>
                        }
                        <div className="blog-details-content">
                            <img src={data?.image} alt="" />
                            <div className='blog-details-content-desc' dangerouslySetInnerHTML={{ __html: data?.description }} />
                            <div className="line-separator"></div>
                            <p className='category-point'><span>Category :</span> <span className='light'>{data?.category}</span></p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Details