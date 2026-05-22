"use client"
import Link from 'next/link'
import React from 'react'
import { blogs } from './blogs'

const List = () => {

    const [data, setData] = React.useState(blogs)

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
                                <li className='blog-grid-card' key={blog.id}>
                                    <Link href={`/blog/${blog.id}`}>
                                        <div className='blog-card-media'>
                                            <img src={blog.img} alt="" />
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