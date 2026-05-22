"use client";

import React, { useEffect, useState } from "react";

import { useFormik } from "formik";

import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
} from "@mui/material";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { Input } from "@/components/ui/input";

import { Textarea } from "@/components/ui/textarea";

import { Button } from "@/components/ui/button";

import {
    Trash2,
    Loader,
    Pencil,
} from "lucide-react";

import toast from "react-hot-toast";

import { post } from "@/helpers/api";

import { BASE_URL } from "../../../../../../config";

const defaultAmenity = {
    title: "",

    image: "",

    description: "",

    completed: false,
};

const Amenties = ({
    updateData,
    existData,
}) => {
    const [loading, setLoading] =
        useState(false);

    const [
        expandedAmenity,
        setExpandedAmenity,
    ] = useState(0);

    // FORM
    const formik = useFormik({
        enableReinitialize: true,

        initialValues: {
            amenities:
                existData?.step3
                    ?.amenities || [
                    defaultAmenity,
                ],
        },

        onSubmit: async (values) => {
            try {
                updateData(values);

                toast.success(
                    "Amenities saved successfully"
                );
            } catch (err) {
                toast.error(err.message);
            }
        },
    });

    // LOAD
    useEffect(() => {
        if (existData?.step3) {
            setLoading(true);

            setTimeout(() => {
                setLoading(false);
            }, 800);
        }
    }, [existData]);

    // IMAGE UPLOAD
    const uploadImage = async (
        file,
        path
    ) => {
        try {
            const formData =
                new FormData();

            formData.append(
                "file",
                file
            );

            const url = `common/image/${path}`;

            const res = await post(
                url,
                formData
            );

            return res.data
                .new_filename;
        } catch (err) {
            toast.error(
                "Image upload failed"
            );

            throw err;
        }
    };

    // ADD AMENITY
    const addAmenity = () => {
        const updated = [
            ...formik.values
                .amenities,
            defaultAmenity,
        ];

        formik.setFieldValue(
            "amenities",
            updated
        );

        setExpandedAmenity(
            updated.length - 1
        );
    };

    // REMOVE AMENITY
    const removeAmenity = (
        amenityIndex
    ) => {
        const updated =
            formik.values.amenities.filter(
                (_, i) =>
                    i !== amenityIndex
            );

        formik.setFieldValue(
            "amenities",
            updated
        );

        if (
            expandedAmenity ===
            amenityIndex
        ) {
            setExpandedAmenity(
                null
            );
        }
    };

    // SAVE AMENITY
    const saveAmenity = (
        amenityIndex
    ) => {
        const updated = [
            ...formik.values
                .amenities,
        ];

        updated[
            amenityIndex
        ].completed = true;

        formik.setFieldValue(
            "amenities",
            updated
        );

        setExpandedAmenity(null);

        toast.success(
            "Amenity saved"
        );
    };

    return (
        <>
            {loading ? (
                <div className="w-full h-screen flex justify-center items-center">
                    <Loader size={32} />
                </div>
            ) : (
                <form
                    onSubmit={
                        formik.handleSubmit
                    }
                    className="p-6 space-y-8 max-w-4xl mx-auto"
                >
                    {formik.values.amenities.map(
                        (
                            amenity,
                            amenityIndex
                        ) => (
                            <Accordion
                                key={
                                    amenityIndex
                                }
                                expanded={
                                    expandedAmenity ===
                                    amenityIndex
                                }
                                onChange={() =>
                                    setExpandedAmenity(
                                        expandedAmenity ===
                                            amenityIndex
                                            ? null
                                            : amenityIndex
                                    )
                                }
                            >
                                {/* SUMMARY */}
                                <AccordionSummary
                                    expandIcon={
                                        <ExpandMoreIcon />
                                    }
                                >
                                    <div className="w-full flex justify-between items-center pr-5">
                                        <div className="flex gap-4 items-center">
                                           

                                            {/* DETAILS */}
                                            <div>
                                                <h2 className="font-bold text-lg">
                                                    {amenity.title ||
                                                        `Amenity ${amenityIndex + 1}`}
                                                </h2>

                                            </div>
                                        </div>

                                        {/* ACTIONS */}
                                        <div className="flex gap-2">
                                            <button
                                                type="button"
                                                onClick={(
                                                    e
                                                ) => {
                                                    e.stopPropagation();

                                                    setExpandedAmenity(
                                                        amenityIndex
                                                    );
                                                }}
                                                className="p-2 rounded bg-blue-100"
                                            >
                                                <Pencil
                                                    size={
                                                        16
                                                    }
                                                />
                                            </button>

                                            <button
                                                type="button"
                                                onClick={(
                                                    e
                                                ) => {
                                                    e.stopPropagation();

                                                    removeAmenity(
                                                        amenityIndex
                                                    );
                                                }}
                                                className="p-2 rounded bg-red-100"
                                            >
                                                <Trash2
                                                    size={
                                                        16
                                                    }
                                                />
                                            </button>
                                        </div>
                                    </div>
                                </AccordionSummary>

                                {/* DETAILS */}
                                <AccordionDetails>
                                    <div className="flex flex-col gap-5">
                                        {/* TITLE + IMAGE */}
                                        <div className="grid grid-cols-2 gap-4">
                                            {/* TITLE */}
                                            <div>
                                                <label>
                                                    Title
                                                </label>

                                                <Input
                                                    value={
                                                        amenity.title
                                                    }
                                                    onChange={(
                                                        e
                                                    ) => {
                                                        const updated =
                                                            [
                                                                ...formik
                                                                    .values
                                                                    .amenities,
                                                            ];

                                                        updated[
                                                            amenityIndex
                                                        ].title =
                                                            e
                                                                .target
                                                                .value;

                                                        formik.setFieldValue(
                                                            "amenities",
                                                            updated
                                                        );
                                                    }}
                                                />
                                            </div>

                                            {/* IMAGE */}
                                            <div>
                                                <label>
                                                    Image
                                                </label>

                                                {amenity.image ? (
                                                    <div className="relative w-fit">
                                                        <img
                                                            src={`${BASE_URL}/${amenity.image}`}
                                                            alt=""
                                                            className="w-40 h-40 object-cover rounded"
                                                        />

                                                        <button
                                                            type="button"
                                                            onClick={() => {
                                                                const updated =
                                                                    [
                                                                        ...formik
                                                                            .values
                                                                            .amenities,
                                                                    ];

                                                                updated[
                                                                    amenityIndex
                                                                ].image =
                                                                    "";

                                                                formik.setFieldValue(
                                                                    "amenities",
                                                                    updated
                                                                );
                                                            }}
                                                            className="absolute top-0 right-0 bg-red-500 text-white text-xs px-1 rounded"
                                                        >
                                                            ✕
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <Input
                                                        type="file"
                                                        onChange={async (
                                                            e
                                                        ) => {
                                                            const file =
                                                                e
                                                                    .target
                                                                    .files[0];

                                                            if (
                                                                !file
                                                            )
                                                                return;

                                                            const uploadedPath =
                                                                await uploadImage(
                                                                    file,
                                                                    "amenities"
                                                                );

                                                            const updated =
                                                                [
                                                                    ...formik
                                                                        .values
                                                                        .amenities,
                                                                ];

                                                            updated[
                                                                amenityIndex
                                                            ].image =
                                                                uploadedPath;

                                                            formik.setFieldValue(
                                                                "amenities",
                                                                updated
                                                            );
                                                        }}
                                                    />
                                                )}
                                            </div>
                                        </div>

                                        {/* DESCRIPTION */}
                                        <div>
                                            <label>
                                                Description
                                            </label>

                                            <Textarea
                                                value={
                                                    amenity.description
                                                }
                                                onChange={(
                                                    e
                                                ) => {
                                                    const updated =
                                                        [
                                                            ...formik
                                                                .values
                                                                .amenities,
                                                        ];

                                                    updated[
                                                        amenityIndex
                                                    ].description =
                                                        e
                                                            .target
                                                            .value;

                                                    formik.setFieldValue(
                                                        "amenities",
                                                        updated
                                                    );
                                                }}
                                                placeholder="Description"
                                            />
                                        </div>

                                        {/* SAVE */}
                                        <div className="flex justify-end gap-3">
                                            <Button
                                                type="button"
                                                variant="outline"
                                                onClick={() =>
                                                    setExpandedAmenity(
                                                        null
                                                    )
                                                }
                                            >
                                                Cancel
                                            </Button>

                                            <Button
                                                type="button"
                                                onClick={() =>
                                                    saveAmenity(
                                                        amenityIndex
                                                    )
                                                }
                                            >
                                                Save
                                                Amenity
                                            </Button>
                                        </div>
                                    </div>
                                </AccordionDetails>
                            </Accordion>
                        )
                    )}

                    {/* ACTIONS */}
                    <div className="flex justify-between">
                        <Button
                            type="button"
                            onClick={
                                addAmenity
                            }
                        >
                            +
                            Add
                            Amenity
                        </Button>

                        <Button
                            type="submit"
                            className="bg-green-600 text-white"
                        >
                            Save &
                            Continue
                        </Button>
                    </div>
                </form>
            )}
        </>
    );
};

export default Amenties;