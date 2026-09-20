"use client";

import React, { useEffect, useState } from "react";

import { useFormik } from "formik";
import * as Yup from "yup";

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
    Pencil,
    Loader,
} from "lucide-react";

import toast from "react-hot-toast";
import { uploadImage as uploadImageApi } from "@/helpers/uploadImage";

import { post } from "@/helpers/api";

import { BASE_URL } from "../../../../../../config";

const defaultLocation = {
    title: "",
    image: "",
    description: "",
    completed: false,
};

// VALIDATION SCHEMA
const validationSchema = Yup.object({
    locations: Yup.array().of(
        Yup.object().shape({
            title: Yup.string()
                .trim()
                .required(
                    "Title is required"
                ),

            image: Yup.string().required(
                "Image is required"
            ),

            description:
                Yup.string()
                    .trim()
                    .required(
                        "Description is required"
                    ),
        })
    ),
});

const Locations = ({
    updateData,
    existData,
}) => {
    const [loading, setLoading] =
        useState(false);

    const [
        expandedLocation,
        setExpandedLocation,
    ] = useState(0);

    const formik = useFormik({
        enableReinitialize: true,

        initialValues: {
            locations:
                existData?.step4
                    ?.locations || [
                    defaultLocation,
                ],
        },

        validationSchema,

        onSubmit: async (
            values
        ) => {
            try {
                await formik.validateForm();

                updateData(values);

                toast.success(
                    "Locations saved successfully"
                );
            } catch (err) {
                toast.error(
                    err.message
                );
            }
        },
    });

    // LOAD EXISTING
    useEffect(() => {
        if (existData?.step4) {
            setLoading(true);

            setTimeout(() => {
                setLoading(false);
            }, 800);
        }
    }, [existData]);

    // IMAGE UPLOAD — routes through the shared uploader (client-side downscale +
    // real error messages) so large images don't silently fail.
    const uploadImage = async (file, path) => {
        try {
            return await uploadImageApi(file, path);
        } catch (err) {
            toast.error(err?.message || "Image upload failed");
            throw err;
        }
    };

    // ADD LOCATION
    const addLocation = () => {
        const updated = [
            ...formik.values
                .locations,
            defaultLocation,
        ];

        formik.setFieldValue(
            "locations",
            updated
        );

        setExpandedLocation(
            updated.length - 1
        );
    };

    // REMOVE LOCATION
    const removeLocation = (
        index
    ) => {
        const updated =
            formik.values.locations.filter(
                (_, i) =>
                    i !== index
            );

        formik.setFieldValue(
            "locations",
            updated
        );

        if (
            expandedLocation ===
            index
        ) {
            setExpandedLocation(
                null
            );
        }
    };

    // SAVE LOCATION
    const saveLocation =
        async (index) => {
            await formik.validateForm();

            formik.setTouched({
                locations:
                    formik.values.locations.map(
                        () => ({
                            title: true,
                            image: true,
                            description: true,
                        })
                    ),
            });

            const errors =
                formik.errors
                    .locations?.[index];

            if (errors) {
                toast.error(
                    "Please fill all required fields"
                );

                return;
            }

            const updated = [
                ...formik.values
                    .locations,
            ];

            updated[
                index
            ].completed = true;

            formik.setFieldValue(
                "locations",
                updated
            );

            setExpandedLocation(
                null
            );

            toast.success(
                "Location saved"
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
                    {formik.values.locations.map(
                        (
                            location,
                            index
                        ) => (
                            <Accordion
                                key={index}
                                expanded={
                                    expandedLocation ===
                                    index
                                }
                                onChange={() =>
                                    setExpandedLocation(
                                        expandedLocation ===
                                            index
                                            ? null
                                            : index
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
                                            <div>
                                                <h2 className="font-bold text-lg">
                                                    {location.title ||
                                                        `Location ${index + 1}`}
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

                                                    setExpandedLocation(
                                                        index
                                                    );
                                                }}
                                                className="p-2 bg-blue-100 rounded"
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

                                                    removeLocation(
                                                        index
                                                    );
                                                }}
                                                className="p-2 bg-red-100 rounded"
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
                                                    name={`locations.${index}.title`}
                                                    value={
                                                        location.title
                                                    }
                                                    onBlur={
                                                        formik.handleBlur
                                                    }
                                                    onChange={(
                                                        e
                                                    ) => {
                                                        formik.setFieldValue(
                                                            `locations.${index}.title`,
                                                            e
                                                                .target
                                                                .value
                                                        );
                                                    }}
                                                />

                                                {formik
                                                    .touched
                                                    .locations?.[
                                                    index
                                                ]
                                                    ?.title &&
                                                    formik
                                                        .errors
                                                        .locations?.[
                                                        index
                                                    ]
                                                        ?.title && (
                                                        <p className="text-red-500 text-sm mt-1">
                                                            {
                                                                formik
                                                                    .errors
                                                                    .locations[
                                                                    index
                                                                ]
                                                                    .title
                                                            }
                                                        </p>
                                                    )}
                                            </div>

                                            {/* IMAGE */}
                                            <div>
                                                <label>
                                                    Image
                                                </label>

                                                {location.image ? (
                                                    <div className="relative w-fit">
                                                        <img
                                                            src={`${location.image}`}
                                                            className="w-40 h-40 object-cover rounded"
                                                        />

                                                        <button
                                                            type="button"
                                                            onClick={() => {
                                                                formik.setFieldValue(
                                                                    `locations.${index}.image`,
                                                                    ""
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

                                                            const uploaded =
                                                                await uploadImage(
                                                                    file,
                                                                    "locations"
                                                                );

                                                            formik.setFieldValue(
                                                                `locations.${index}.image`,
                                                                uploaded
                                                            );

                                                            formik.setFieldTouched(
                                                                `locations.${index}.image`,
                                                                true
                                                            );
                                                        }}
                                                    />
                                                )}

                                                {formik
                                                    .touched
                                                    .locations?.[
                                                    index
                                                ]
                                                    ?.image &&
                                                    formik
                                                        .errors
                                                        .locations?.[
                                                        index
                                                    ]
                                                        ?.image && (
                                                        <p className="text-red-500 text-sm mt-1">
                                                            {
                                                                formik
                                                                    .errors
                                                                    .locations[
                                                                    index
                                                                ]
                                                                    .image
                                                            }
                                                        </p>
                                                    )}
                                            </div>
                                        </div>

                                        {/* DESCRIPTION */}
                                        <div>
                                            <label>
                                                Description
                                            </label>

                                            <Textarea
                                                name={`locations.${index}.description`}
                                                value={
                                                    location.description
                                                }
                                                onBlur={
                                                    formik.handleBlur
                                                }
                                                onChange={(
                                                    e
                                                ) => {
                                                    formik.setFieldValue(
                                                        `locations.${index}.description`,
                                                        e
                                                            .target
                                                            .value
                                                    );
                                                }}
                                            />

                                            {formik
                                                .touched
                                                .locations?.[
                                                index
                                            ]
                                                ?.description &&
                                                formik
                                                    .errors
                                                    .locations?.[
                                                    index
                                                ]
                                                    ?.description && (
                                                    <p className="text-red-500 text-sm mt-1">
                                                        {
                                                            formik
                                                                .errors
                                                                .locations[
                                                                index
                                                            ]
                                                                .description
                                                        }
                                                    </p>
                                                )}
                                        </div>

                                        {/* SAVE */}
                                        <div className="flex justify-end gap-3">
                                            <Button
                                                type="button"
                                                variant="outline"
                                                onClick={() =>
                                                    setExpandedLocation(
                                                        null
                                                    )
                                                }
                                            >
                                                Cancel
                                            </Button>

                                            <Button
                                                type="button"
                                                onClick={() =>
                                                    saveLocation(
                                                        index
                                                    )
                                                }
                                            >
                                                Save
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
                                addLocation
                            }
                        >
                            + Add Location
                        </Button>

                        <Button
                            type="submit"
                            className="bg-green-600 text-white"
                        >
                            Save & Finish
                        </Button>
                    </div>
                </form>
            )}
        </>
    );
};

export default Locations;