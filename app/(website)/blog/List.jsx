"use client"
import Link from 'next/link'
import React, { useEffect } from 'react'
import { blogs } from './blogs'
import { get } from "@/helpers/api";
import { BASE_URL } from '../../../config';

const List = () => {

    const [data, setData] = React.useState(blogs)
    const fetchBlogs = async () => {
        try {
            const response = await get('website/blogs?limit=6');
            setData(response.data);
        } catch (error) {
            console.error('Error fetching blogs:', error);
        }
    };

    useEffect(() => {
        fetchBlogs();
    }, []);
    return (
        <section className='blog-list-section'>
            <div className='cmpad'>
                <div className='blog-list-inner'>
                    <div className='blog-list-header'>
                        <h5>Blog</h5>
                        <h2>Insights on Luxury <br /> Resort Living</h2>
                    </div>

                    <div>
                        <ul className='blog-list-grid'>
                            {data.map((blog) => (
                                <li className='blog-grid-card' key={blog._id}>
                                    <Link href={`/blog/${blog.slug}`}>
                                        <div className='blog-card-media'>
                                            <img src={blog.image} alt="" />
                                        </div>
                                        <div className='blog-card-detail'>
                                            <div className='blog-card-meta'>
                                                <p>{blog.date}</p>
                                                <p>{blog.category}</p>
                                            </div>
                                            <h4>{blog.title}</h4>
                                            {/* <p className='blog-desc'>{blog.description}</p>  */}
                                        </div>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default List