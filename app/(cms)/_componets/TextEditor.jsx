"use client";

import { useEffect, useRef } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";

export default function QuillEditor({ value, onChange }) {
  const editorRef = useRef(null);
  const quillRef = useRef(null);

  // Initialize Quill
  useEffect(() => {
    if (!editorRef.current || quillRef.current) return;

    quillRef.current = new Quill(editorRef.current, {
      theme: "snow",
      placeholder: "Write your description...",
      modules: {
        toolbar: [
          [{ header: [1, 2, false] }],
          ["bold", "italic", "underline"],
          [{ list: "ordered" }, { list: "bullet" }],
          ["link"],
          ["clean"],
        ],
      },
    });

    quillRef.current.on("text-change", () => {
      const html = quillRef.current.root.innerHTML;

      onChange?.(
        html === "<p><br></p>" ? "" : html
      );
    });
  }, []);

  // Sync external value with Quill
  useEffect(() => {
    if (!quillRef.current) return;

    const currentHtml = quillRef.current.root.innerHTML;

    if (value !== currentHtml) {
      quillRef.current.root.innerHTML = value || "";
    }
  }, [value]);

  return (
    <div className="border rounded-xl overflow-hidden">
      <div ref={editorRef} className="min-h-[200px]" />
    </div>
  );
}