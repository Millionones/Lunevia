"use client";

import React, { useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Loader, Plus, GripVertical } from "lucide-react";
import toast from "react-hot-toast";
import { uploadImage } from "@/helpers/uploadImage";

// Reusable multi-image gallery manager for the CMS. Shows the current images as a
// preview grid where each tile can be removed (✕) and reordered by drag-and-drop,
// and lets the user add several images at once (client-side downscale + real error
// messages via the shared uploader). When `value` is empty and `defaults` are
// provided, it surfaces the site's live default images with a "Customize" button
// that copies them into the editable list.
//
// Props:
//   value            array of image URL strings (the managed list)
//   onChange(next)   receives the new array
//   folder           upload destination folder (default "pages")
//   defaults         array of URLs shown/seeded when value is empty
//   onUploadingChange(bool)  lets the parent lock Save while uploads are in flight
//   addLabel         label for the add button (default "Add image")
const GalleryImages = ({
  value,
  onChange,
  folder = "pages",
  defaults = [],
  onUploadingChange,
  addLabel = "Add image",
}) => {
  const images = Array.isArray(value) ? value : [];
  const [uploadingCount, setUploadingCount] = useState(0);
  const [dragOver, setDragOver] = useState(null); // index the dragged tile is over
  const dragIndex = useRef(null);
  const inputRef = useRef(null);

  const setBusy = (delta) => {
    setUploadingCount((c) => {
      const next = Math.max(0, c + delta);
      onUploadingChange?.(next > 0);
      return next;
    });
  };

  const handleFiles = async (e) => {
    const files = Array.from(e.target.files || []);
    // Reset so re-picking the same files still fires onChange.
    e.target.value = "";
    if (!files.length) return;

    const uploaded = [];
    for (const file of files) {
      setBusy(1);
      try {
        const url = await uploadImage(file, folder);
        uploaded.push(url);
      } catch (err) {
        toast.error(err?.message || "Image upload failed");
      } finally {
        setBusy(-1);
      }
    }
    if (uploaded.length) onChange([...images, ...uploaded]);
  };

  const removeAt = (i) => onChange(images.filter((_, idx) => idx !== i));

  const moveItem = (from, to) => {
    if (from === to || from == null || to == null) return;
    const next = [...images];
    const [moved] = next.splice(from, 1);
    next.splice(to, 0, moved);
    onChange(next);
  };

  const onDrop = (to) => {
    moveItem(dragIndex.current, to);
    dragIndex.current = null;
    setDragOver(null);
  };

  const busy = uploadingCount > 0;

  const AddButton = (
    <>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={handleFiles}
        disabled={busy}
      />
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        disabled={busy}
        className="inline-flex items-center gap-1 rounded-md bg-blue-600 px-3 py-1.5 text-xs text-white hover:bg-blue-700 disabled:opacity-60"
      >
        <Plus size={14} /> {addLabel}
      </button>
    </>
  );

  return (
    <div>
      {/* Empty + defaults available → show the live defaults with a Customize CTA. */}
      {images.length === 0 && defaults.length > 0 ? (
        <div className="rounded-md border border-dashed border-gray-300 p-3 dark:border-neutral-700">
          <p className="mb-2 text-xs text-gray-500 dark:text-neutral-400">
            Currently showing the site's default gallery images. Add your own below, or customize these.
          </p>
          <div className="flex flex-wrap gap-2 opacity-70">
            {defaults.map((img, i) => (
              <img
                key={i}
                src={img}
                alt=""
                className="h-20 w-20 rounded-md border object-cover dark:border-neutral-700"
              />
            ))}
          </div>
          <div className="mt-3 flex items-center gap-3">
            <button
              type="button"
              onClick={() => onChange([...defaults])}
              className="inline-flex items-center gap-1 rounded-md border border-gray-300 px-3 py-1.5 text-xs font-medium hover:bg-gray-50 dark:border-neutral-700 dark:hover:bg-neutral-800"
            >
              Customize these images
            </button>
            {AddButton}
            {busy && (
              <span className="flex items-center gap-1 text-xs text-gray-500 dark:text-neutral-400">
                <Loader size={14} className="animate-spin" /> Uploading…
              </span>
            )}
          </div>
        </div>
      ) : (
        <>
          <div className="mb-2 flex items-center gap-3">
            {AddButton}
            {images.length > 1 && (
              <span className="text-xs text-gray-400 dark:text-neutral-500">Drag to reorder</span>
            )}
            {busy && (
              <span className="flex items-center gap-1 text-xs text-gray-500 dark:text-neutral-400">
                <Loader size={14} className="animate-spin" /> Uploading…
              </span>
            )}
          </div>

          {images.length === 0 ? (
            <p className="text-xs text-gray-400 dark:text-neutral-500">No images yet.</p>
          ) : (
            <div className="flex flex-wrap gap-3">
              {images.map((img, i) => (
                <div
                  key={i}
                  draggable
                  onDragStart={() => {
                    dragIndex.current = i;
                  }}
                  onDragOver={(e) => {
                    e.preventDefault();
                    if (dragOver !== i) setDragOver(i);
                  }}
                  onDragLeave={() => setDragOver((d) => (d === i ? null : d))}
                  onDrop={() => onDrop(i)}
                  onDragEnd={() => {
                    dragIndex.current = null;
                    setDragOver(null);
                  }}
                  className={`group relative cursor-grab rounded-lg active:cursor-grabbing ${
                    dragOver === i ? "ring-2 ring-blue-500" : ""
                  }`}
                >
                  <img
                    src={img}
                    alt=""
                    className="h-28 w-28 rounded-lg border object-cover dark:border-neutral-700"
                  />
                  <span className="absolute bottom-1 left-1 flex h-5 w-5 items-center justify-center rounded bg-black/50 text-white opacity-0 transition group-hover:opacity-100">
                    <GripVertical size={13} />
                  </span>
                  <button
                    type="button"
                    onClick={() => removeAt(i)}
                    disabled={busy}
                    aria-label="Remove image"
                    className="absolute right-1 top-1 rounded bg-red-500 px-1 text-xs text-white hover:bg-red-600 disabled:opacity-50"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default GalleryImages;
