"use client";

import React, { useEffect, useState } from 'react'
import { useFormik } from "formik";
import { Input } from "@/components/ui/input";
import QuillEditor from "../../../../_componets/TextEditor";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import { Button } from "@/components/ui/button";
import TextField from "@mui/material/TextField";
import { get, post } from "@/helpers/api";
import { Trash2 } from "lucide-react";


const filter = createFilterOptions();
const PropertyDetails = () => {

    const [roomFeatures, setRoomFeatures] = useState([
        { label: "", answer: "" },
    ]);
    const [featuresOptions, setFeaturesOptions] = useState([]);

    const [galleryImages, setGalleryImages] = useState([]);
    const [galleryPreview, setGalleryPreview] = useState([]);
    // FORM
    const formik = useFormik({
        initialValues: {
            title: "",
            mainImage: "",

            roomImage: "",
            price: "",
            roomDescription: "",

            availableDescription: "",
            propertyDescription: "",

            address: "",
            latitude: "",
            longitude: "",
        },

        onSubmit: async (values) => {
            try {

                const payload = {
                    title: values.title,
                    mainImage: values.mainImage,

                    roomDetails: {
                        image: values.roomImage,
                        description: values.roomDescription,
                        price: values.price,
                        features: roomFeatures,
                    },

                    availableFeatures: {
                        description: values.availableDescription,
                    },

                    propertyFeatures: {
                        description: values.propertyDescription,
                    },

                    location: {
                        address: values.address,
                        latitude: values.latitude,
                        longitude: values.longitude,
                    },
                    gallery: galleryImages
                };

                await post("destination", payload);

                toast.success("Property created successfully");
            } catch (err) {
                toast.error(err.message);
            }
        },
    });

    // ADD FEATURE
    const addFeature = () => {
        setRoomFeatures((prev) => [...prev, { label: "", answer: "" }]);
    };

    // REMOVE FEATURE
    const removeFeature = (index) => {
        setRoomFeatures((prev) => prev.filter((_, i) => i !== index));
    };

    const uploadImage = async (file, path) => {
        try {
            const formData = new FormData();
            formData.append("file", file);
            let url = `common/image/${path}`
            const res = await post(url, formData);

            return res.data.new_filename; // VERY IMPORTANT
        } catch (err) {
            toast.error("Image upload failed");
            throw err;
        }
    };

    const handleGalleryChange = async (e) => {
        const files = Array.from(e.target.files);

        const uploadedPaths = [];
        const previews = [];

        for (let file of files) {
            // preview (instant UI)
            previews.push(URL.createObjectURL(file));

            // upload to server
            const path = await uploadImage(file, "gallery"); // your existing helper
            uploadedPaths.push(path);
        }

        setGalleryImages((prev) => [...prev, ...uploadedPaths]);
        setGalleryPreview((prev) => [...prev, ...previews]);
    };

    const removeGalleryImage = (index) => {

        setGalleryImages((prev) => prev.filter((_, i) => i !== index));

    };




    // FETCH FEATURES OPTIONS
    const fetchfeaturesOptions = async () => {
        const res = await get(`common/feature-options`);
        setFeaturesOptions(res.data);
    };

    useEffect(() => {
        fetchfeaturesOptions();
    }, []);
    return (
        <>
            <form
                onSubmit={formik.handleSubmit}
                className="p-6 space-y-8 max-w-4xl mx-auto"
            >
                <div className='border p-4 rounded bg-white flex flex-col gap-5'>
                    {/* TITLE + MAIN IMAGE */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label>Title</label>
                            <Input
                                name="title"
                                placeholder="Title"
                                onChange={formik.handleChange}
                                value={formik.values.title}
                            />
                        </div>

                        <div>
                            <label>Banner Image</label>
                            <Input
                                type="file"
                                onChange={async (e) => {
                                    const file = e.target.files[0];

                                    if (!file) return;

                                    const uploadedPath = await uploadImage(file, "destination");

                                    formik.setFieldValue("mainImage", uploadedPath);
                                }}
                            />
                        </div>

                        <div>
                            <label>Location Link</label>
                            <Input
                                name="title"
                                placeholder="Title"
                                onChange={formik.handleChange}
                                value={formik.values.title}
                            />
                        </div>
                    </div>
                    {/* Property DETAILS */}
                    <h2 className="font-bold text-lg">About Property</h2>
                    <div className="border p-4 rounded">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label>About Image</label>
                                <Input
                                    type="file"
                                    onChange={async (e) => {
                                        const file = e.target.files[0];

                                        if (!file) return;

                                        const uploadedPath = await uploadImage(file, "room");

                                        formik.setFieldValue("roomImage", uploadedPath);
                                    }}
                                />
                            </div>


                        </div>

                        <div className="mt-4">
                            <QuillEditor
                                value={formik.values.roomDescription}
                                onChange={(val) =>
                                    formik.setFieldValue("roomDescription", val)
                                }
                            />
                        </div>

                        {/* Property Highlights */}
                        <h4 className="font-bold mt-4">Property Highlights</h4>

                        {roomFeatures.map((item, index) => (
                            <div key={index} className="flex gap-4 items-center mt-2">
                                {/* FEATURE NAME */}
                                <Autocomplete
                                    className="w-1/2"
                                    value={item.label}
                                    onChange={async (event, newValue) => {
                                        let updated = [...roomFeatures];

                                        if (typeof newValue === "string") {
                                            updated[index].label = newValue;
                                        } else if (newValue?.inputValue) {
                                            const newItem = { name: newValue.inputValue };

                                            await post("common/feature-options", newItem);
                                            setFeaturesOptions((prev) => [...prev, newItem]);

                                            updated[index].label = newValue.inputValue;
                                        } else {
                                            updated[index].label = newValue?.name || "";
                                        }

                                        setRoomFeatures(updated);
                                    }}
                                    filterOptions={(options, params) => {
                                        const filtered = filter(options, params);
                                        const { inputValue } = params;

                                        const isExisting = options.some(
                                            (o) => o.name.toLowerCase() === inputValue.toLowerCase()
                                        );

                                        if (inputValue !== "" && !isExisting) {
                                            filtered.push({
                                                inputValue,
                                                name: `Add "${inputValue}"`,
                                            });
                                        }

                                        return filtered;
                                    }}
                                    options={featuresOptions}
                                    getOptionLabel={(option) => {
                                        if (typeof option === "string") return option;
                                        if (option.inputValue) return option.inputValue;
                                        return option.name;
                                    }}
                                    renderInput={(params) => (
                                        <TextField {...params} label="Feature" />
                                    )}
                                    freeSolo
                                />

                                {/* DELETE */}
                                {roomFeatures.length > 1 && (
                                    <button type="button" onClick={() => removeFeature(index)}>
                                        <Trash2 />
                                    </button>
                                )}
                            </div>
                        ))}

                        <Button type="button" onClick={addFeature} className="mt-2">
                            + Add Feature
                        </Button>
                    </div>
                    {/* Gallery */}
                    <h2 className="font-bold text-lg">Gallery</h2>
                    <div className="border p-4 mb-2 rounded">
                        <div>
                            <label>Gallery Images</label>
                            <Input type="file" multiple onChange={handleGalleryChange} />
                        </div>
                        <div>
                            <div className="flex gap-3 flex-wrap mt-3">
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
                                                onClick={() => removeGalleryImage(index)}
                                                className="absolute top-0 right-0 bg-red-500 text-white text-xs px-1 rounded"
                                            >
                                                ✕
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='flex justify-end mt-5'>
                    <Button type="submit" className="bg-green-600 text-white">
                        Next
                    </Button>
                </div>
            </form>
        </>
    )
}

export default PropertyDetails