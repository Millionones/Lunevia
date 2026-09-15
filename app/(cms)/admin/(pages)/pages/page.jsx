"use client";
import React from "react";
import Link from "next/link";
import { ChevronRight, FileText } from "lucide-react";
import { CMS_PAGES } from "@/helpers/pageDefaults";

// Index of CMS-managed website pages. Each opens a per-page content editor.
const PagesIndex = () => {
  return (
    <div className="p-4">
      <div className="mb-6">
        <h1 className="text-xl font-semibold">Website Pages</h1>
        <p className="text-sm text-gray-500 mt-1">
          Edit each page&apos;s banner image, headings and copy. Blank fields fall back to the
          site&apos;s current content, so nothing ever breaks.
        </p>
      </div>

      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {CMS_PAGES.map((p) => (
          <li key={p.slug}>
            <Link
              href={`/admin/pages/${p.slug}`}
              className="flex items-center justify-between gap-3 rounded-lg border bg-white p-4 shadow-sm transition hover:shadow-md hover:border-gray-300"
            >
              <span className="flex items-center gap-3">
                <FileText size={20} className="text-gray-500" />
                <span className="font-medium">{p.label}</span>
              </span>
              <ChevronRight size={18} className="text-gray-400" />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PagesIndex;
