"use client";

import React, { useEffect, useState } from 'react'
import { Input } from "@/components/ui/input";
import TextField from "@mui/material/TextField";
import { useFormik } from "formik";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const Amenties = () => {

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
                    <div>
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
                                <label>Image</label>
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
                        <div className="mt-4">
                            <label>Description</label>
                            <Textarea
                                name="address"
                                placeholder="Description"
                                onChange={formik.handleChange}
                                value={formik.values.address}
                            />

                        </div>
                        <div className="flex justify-end mt-5 gap-5">
                            <Button type="submit" className="  ">
                                Cancel
                            </Button>
                            <Button type="submit" className="bg-green-600 text-white">
                                Save
                            </Button>
                        </div>
                    </div>
                </div>
                <div className="flex items-center justify-between">
                    <Button type="button" onClick={addFeature} className="mt-2">
                        + Add Ameneties
                    </Button>
                    <Button type="submit" className="bg-green-600 text-white mt-2">
                        Next
                    </Button>
                </div>
            </form>
        </>
    )
}

export default Amenties