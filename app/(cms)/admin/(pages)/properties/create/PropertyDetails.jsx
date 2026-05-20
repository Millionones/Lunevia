"use client";

import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { Input } from "@/components/ui/input";
import QuillEditor from "../../../../_componets/TextEditor";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import { Button } from "@/components/ui/button";
import TextField from "@mui/material/TextField";
import { get, post } from "@/helpers/api";
import { Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import { BASE_URL } from "../../../../../../config";
import { Loader, Rotate3D } from "lucide-react";

const filter = createFilterOptions();

const PropertyDetails = ({ updateData, existData }) => {
    const [highlights, setHighlights] = useState([""]);
    const [featuresOptions, setFeaturesOptions] = useState([]);
    const [highlightsOptions, setHighlightsOptions] = useState([]);

    const [galleryPreview, setGalleryPreview] = useState([]);
    const [loading, setLoading] = useState(false)
    // FORM
    const formik = useFormik({
        enableReinitialize: true,

        initialValues: {
            title: existData?.title || "",
            mainImage: existData?.mainImage || "",
            locationLink: existData?.locationLink || "",

            aboutProperty: {
                image: existData?.aboutProperty?.image || "",
                description:
                    existData?.aboutProperty?.description || "",
                highlights:
                    existData?.aboutProperty?.highlights || [],
            },

            galleryImages:
                existData?.galleryImages || [],
        },

        onSubmit: async (values) => {
            try {
                const payload = {
                    ...values,
                    aboutProperty: {
                        ...values.aboutProperty,
                        highlights,
                    },
                };
                console.log(payload, 'payload')
                // await post("destination", payload);

                // toast.success("Property created successfully");
                updateData(payload)
            } catch (err) {
                toast.error(err.message);
            }
        },
    });

    useEffect(() => {
        if(existData){
            setLoading(true)
            setTimeout(() => {
                setLoading(false)
            }, 3000);
        }
        if (existData?.aboutProperty?.highlights) {
            setHighlights(existData.aboutProperty.highlights);
        }

        if (existData?.galleryImages && existData?.galleryImages?.length > 0) {
            let galleryImages = existData?.galleryImages?.map((item) => `${BASE_URL}/${item}`)
            setGalleryPreview(galleryImages)
        }
    }, [existData]);

    // ADD HIGHLIGHT
    const addHighlight = () => {
        setHighlights((prev) => [...prev, ""]);
    };

    // REMOVE HIGHLIGHT
    const removeHighlight = (index) => {
        setHighlights((prev) => prev.filter((_, i) => i !== index));
    };

    // IMAGE UPLOAD
    const uploadImage = async (file, path, category) => {
        try {
            const formData = new FormData();
            formData.append("file", file);

            const url = `common/image/${path}`;

            const res = await post(url, formData);

            return res.data.new_filename;
        } catch (err) {
            toast.error("Image upload failed");
            throw err;
        }
    };

    // GALLERY IMAGE
    const handleGalleryChange = async (e) => {
        const files = Array.from(e.target.files);

        const uploadedPaths = [];
        const previews = [];

        for (let file of files) {
            const path = await uploadImage(file, "gallery");
            
            let prevFile = `${BASE_URL}/${path}`
            previews.push(prevFile);

            uploadedPaths.push(path);
        }

        formik.setFieldValue("galleryImages", [
            ...formik.values.galleryImages,
            ...uploadedPaths,
        ]);

        setGalleryPreview((prev) => [...prev, ...previews]);
    };

    // REMOVE GALLERY IMAGE
    const removeGalleryImage = (index) => {
        const updatedImages = formik.values.galleryImages.filter(
            (_, i) => i !== index
        );

        const updatedPreview = galleryPreview.filter(
            (_, i) => i !== index
        );

        formik.setFieldValue("galleryImages", updatedImages);

        setGalleryPreview(updatedPreview);
    };

    // FETCH FEATURE OPTIONS
    const fetchHighlightsOpts = async () => {
        const res = await get(`common/property-highlights`);
        setHighlightsOptions(res.data);
    };

    useEffect(() => {
        fetchHighlightsOpts();
    }, []);

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
                                    value={formik.values.title}
                                />
                            </div>

                            {/* MAIN IMAGE */}
                            <div>
                                <label>Banner Image</label>
                                {formik.initialValues.mainImage ?
                                    <div className="relative">
                                        <img src={`${BASE_URL}/${formik.initialValues.mainImage}`} alt="" className="w-48 h-48 object-cover rounded-lg border" />

                                        <button type="button" onClick={() => removeGalleryImage(index)} className="absolute top-0 right-0 bg-red-500 text-white text-xs px-1 rounded">
                                            ✕
                                        </button>
                                    </div>
                                    :
                                    <Input
                                        type="file"
                                        onChange={async (e) => {
                                            const file = e.target.files[0];

                                            if (!file) return;

                                            const uploadedPath = await uploadImage(
                                                file,
                                                "destination"
                                            );

                                            formik.setFieldValue(
                                                "mainImage",
                                                uploadedPath
                                            );
                                        }}
                                    />
                                }
                            </div>

                            {/* LOCATION LINK */}
                            <div className="col-span-2">
                                <label>Location Link</label>

                                <Input
                                    name="locationLink"
                                    placeholder="Google map link"
                                    onChange={formik.handleChange}
                                    value={formik.values.locationLink}
                                />
                            </div>
                        </div>

                        {/* ABOUT PROPERTY */}
                        <h2 className="font-bold text-lg">
                            About Property
                        </h2>

                        <div className="border p-4 rounded border-gray-300">
                            <div className="grid grid-cols-2 gap-4">
                                {/* ABOUT IMAGE */}
                                <div>
                                    <label>About Image</label>
                                    {formik.initialValues.aboutProperty?.image ?
                                        <div className="relative">
                                            <img src={`${BASE_URL}/${formik.initialValues.aboutProperty?.image}`} alt="" className="w-48 h-48 object-cover rounded-lg border" />

                                            <button type="button" onClick={() => removeGalleryImage(index)} className="absolute top-0 right-0 bg-red-500 text-white text-xs px-1 rounded">
                                                ✕
                                            </button>
                                        </div>
                                        :
                                        <Input
                                            type="file"
                                            onChange={async (e) => {
                                                const file = e.target.files[0];

                                                if (!file) return;

                                                const uploadedPath =
                                                    await uploadImage(
                                                        file,
                                                        "about-property"
                                                    );

                                                formik.setFieldValue(
                                                    "aboutProperty.image",
                                                    uploadedPath
                                                );
                                            }}
                                        />
                                    }
                                </div>
                            </div>

                            {/* DESCRIPTION */}
                            <div className="mt-4">
                                <QuillEditor
                                    value={
                                        formik.values.aboutProperty.description
                                    }
                                    onChange={(val) =>
                                        formik.setFieldValue(
                                            "aboutProperty.description",
                                            val
                                        )
                                    }
                                />
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
                                            value={item}
                                            onChange={async (
                                                event,
                                                newValue
                                            ) => {
                                                let updated = [...highlights];

                                                if (
                                                    typeof newValue === "string"
                                                ) {
                                                    updated[index] = newValue;
                                                } else if (
                                                    newValue?.inputValue
                                                ) {
                                                    const newItem = {
                                                        name: newValue.inputValue,
                                                    };

                                                    await post(
                                                        "common/property-highlights",
                                                        newItem
                                                    );

                                                    setHighlightsOptions(
                                                        (prev) => [
                                                            ...prev,
                                                            newItem,
                                                        ]
                                                    );

                                                    updated[index] =
                                                        newValue.inputValue;
                                                } else {
                                                    updated[index] =
                                                        newValue?.name || "";
                                                }

                                                setHighlights(updated);
                                            }}
                                            filterOptions={(
                                                options,
                                                params
                                            ) => {
                                                const filtered = filter(
                                                    options,
                                                    params
                                                );

                                                const { inputValue } =
                                                    params;

                                                const isExisting =
                                                    options.some(
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
                                                if (
                                                    typeof option === "string"
                                                )
                                                    return option;

                                                if (option.inputValue)
                                                    return option.inputValue;

                                                return option.name;
                                            }}
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

                            <Button
                                type="button"
                                onClick={addHighlight}
                                className="mt-2"
                            >
                                + Add Highlight
                            </Button>
                        </div>

                        {/* GALLERY */}
                        <h2 className="font-bold text-lg">
                            Gallery
                        </h2>

                        <div className="border p-4 mb-2 rounded border-gray-300">
                            <div>
                                <label>Gallery Images</label>

                                <Input
                                    type="file"
                                    multiple
                                    onChange={handleGalleryChange}
                                />
                            </div>

                            {/* PREVIEW */}
                            <div className="flex gap-3 flex-wrap mt-3">
                                {galleryPreview.map((img, index) => (
                                    <div
                                        key={index}
                                        className="relative"
                                    >
                                        <img
                                            src={img}
                                            alt=""
                                            className="w-24 h-24 object-cover rounded-lg border"
                                        />

                                        <button
                                            type="button"
                                            onClick={() =>
                                                removeGalleryImage(
                                                    index
                                                )
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
                            className="bg-green-600 text-white"
                        >
                            Save & Continue
                        </Button>
                    </div>
                </form>
            )
            }
        </>
    );
};

export default PropertyDetails;