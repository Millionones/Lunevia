"use client";
import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { get, post } from "@/helpers/api";
import toast from "react-hot-toast";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import { Trash2 } from "lucide-react";
import QuillEditor from "../../../_componets/TextEditor";

import TextField from "@mui/material/TextField";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";

const filter = createFilterOptions();

const Properties = () => {
    const [featuresOptions, setFeaturesOptions] = useState([]);
    const [galleryImages, setGalleryImages] = useState([]);
    const [galleryPreview, setGalleryPreview] = useState([]);
    const [roomFeatures, setRoomFeatures] = useState([
        { label: "", answer: "" },
    ]);

    // FETCH FEATURES OPTIONS
    const fetchfeaturesOptions = async () => {
        const res = await get(`common/feature-options`);
        setFeaturesOptions(res.data);
    };

    useEffect(() => {
        fetchfeaturesOptions();
    }, []);

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
                // const formData = new FormData();

                // formData.append("title", values.title ? values.title : "");
                // formData.append("mainImage", values.mainImage);

                // formData.append("roomDetails[image]", values.roomImage);
                // formData.append("roomDetails[description]", values.roomDescription);
                // formData.append("roomDetails[price]", values.price);

                // formData.append(
                //     "availableFeatures[description]",
                //     values.availableDescription
                // );

                // formData.append(
                //     "propertyFeatures[description]",
                //     values.propertyDescription
                // );

                // formData.append("location[address]", values.address);
                // formData.append("location[latitude]", values.latitude);
                // formData.append("location[longitude]", values.longitude);

                // // FEATURES ARRAY
                // roomFeatures.forEach((f, i) => {
                //     formData.append(`roomDetails[features][${i}][label]`, f.label);
                //     formData.append(`roomDetails[features][${i}][answer]`, f.answer);
                // });
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

    return (
        <form
            onSubmit={formik.handleSubmit}
            className="p-6 space-y-8 max-w-4xl mx-auto"
        >
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
                    <label>Main Image</label>
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
            </div>

            {/* ROOM DETAILS */}
            <h2 className="font-bold text-lg">Room Details</h2>
            <div className="border p-4 rounded">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label>Room Image</label>
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

                    <div>
                        <label>Price</label>
                        <Input
                            name="price"
                            onChange={formik.handleChange}
                            value={formik.values.price}
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

                {/* FEATURES */}
                <h4 className="font-bold mt-4">Room Features</h4>

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

                        {/* VALUE */}
                        <TextField
                            className="w-1/2"
                            label="Value"
                            value={item.answer}
                            onChange={(e) => {
                                let updated = [...roomFeatures];
                                updated[index].answer = e.target.value;
                                setRoomFeatures(updated);
                            }}
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

            {/* AVAILABLE FEATURES */}
            <h2 className="font-bold text-lg">Available Facilities</h2>
            <div className="border p-4 rounded">
                <QuillEditor
                    value={formik.values.availableDescription}
                    onChange={(val) =>
                        formik.setFieldValue("availableDescription", val)
                    }
                />
            </div>

            {/* PROPERTY FEATURES */}
            <h2 className="font-bold text-lg">About Property</h2>
            <div className="border p-4 rounded">
                <QuillEditor
                    value={formik.values.propertyDescription}
                    onChange={(val) =>
                        formik.setFieldValue("propertyDescription", val)
                    }
                />
            </div>

            {/* LOCATION */}
            <h2 className="font-bold text-lg">Location</h2>
            <div className="border p-4 rounded">
                <Textarea
                    name="address"
                    placeholder="Address"
                    onChange={formik.handleChange}
                    value={formik.values.address}
                />

                <div className="grid grid-cols-2 gap-4 mt-2">
                    <Input
                        name="latitude"
                        placeholder="Latitude"
                        onChange={formik.handleChange}
                        value={formik.values.latitude}
                    />

                    <Input
                        name="longitude"
                        placeholder="Longitude"
                        onChange={formik.handleChange}
                        value={formik.values.longitude}
                    />
                </div>
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

            <Button type="submit" className="bg-green-600 text-white">
                Submit
            </Button>
        </form>
    );
};

export default Properties;