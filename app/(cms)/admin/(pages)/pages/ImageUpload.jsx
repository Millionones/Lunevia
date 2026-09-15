"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { post } from "@/helpers/api";
import toast from "react-hot-toast";

// Uploads to the shared /common/image/pages endpoint and returns the stored
// Supabase URL via onChange. Mirrors the testimonial/blogs upload flow.
export default function ImageUpload({ label = "Image", value, onChange }) {
  const [uploading, setUploading] = useState(false);

  const handle = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const fd = new FormData();
    fd.append("image", file);
    setUploading(true);
    try {
      const res = await post("common/image/pages", fd);
      onChange(res.data?.new_filename || res.data?.url || "");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Image upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      {label ? <label className="block mb-1 text-sm font-medium">{label}</label> : null}
      <Input type="file" accept="image/*" onChange={handle} />
      {uploading ? <p className="mt-1 text-xs text-gray-500">Uploading…</p> : null}
      {value ? (
        <img src={value} alt="" className="mt-2 h-20 w-28 rounded-md border object-cover" />
      ) : null}
    </div>
  );
}
