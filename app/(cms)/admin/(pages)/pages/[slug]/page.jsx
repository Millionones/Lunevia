"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useFormik, getIn } from "formik";
import Link from "next/link";
import { ArrowLeft, Plus, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { get, post } from "@/helpers/api";
import { PAGE_DEFAULTS, mergeContent, CMS_PAGES } from "@/helpers/pageDefaults";
import { PAGE_SCHEMA, blankItem } from "@/helpers/pageSchema";
import ImageUpload from "../ImageUpload";

// ---- generic field renderers -------------------------------------------------

function TextField({ field, formik, path }) {
  const Cmp = field.type === "textarea" ? Textarea : Input;
  return (
    <div className={field.type === "textarea" ? "col-span-full" : ""}>
      {field.label ? <label className="mb-1 block text-sm font-medium">{field.label}</label> : null}
      <Cmp
        name={path}
        placeholder={field.placeholder || field.label}
        value={getIn(formik.values, path) ?? ""}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
    </div>
  );
}

function StringList({ field, formik, path }) {
  const arr = getIn(formik.values, path) || [];
  const set = (next) => formik.setFieldValue(path, next);
  return (
    <div className="col-span-full">
      <div className="mb-2 flex items-center justify-between">
        <label className="text-sm font-medium">{field.label}</label>
        <button
          type="button"
          onClick={() => set([...arr, ""])}
          className="inline-flex items-center gap-1 rounded-md bg-blue-600 px-3 py-1 text-xs text-white hover:bg-blue-700"
        >
          <Plus size={14} /> {field.addLabel || "Add"}
        </button>
      </div>
      <div className={field.kind === "image" ? "grid grid-cols-2 gap-3 sm:grid-cols-3" : "space-y-3"}>
        {arr.map((val, i) => (
          <div key={i} className="rounded-md border p-3">
            {field.kind === "image" ? (
              <ImageUpload label="" value={val} onChange={(url) => formik.setFieldValue(`${path}.${i}`, url)} />
            ) : field.kind === "textarea" ? (
              <Textarea value={val ?? ""} onChange={(e) => formik.setFieldValue(`${path}.${i}`, e.target.value)} />
            ) : (
              <Input value={val ?? ""} onChange={(e) => formik.setFieldValue(`${path}.${i}`, e.target.value)} />
            )}
            <button
              type="button"
              onClick={() => set(arr.filter((_, idx) => idx !== i))}
              className="mt-2 inline-flex items-center gap-1 text-xs text-red-600 hover:text-red-800"
            >
              <Trash2 size={14} /> Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function ObjectList({ field, formik, path }) {
  const arr = getIn(formik.values, path) || [];
  const set = (next) => formik.setFieldValue(path, next);
  return (
    <div className="col-span-full">
      <div className="mb-2 flex items-center justify-between">
        <label className="text-sm font-medium">{field.label}</label>
        <button
          type="button"
          onClick={() => set([...arr, blankItem(field.itemFields)])}
          className="inline-flex items-center gap-1 rounded-md bg-blue-600 px-3 py-1 text-xs text-white hover:bg-blue-700"
        >
          <Plus size={14} /> {field.addLabel || "Add"}
        </button>
      </div>
      <div className="space-y-4">
        {arr.map((_, i) => (
          <div key={i} className="rounded-md border bg-gray-50 p-3">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-xs font-medium text-gray-500">#{i + 1}</span>
              <button
                type="button"
                onClick={() => set(arr.filter((_, idx) => idx !== i))}
                className="text-red-600 hover:text-red-800"
                aria-label="Remove"
              >
                <Trash2 size={16} />
              </button>
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {field.itemFields.map((sub) => (
                <Field key={sub.name} field={sub} formik={formik} path={`${path}.${i}.${sub.name}`} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Field({ field, formik, path }) {
  if (field.type === "image") {
    return (
      <ImageUpload
        label={field.label}
        value={getIn(formik.values, path)}
        onChange={(url) => formik.setFieldValue(path, url)}
      />
    );
  }
  if (field.type === "stringlist") return <StringList field={field} formik={formik} path={path} />;
  if (field.type === "list") return <ObjectList field={field} formik={formik} path={path} />;
  return <TextField field={field} formik={formik} path={path} />;
}

// ---- page ---------------------------------------------------------------------

export default function PageEditor() {
  const params = useParams();
  const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug;
  const defaults = PAGE_DEFAULTS[slug];
  const schema = PAGE_SCHEMA[slug];
  const meta = CMS_PAGES.find((p) => p.slug === slug);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const formik = useFormik({
    initialValues: defaults || {},
    onSubmit: (values) => {
      setSaving(true);
      post("page-content", { page: slug, content: values })
        .then((res) => toast.success(res.message || "Saved"))
        .catch((err) => toast.error(err?.response?.data?.message || err?.message))
        .finally(() => setSaving(false));
    },
  });

  useEffect(() => {
    if (!defaults) {
      setLoading(false);
      return;
    }
    let active = true;
    get(`page-content/${slug}`)
      .then((res) => {
        if (!active) return;
        formik.setValues(mergeContent(defaults, res?.data?.content || {}));
      })
      .catch(() => {})
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  if (!defaults || !schema) {
    return (
      <div className="p-6">
        <p className="text-sm text-red-600">Unknown page: {slug}</p>
        <Link href="/admin/pages" className="text-sm text-blue-600 underline">
          Back to pages
        </Link>
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="mb-6 flex items-center gap-3">
        <Link href="/admin/pages" className="text-gray-500 hover:text-black">
          <ArrowLeft size={20} />
        </Link>
        <h1 className="text-xl font-semibold">{meta?.label || slug}</h1>
      </div>

      {loading ? (
        <p className="text-sm text-gray-500">Loading…</p>
      ) : (
        <form onSubmit={formik.handleSubmit} className="max-w-4xl space-y-8">
          {schema.map((group, gi) => (
            <section key={gi} className="rounded-lg border bg-white p-5 shadow-sm">
              <h2 className="mb-1 text-base font-semibold">{group.label}</h2>
              {group.help ? <p className="mb-4 text-xs text-gray-500">{group.help}</p> : <div className="mb-4" />}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {group.fields.map((field) => (
                  <Field key={field.name} field={field} formik={formik} path={field.name} />
                ))}
              </div>
            </section>
          ))}

          <div className="flex items-center gap-3">
            <button
              type="submit"
              disabled={saving}
              className="rounded-md bg-blue-600 px-5 py-2 text-white transition hover:bg-blue-700 disabled:opacity-60"
            >
              {saving ? "Saving…" : "Save changes"}
            </button>
            <Link href="/admin/pages" className="text-sm text-gray-500 hover:text-black">
              Cancel
            </Link>
          </div>
        </form>
      )}
    </div>
  );
}
