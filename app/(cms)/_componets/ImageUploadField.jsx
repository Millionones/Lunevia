"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Loader } from "lucide-react";
import toast from "react-hot-toast";
import { uploadImage } from "@/helpers/uploadImage";

// Reusable single-image field for the CMS. Shows a preview + Remove + Replace,
// manages its own uploading state, and uses the shared uploader (client-side
// downscale + real error messages). `value` is the stored image URL; `onChange`
// receives the new URL (or "" when removed). `onUploadingChange(bool)` lets the
// parent lock its Save button while an upload is in flight.
const ImageUploadField = ({
  value,
  onChange,
  folder,
  className = "",
  onUploadingChange,
}) => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const setBusy = (busy) => {
    setUploading(busy);
    onUploadingChange?.(busy);
  };

  const handleFile = async (e) => {
    const file = e.target.files?.[0];
    // Reset so re-picking the same file still fires onChange.
    e.target.value = "";
    if (!file) return;

    setError("");
    setBusy(true);
    try {
      const url = await uploadImage(file, folder);
      onChange(url);
    } catch (err) {
      // The old image (if any) stays untouched on failure. Show the REAL reason
      // inline and persistently — a transient toast gets masked by the form's
      // misleading "… image is required" validation message.
      const message = err?.message || "Image upload failed";
      setError(message);
      toast.error(message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className={className}>
      {value ? (
        <div className="w-fit">
          <div className="relative w-fit">
            <img
              src={value}
              alt=""
              className="w-48 h-48 object-cover rounded-lg border"
            />
            <button
              type="button"
              onClick={() => onChange("")}
              disabled={uploading}
              className="absolute top-0 right-0 bg-red-500 text-white text-xs px-1 rounded disabled:opacity-50"
            >
              ✕
            </button>
          </div>

          <label className="mt-2 inline-block text-sm text-blue-600 cursor-pointer">
            {uploading ? "Uploading…" : "Replace image"}
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFile}
              disabled={uploading}
            />
          </label>
        </div>
      ) : (
        <Input
          type="file"
          accept="image/*"
          onChange={handleFile}
          disabled={uploading}
        />
      )}

      {uploading && (
        <p className="text-sm text-gray-500 mt-1 flex items-center gap-1">
          <Loader size={14} className="animate-spin" /> Uploading…
        </p>
      )}

      {error && !uploading && (
        <p className="text-sm text-red-600 mt-1">{error}</p>
      )}
    </div>
  );
};

export default ImageUploadField;
