"use client";

import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

import { Input } from "@/components/ui/input";
import QuillEditor from "../../../../_componets/TextEditor";
import ImageUploadField from "../../../../_componets/ImageUploadField";

import Autocomplete, {
    createFilterOptions,
} from "@mui/material/Autocomplete";

import { Button } from "@/components/ui/button";
import TextField from "@mui/material/TextField";

import { get, post } from "@/helpers/api";
import { uploadImage as uploadImageApi } from "@/helpers/uploadImage";

import { Trash2, Loader } from "lucide-react";

import toast from "react-hot-toast";

const filter = createFilterOptions();

// VALIDATION
const validationSchema = Yup.object({
    title: Yup.string().trim().required("Title is required"),

    mainImage: Yup.string().required("Banner image is required"),

    locationLink: Yup.string()
        .matches(/^https?:\/\/.+/, "Enter valid URL")
        .required("Location link is required"),

    aboutProperty: Yup.object({
        image: Yup.string().required("About image is required"),
        description: Yup.string().required("Description is required"),
    }),

    galleryImages: Yup.array(),
});

const PropertyDetails = ({ updateData, existData }) => {
    const [highlights, setHighlights] = useState([""]);
    const [highlightsOptions, setHighlightsOptions] = useState([]);
    const [galleryPreview, setGalleryPreview] = useState([]);
    const [loading, setLoading] = useState(false);

    // Number of image uploads currently in flight across all fields — Save is
    // locked while any are running so a half-uploaded form can't be submitted.
    const [uploadsInFlight, setUploadsInFlight] = useState(0);
    const trackUploading = (busy) =>
        setUploadsInFlight((n) => Math.max(0, n + (busy ? 1 : -1)));

    // FORM
    const formik = useFormik({
        enableReinitialize: true,

        initialValues: {
            title: existData?.step1?.title || "",
            mainImage: existData?.step1?.mainImage || "",
            locationLink: existData?.step1?.locationLink || "",
            aboutProperty: {
                image: existData?.step1?.aboutProperty?.image || "",
                description:
                    existData?.step1?.aboutProperty?.description || "",
                highlights:
                    existData?.step1?.aboutProperty?.highlights || [],
            },
            galleryImages: existData?.step1?.galleryImages || [],
        },

        validationSchema,

        onSubmit: async (values) => {
            try {
                const payload = {
                    ...values,
                    aboutProperty: {
                        ...values.aboutProperty,
                        highlights: highlights
                            .filter(Boolean)
                            .map((h) => h._id),
                    },
                };

                updateData(payload);

                toast.success("Property details saved");
            } catch (err) {
                toast.error(err.message);
            }
        },
    });

    useEffect(() => {
        fetchHighlightsOpts();
    }, []);

    // LOAD EXISTING DATA (single-image previews are derived from the form value
    // by ImageUploadField; here we only seed the loading state and gallery list).
    useEffect(() => {
        if (existData?.step1) {
            setLoading(true);
            setTimeout(() => setLoading(false), 1000);

            if (existData.step1.galleryImages?.length > 0) {
                setGalleryPreview(
                    existData.step1.galleryImages.map((item) => `${item}`)
                );
            }
        }
    }, [existData]);

    // ADD HIGHLIGHT
    const addHighlight = () => {
        setHighlights((prev) => [...prev, ""]);
    };

    // REMOVE HIGHLIGHT
    const removeHighlight = (index) => {
        const updated = highlights.filter((_, i) => i !== index);
        setHighlights(updated);
        formik.setFieldValue("aboutProperty.highlights", updated);
    };

    // GALLERY CHANGE — uses the shared uploader (client downscale + real errors)
    // and locks Save while uploads run.
    const handleGalleryChange = async (e) => {
        const files = Array.from(e.target.files || []);
        e.target.value = "";
        if (!files.length) return;

        trackUploading(true);
        try {
            const uploadedPaths = [];
            for (let file of files) {
                const url = await uploadImageApi(file, "gallery");
                uploadedPaths.push(url);
            }

            formik.setFieldValue("galleryImages", [
                ...formik.values.galleryImages,
                ...uploadedPaths,
            ]);

            setGalleryPreview((prev) => [...prev, ...uploadedPaths]);
        } catch (err) {
            toast.error(err?.message || "Gallery upload failed");
        } finally {
            trackUploading(false);
        }
    };

    // REMOVE GALLERY IMAGE
    const removeGalleryImage = (index) => {
        const updatedImages = formik.values.galleryImages.filter(
            (_, i) => i !== index
        );
        const updatedPreview = galleryPreview.filter((_, i) => i !== index);

        formik.setFieldValue("galleryImages", updatedImages);
        setGalleryPreview(updatedPreview);
    };

    // FETCH HIGHLIGHTS
    const fetchHighlightsOpts = async () => {
        try {
            const res = await get(`common/property-highlights`);

            setHighlightsOptions(res.data);

            if (existData?.step1?.aboutProperty?.highlights) {
                let data = res.data.filter((option) =>
                    existData.step1.aboutProperty.highlights.includes(
                        option._id
                    )
                );

                setHighlights(data);
                formik.setFieldValue("aboutProperty.highlights", data);
            }
        } catch (err) {
            toast.error("Failed to fetch highlights");
        }
    };

    return (
        <>
            {loading ? (
                <div className="w-full h-screen flex justify-center items-center">
                    <Loader size={32} />
                </div>
            ) : (
                <form
                    onSubmit={formik.handleSubmit}
                    className="p-6 space-y-8 max-w-4xl mx-auto"
                >
                    <div className="border p-4 rounded bg-white flex flex-col gap-5 border-white">
                        {/* TITLE + MAIN IMAGE */}
                        <div className="grid grid-cols-2 gap-4">
                            {/* TITLE */}
                            <div>
                                <label>Title</label>

                                <Input
                                    name="title"
                                    placeholder="Title"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.title}
                                />

                                {formik.touched.title &&
                                    formik.errors.title && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {formik.errors.title}
                                        </p>
                                    )}
                            </div>

                            {/* MAIN IMAGE */}
                            <div>
                                <label>Banner Image</label>

                                <ImageUploadField
                                    value={formik.values.mainImage}
                                    folder="destination"
                                    onUploadingChange={trackUploading}
                                    onChange={(url) => {
                                        formik.setFieldValue("mainImage", url);
                                        formik.setFieldTouched(
                                            "mainImage",
                                            true
                                        );
                                    }}
                                />

                                {formik.touched.mainImage &&
                                    formik.errors.mainImage && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {formik.errors.mainImage}
                                        </p>
                                    )}
                            </div>

                            {/* LOCATION LINK */}
                            <div className="col-span-2">
                                <label>Location Link</label>

                                <Input
                                    name="locationLink"
                                    placeholder="Google map link"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.locationLink}
                                />

                                {formik.touched.locationLink &&
                                    formik.errors.locationLink && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {formik.errors.locationLink}
                                        </p>
                                    )}
                            </div>
                        </div>

                        {/* ABOUT PROPERTY */}
                        <h2 className="font-bold text-lg">About Property</h2>

                        <div className="border p-4 rounded border-gray-300">
                            {/* ABOUT IMAGE */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label>About Image</label>

                                    <ImageUploadField
                                        value={
                                            formik.values.aboutProperty?.image
                                        }
                                        folder="about-property"
                                        onUploadingChange={trackUploading}
                                        onChange={(url) => {
                                            formik.setFieldValue(
                                                "aboutProperty.image",
                                                url
                                            );
                                            formik.setFieldTouched(
                                                "aboutProperty.image",
                                                true
                                            );
                                        }}
                                    />

                                    {formik.touched.aboutProperty?.image &&
                                        formik.errors.aboutProperty?.image && (
                                            <p className="text-red-500 text-sm mt-1">
                                                {
                                                    formik.errors.aboutProperty
                                                        .image
                                                }
                                            </p>
                                        )}
                                </div>
                            </div>

                            {/* DESCRIPTION */}
                            <div className="mt-4">
                                <QuillEditor
                                    value={
                                        formik.values.aboutProperty.description
                                    }
                                    onChange={(val) => {
                                        formik.setFieldValue(
                                            "aboutProperty.description",
                                            val
                                        );
                                        formik.setFieldTouched(
                                            "aboutProperty.description",
                                            true
                                        );
                                    }}
                                />

                                {formik.touched.aboutProperty?.description &&
                                    formik.errors.aboutProperty
                                        ?.description && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {
                                                formik.errors.aboutProperty
                                                    .description
                                            }
                                        </p>
                                    )}
                            </div>

                            {/* HIGHLIGHTS */}
                            <h4 className="font-bold mt-4">
                                Property Highlights
                            </h4>

                            <div className="grid grid-cols-2 gap-4">
                                {highlights.map((item, index) => (
                                    <div
                                        key={index}
                                        className="flex gap-2.5 items-center mt-2"
                                    >
                                        <Autocomplete
                                            className="w-full"
                                            value={item || null}
                                            onChange={async (
                                                event,
                                                newValue
                                            ) => {
                                                let updated = [...highlights];

                                                if (
                                                    typeof newValue === "string"
                                                ) {
                                                    updated[index] = {
                                                        name: newValue,
                                                    };
                                                } else if (
                                                    newValue?.inputValue
                                                ) {
                                                    const newItem = {
                                                        name: newValue.inputValue,
                                                    };

                                                    try {
                                                        const res = await post(
                                                            "common/property-highlights",
                                                            newItem
                                                        );

                                                        const savedItem =
                                                            res?.data;

                                                        setHighlightsOptions(
                                                            (prev) => [
                                                                ...prev,
                                                                savedItem,
                                                            ]
                                                        );

                                                        updated[index] =
                                                            savedItem;
                                                    } catch (err) {
                                                        toast.error(
                                                            "Failed to create highlight"
                                                        );
                                                        return;
                                                    }
                                                } else {
                                                    updated[index] = newValue;
                                                }

                                                setHighlights(updated);

                                                formik.setFieldValue(
                                                    "aboutProperty.highlights",
                                                    updated
                                                );

                                                formik.setFieldTouched(
                                                    "aboutProperty.highlights",
                                                    true
                                                );
                                            }}
                                            filterOptions={(options, params) => {
                                                const filtered = filter(
                                                    options,
                                                    params
                                                );

                                                const { inputValue } = params;

                                                const isExisting = options.some(
                                                    (o) =>
                                                        o.name.toLowerCase() ===
                                                        inputValue.toLowerCase()
                                                );

                                                if (
                                                    inputValue !== "" &&
                                                    !isExisting
                                                ) {
                                                    filtered.push({
                                                        inputValue,
                                                        name: `Add "${inputValue}"`,
                                                    });
                                                }

                                                return filtered;
                                            }}
                                            options={highlightsOptions}
                                            getOptionLabel={(option) => {
                                                if (typeof option === "string")
                                                    return option;

                                                if (option?.inputValue)
                                                    return option.inputValue;

                                                return option?.name || "";
                                            }}
                                            isOptionEqualToValue={(
                                                option,
                                                value
                                            ) => option?._id === value?._id}
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    label="Highlight"
                                                />
                                            )}
                                            freeSolo
                                        />

                                        {/* DELETE */}
                                        {highlights.length > 1 && (
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    removeHighlight(index)
                                                }
                                            >
                                                <Trash2 />
                                            </button>
                                        )}
                                    </div>
                                ))}
                            </div>

                            {formik.errors.aboutProperty?.highlights && (
                                <p className="text-red-500 text-sm mt-2">
                                    {formik.errors.aboutProperty.highlights}
                                </p>
                            )}

                            <Button
                                type="button"
                                onClick={addHighlight}
                                className="mt-2"
                            >
                                + Add Highlight
                            </Button>
                        </div>

                        {/* GALLERY */}
                        <h2 className="font-bold text-lg">Gallery</h2>

                        <div className="border p-4 mb-2 rounded border-gray-300">
                            <div>
                                <label>Gallery Images</label>

                                <Input
                                    type="file"
                                    accept="image/*"
                                    multiple
                                    onChange={handleGalleryChange}
                                    disabled={uploadsInFlight > 0}
                                />

                                {uploadsInFlight > 0 && (
                                    <p className="text-sm text-gray-500 mt-1 flex items-center gap-1">
                                        <Loader
                                            size={14}
                                            className="animate-spin"
                                        />{" "}
                                        Uploading…
                                    </p>
                                )}
                            </div>

                            {/* PREVIEW */}
                            <div className="flex gap-3 flex-wrap mt-3">
                                {galleryPreview.map((img, index) => (
                                    <div key={index} className="relative">
                                        <img
                                            src={img}
                                            alt=""
                                            className="w-24 h-24 object-cover rounded-lg border"
                                        />

                                        <button
                                            type="button"
                                            onClick={() =>
                                                removeGalleryImage(index)
                                            }
                                            className="absolute top-0 right-0 bg-red-500 text-white text-xs px-1 rounded"
                                        >
                                            ✕
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* SUBMIT */}
                    <div className="flex justify-end mt-5">
                        <Button
                            type="submit"
                            disabled={uploadsInFlight > 0}
                            className="bg-green-600 text-white disabled:opacity-60"
                        >
                            {uploadsInFlight > 0
                                ? "Uploading…"
                                : "Save & Continue"}
                        </Button>
                    </div>
                </form>
            )}
        </>
    );
};

export default PropertyDetails;
