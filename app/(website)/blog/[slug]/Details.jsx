"use client"
import React, { useState } from 'react'
import { blogs } from '../blogs'
import Link from 'next/link'

const Details = ({ slug }) => {
    const otherBlogs = blogs.filter(blog => blog.id !== slug)
    const currentBlog = blogs.find(blog => blog.id === slug)
    const [data, setData] = useState()
    const [others, setOthers] = useState(otherBlogs)
    return (
        <section className='blog-details-section'>
            <div className="cmpad">
                <div className="blog-details-inner">
                    <div className='blog-details-inner-max'>
                        <div className="blog-other-posts">
                            <h3>Other Posts</h3>
                            <ul>
                                {others.map((blog) => (
                                    <li key={blog.id}>
                                        <Link href={`/blog/${blog.id}`}>
                                            <img src={blog.img} alt={blog.title} />
                                            <div className='list-desc'>
                                                <h4>{blog.title}</h4>
                                                <p>{blog.date}</p>
                                            </div>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="blog-details-content">
                            <img src={currentBlog?.img} alt="" />
                            <div className='blog-details-content-desc' dangerouslySetInnerHTML={{ __html: currentBlog?.description }} />
                            <div className="line-separator"></div>
                            <p className='category-point'><span>Category :</span> <span className='light'>{currentBlog?.category}</span></p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Details