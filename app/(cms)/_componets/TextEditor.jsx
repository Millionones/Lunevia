"use client";

import { useEffect, useRef } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";

export default function QuillEditor({ value, onChange }) {
  const editorRef = useRef(null);
  const quillRef = useRef(null);

  useEffect(() => {
    if (!editorRef.current) return;

    // Initialize only once
    if (!quillRef.current) {
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

      // Set initial value
      if (value) {
        quillRef.current.root.innerHTML = value;
      }

      // Listen changes
      quillRef.current.on("text-change", () => {
        const html = quillRef.current.root.innerHTML;
        onChange && onChange(html);
      });
    }
  }, []);

  return (
    <div className="border rounded-xl overflow-hidden">
      <div ref={editorRef} className="min-h-[200px]" />
    </div>
  );
}