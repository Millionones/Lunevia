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


const RoomDetails = () => {

    const [roomFeatures, setRoomFeatures] = useState([
        { label: "", answer: "" },
    ]);
    const [featuresOptions, setFeaturesOptions] = useState([]);


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
    return (
        <>
            <form
                onSubmit={formik.handleSubmit}
                className="p-6 space-y-8 max-w-4xl mx-auto"
            >
                <div className="border p-4 rounded bg-white flex flex-col gap-5">
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
                            <label>Room main Image</label>
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
                            <label>Price</label>
                            <Input
                                name="price"
                                onChange={formik.handleChange}
                                value={formik.values.price}
                            />
                        </div>
                    </div>
                    <h2 className="font-bold text-lg mt-4">Room Details</h2>
                    <div className="mt-4">
                        <QuillEditor
                            value={formik.values.roomDescription}
                            onChange={(val) =>
                                formik.setFieldValue("roomDescription", val)
                            }
                        />
                    </div>
                    {/* FEATURES */}
                    <div>
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

                    <div>
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
                    </div>
                </div>

                <div className="flex items-center justify-between">
                    <Button type="button" onClick={addFeature} className="mt-2">
                        + Add Rooms
                    </Button>
                    <Button type="submit" className="bg-green-600 text-white mt-2">
                        Next
                    </Button>
                </div>
            </form>
        </>
    )
}

export default RoomDetails