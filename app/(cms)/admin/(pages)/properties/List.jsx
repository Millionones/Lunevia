"use client"
import React, { useEffect, useState } from 'react'
import { del, get, post, put } from "@/helpers/api";
import { BASE_URL } from "@/config";
import toast from "react-hot-toast";
import { Pencil, Trash2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import Swal from "sweetalert2";
import Link from 'next/link';

const List = () => {
    const [data, setData] = useState([])

    const fetchProperties = () => {
        get('destination').then((res) => {
            setData(res.data)
        })
    }

    useEffect(() => {
        fetchProperties()
    }, [])

    const handleDelete = (slug) => {
        Swal.fire({
            title: "Are you sure?",
            text: "This will permanently delete the entry.",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                del(`destination/${slug}`).then((res) => {
                    toast.success(res.message);
                    fetchProperties();
                });
            }
        });
    };

    const handleEdit = (item) => {

    };
    return (
        <>
            <div className="flex justify-end w-full py-2">
                <Link href="/admin/properties/create">
                    <Button type="button">Create</Button>
                </Link>
            </div>
            <div className="overflow-x-auto border rounded-lg shadow-sm">
                <table className="min-w-full text-sm text-left whitespace-nowrap">
                    <thead className="bg-gray-100 text-gray-700 uppercase text-sm border-b-[1px]">
                        <tr>
                            <th className="px-4 py-5">Title</th>
                            <th className="px-4 py-5">Main Image</th>
                            <th className="px-4 py-5">Location</th>
                            <th className="px-4 py-5">Status</th>
                            <th className="px-4 py-5">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {data?.map((row) => (
                            <tr key={row._id}>
                                <td className="px-4 py-2">
                                    <p className='text-black text-sm'>{row.title}</p>
                                </td>
                                <td className="px-4 py-2">
                                    <img className='max-w-[50px]' src={`${row.mainImage}`} alt="" />
                                </td>
                                <td className="px-4 py-2">
                                    <p className='text-black text-sm'></p>
                                </td>
                                <td className="px-4 py-2">
                                    <Button size="xs" variant={row.status == 0 ? "default" : "destructive"} className=''>
                                        {row.status == 0 ? "Active" : row.status == 1 ? "In Active" : ""}
                                    </Button>
                                </td>
                                <td className="px-4 py-2">
                                    <div className='flex gap-2'>
                                        <Link href={`/admin/properties/${row.slug}`}>
                                            <span className="cursor-pointer">
                                                <Pencil size={18} />
                                            </span>
                                        </Link>
                                        <span className="cursor-pointer" onClick={() => handleDelete(row.slug)}>
                                            <Trash2 size={18} />
                                        </span>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default List