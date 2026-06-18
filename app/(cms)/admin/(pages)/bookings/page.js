"use client";
import { get } from "@/helpers/api";
import { dateConverter, timeConverter } from "@/helpers/functions";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { put } from "../../../../../helpers/api";
import toast from "react-hot-toast";

const Bookings = () => {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    get("bookings?limit=20").then((res) => {
      setRows(res?.data || []);
    });
  };

  const updateStatus = async (id, status) => {
    try {
      const response = await put(`bookings/${id}` , { status });
      if (response.success) {
        toast.success("Booking status updated successfully");
      }
    } catch (error) {
      console.error("Error updating booking status:", error);
    }
  };

  return (
    <div className="p-4">
      <div className="overflow-x-auto border rounded-lg shadow-sm">
        <table className="min-w-full text-sm text-left whitespace-nowrap">
          <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
            <tr>
              <th className="px-2 py-2">#</th>
              <th className="px-2 py-2">Date</th>
              <th className="px-2 py-2">Name</th>
              <th className="px-2 py-2">Mobile</th>
              <th className="px-2 py-2">Email</th>
              <th className="px-2 py-2">Property</th>
              <th className="px-2 py-2">Room</th>
              <th className="px-2 py-2">No. of Guests</th>
              <th className="px-2 py-2">Adults</th>
              <th className="px-2 py-2">Children</th>
              <th className="px-2 py-2">Check-in</th>
              <th className="px-2 py-2">Check-out</th>
              <th className="px-2 py-2">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {rows.map((row, idx) => (
              <tr key={row._id} className="hover:bg-gray-50 transition-colors">
                <td className="px-2 py-2 font-sm">{idx + 1}</td>
                <td className="px-2 py-2">
                  <p className="font-sm">{dateConverter(row?.date)}</p>
                </td>
                <td className="px-2 py-2 font-sm max-w-48 text-wrap">{row?.fullName}</td>
                <td className="px-2 py-2 font-sm">
                  <Link href={`tel:${row?.mobile.startsWith("+") ? row?.mobile : `+${row?.mobile}`}`}>{row?.mobile}</Link>
                </td>
                <td className="px-2 py-2 font-sm">
                  <a href={`mailto:${row?.email}`}>{row?.email}</a>
                </td>
                <td className="px-2 py-2 font-sm max-w-48 text-wrap">
                  <Link href={`/destinations/${row?.destination?.slug}`} target="_blank">
                    {row?.destination?.title || "---"}
                  </Link>
                </td>
                <td className="px-2 py-2 font-sm max-w-48 text-wrap">
                  <Link href={`/destinations/${row?.destination?.slug}/${row?.room}#detail`} target="_blank">
                    {row?.room || "---"}
                  </Link>
                </td>
                <td className="px-2 py-2 font-sm">{row?.guestNo || "---"}</td>
                <td className="px-2 py-2 font-sm">{row?.adults || "---"}</td>
                <td className="px-2 py-2 font-sm">{row?.childrens || "---"}</td>
                <td className="px-2 py-2">
                  <p className="font-sm">{dateConverter(row?.checkIn)}</p>
                  <p className="font-sm">{timeConverter(row?.checkInTime)}</p>
                </td>
                <td className="px-2 py-2">
                  <p className="font-sm">{dateConverter(row?.checkOutDate)}</p>
                  <p className="font-sm">{timeConverter(row?.checkOutTime)}</p>
                </td>
                <td className="px-2 py-2">
                  <select className="border rounded-lg p-2.5" onChange={(e) => updateStatus(row._id, e.target.value)}>
                    <option value="0" selected={row?.status === 0}>Pending</option>
                    <option value="1" selected={row?.status === 1}>Confirmed</option>
                    <option value="2" selected={row?.status === 2}>Cancelled</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Bookings;
