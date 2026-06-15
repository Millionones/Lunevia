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

import QuillEditor from "../../../../_componets/TextEditor";

import Autocomplete, {
    createFilterOptions,
} from "@mui/material/Autocomplete";

import TextField from "@mui/material/TextField";

import { Button } from "@/components/ui/button";

import { get, post } from "@/helpers/api";

import {
    Trash2,
    Loader,
    Pencil,
} from "lucide-react";

import toast from "react-hot-toast";

import { BASE_URL } from "../../../../../../config";

const filter = createFilterOptions();

const defaultRoom = {
    title: "",
    image: "",
    description: "",
    price: "",
    availableFeatures: "",
    resortAmenities: "",
    completed: false,

    features: [
        {
            label: "",
            answer: "",
        },
    ],
};

// VALIDATION SCHEMA
const validationSchema = Yup.object({
    rooms: Yup.array().of(
        Yup.object({
            title: Yup.string()
                .trim()
                .required("Title is required"),

            image: Yup.string()
                .required("Room image is required"),

            description: Yup.string()
                .required("Description is required"),

            price: Yup.number()
                .typeError("Price must be a number")
                .required("Price is required"),

            availableFeatures: Yup.string()
                .required("Available facilities are required"),

            resortAmenities: Yup.string()
                .required("Resort amenities are required"),

            features: Yup.array().of(
                Yup.object({
                    label: Yup.string()
                        .required("Feature name is required"),

                    answer: Yup.string()
                        .required("Feature value is required"),
                })
            ),
        })
    ),
});

const RoomDetails = ({
    updateData,
    existData,
}) => {
    const [loading, setLoading] =
        useState(false);

    const [
        expandedRoom,
        setExpandedRoom,
    ] = useState(0);

    const [
        roomFeaturesOptions,
        setRoomFeaturesOptions,
    ] = useState([]);

    // FORM
    const formik = useFormik({
        enableReinitialize: true,

        initialValues: {
            rooms:
                existData?.step2?.rooms || [
                    defaultRoom,
                ],
        },

        validationSchema,

        onSubmit: async (values) => {
            try {
                updateData(values);

                toast.success(
                    "Rooms saved successfully"
                );
            } catch (err) {
                toast.error(err.message);
            }
        },
    });

    // LOAD
    useEffect(() => {
        if (existData?.step2) {
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

            return res.data.url;
        } catch (err) {
            toast.error(
                "Image upload failed"
            );

            throw err;
        }
    };

    // ADD ROOM
    const addRoom = () => {
        const updated = [
            ...formik.values.rooms,
            defaultRoom,
        ];

        formik.setFieldValue(
            "rooms",
            updated
        );

        setExpandedRoom(
            updated.length - 1
        );
    };

    // REMOVE ROOM
    const removeRoom = (
        roomIndex
    ) => {
        const updated =
            formik.values.rooms.filter(
                (_, i) =>
                    i !== roomIndex
            );

        formik.setFieldValue(
            "rooms",
            updated
        );

        if (
            expandedRoom === roomIndex
        ) {
            setExpandedRoom(null);
        }
    };

    // SAVE ROOM
    const saveRoom = async (
        roomIndex
    ) => {
        await formik.validateForm();

        formik.setTouched({
            rooms:
                formik.values.rooms.map(
                    () => ({
                        title: true,
                        image: true,
                        description: true,
                        price: true,
                        availableFeatures: true,
                        resortAmenities: true,
                        features: true,
                    })
                ),
        });

        const roomErrors =
            formik.errors.rooms?.[
                roomIndex
            ];

        if (roomErrors) {
            toast.error(
                "Please fill all required fields"
            );

            return;
        }

        const updated = [
            ...formik.values.rooms,
        ];

        updated[
            roomIndex
        ].completed = true;

        formik.setFieldValue(
            "rooms",
            updated
        );

        setExpandedRoom(null);

        toast.success(
            "Room saved"
        );
    };

    // ADD FEATURE
    const addFeature = (
        roomIndex
    ) => {
        const updated = [
            ...formik.values.rooms,
        ];

        updated[
            roomIndex
        ].features.push({
            label: "",
            answer: "",
        });

        formik.setFieldValue(
            "rooms",
            updated
        );
    };

    // REMOVE FEATURE
    const removeFeature = (
        roomIndex,
        featureIndex
    ) => {
        const updated = [
            ...formik.values.rooms,
        ];

        updated[
            roomIndex
        ].features =
            updated[
                roomIndex
            ].features.filter(
                (_, i) =>
                    i !== featureIndex
            );

        formik.setFieldValue(
            "rooms",
            updated
        );
    };

    // FETCH FEATURES
    const fetchRoomFeaturesOpts =
        async () => {
            try {
                const res = await get(
                    `common/feature-options`
                );

                setRoomFeaturesOptions(
                    res.data
                );
            } catch (err) {
                toast.error(
                    "Failed to fetch features"
                );
            }
        };

    useEffect(() => {
        fetchRoomFeaturesOpts();
    }, []);

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
                    {formik.values.rooms.map(
                        (
                            room,
                            roomIndex
                        ) => (
                            <Accordion
                                key={
                                    roomIndex
                                }
                                expanded={
                                    expandedRoom ===
                                    roomIndex
                                }
                                onChange={() =>
                                    setExpandedRoom(
                                        expandedRoom ===
                                            roomIndex
                                            ? null
                                            : roomIndex
                                    )
                                }
                            >
                                {/* SUMMARY */}
                                <AccordionSummary
                                    expandIcon={
                                        <ExpandMoreIcon />
                                    }
                                >
                                    <div className="w-full flex justify-between items-center">
                                        <div className="flex gap-4 items-center">
                                            <div>
                                                <h2 className="font-bold text-lg">
                                                    {room.title ||
                                                        `Room ${roomIndex + 1}`}
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

                                                    setExpandedRoom(
                                                        roomIndex
                                                    );
                                                }}
                                                className="p-2 rounded bg-blue-100"
                                            >
                                                <Pencil size={16} />
                                            </button>

                                            <button
                                                type="button"
                                                onClick={(
                                                    e
                                                ) => {
                                                    e.stopPropagation();

                                                    removeRoom(
                                                        roomIndex
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

                                        {/* TITLE + IMAGE + PRICE */}
                                        <div className="grid grid-cols-2 gap-4">

                                            {/* TITLE */}
                                            <div>
                                                <label>
                                                    Title
                                                </label>

                                                <Input
                                                    value={
                                                        room.title
                                                    }
                                                    placeholder="Title"
                                                    name={`rooms.${roomIndex}.title`}
                                                    onBlur={
                                                        formik.handleBlur
                                                    }
                                                    onChange={(
                                                        e
                                                    ) => {
                                                        formik.setFieldValue(
                                                            `rooms.${roomIndex}.title`,
                                                            e
                                                                .target
                                                                .value
                                                        );
                                                    }}
                                                />

                                                {formik
                                                    .touched
                                                    .rooms?.[
                                                    roomIndex
                                                ]
                                                    ?.title &&
                                                    formik
                                                        .errors
                                                        .rooms?.[
                                                        roomIndex
                                                    ]
                                                        ?.title && (
                                                        <p className="text-red-500 text-sm mt-1">
                                                            {
                                                                formik
                                                                    .errors
                                                                    .rooms[
                                                                    roomIndex
                                                                ]
                                                                    .title
                                                            }
                                                        </p>
                                                    )}
                                            </div>

                                            {/* IMAGE */}
                                            <div>
                                                <label>
                                                    Room
                                                    Image
                                                </label>

                                                {room.image ? (
                                                    <div className="relative w-fit">
                                                        <img
                                                            src={`${room.image}`}
                                                            alt=""
                                                            className="w-40 h-40 object-cover rounded"
                                                        />

                                                        <button
                                                            type="button"
                                                            onClick={() => {
                                                                formik.setFieldValue(
                                                                    `rooms.${roomIndex}.image`,
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

                                                            const uploadedPath =
                                                                await uploadImage(
                                                                    file,
                                                                    "rooms"
                                                                );

                                                            formik.setFieldValue(
                                                                `rooms.${roomIndex}.image`,
                                                                uploadedPath
                                                            );
                                                        }}
                                                    />
                                                )}

                                                {formik
                                                    .touched
                                                    .rooms?.[
                                                    roomIndex
                                                ]
                                                    ?.image &&
                                                    formik
                                                        .errors
                                                        .rooms?.[
                                                        roomIndex
                                                    ]
                                                        ?.image && (
                                                        <p className="text-red-500 text-sm mt-1">
                                                            {
                                                                formik
                                                                    .errors
                                                                    .rooms[
                                                                    roomIndex
                                                                ]
                                                                    .image
                                                            }
                                                        </p>
                                                    )}
                                            </div>

                                            {/* PRICE */}
                                            <div>
                                                <label>
                                                    Price
                                                </label>

                                                <Input
                                                    value={
                                                        room.price
                                                    }
                                                    placeholder="Price"
                                                    name={`rooms.${roomIndex}.price`}
                                                    onBlur={
                                                        formik.handleBlur
                                                    }
                                                    onChange={(
                                                        e
                                                    ) => {
                                                        formik.setFieldValue(
                                                            `rooms.${roomIndex}.price`,
                                                            e
                                                                .target
                                                                .value
                                                        );
                                                    }}
                                                />

                                                {formik
                                                    .touched
                                                    .rooms?.[
                                                    roomIndex
                                                ]
                                                    ?.price &&
                                                    formik
                                                        .errors
                                                        .rooms?.[
                                                        roomIndex
                                                    ]
                                                        ?.price && (
                                                        <p className="text-red-500 text-sm mt-1">
                                                            {
                                                                formik
                                                                    .errors
                                                                    .rooms[
                                                                    roomIndex
                                                                ]
                                                                    .price
                                                            }
                                                        </p>
                                                    )}
                                            </div>
                                        </div>

                                        {/* DESCRIPTION */}
                                        <div>
                                            <h3 className="font-bold mb-2">
                                                Description
                                            </h3>

                                            <QuillEditor
                                                value={
                                                    room.description
                                                }
                                                onChange={(
                                                    val
                                                ) => {
                                                    formik.setFieldValue(
                                                        `rooms.${roomIndex}.description`,
                                                        val
                                                    );
                                                }}
                                            />

                                            {formik
                                                .touched
                                                .rooms?.[
                                                roomIndex
                                            ]
                                                ?.description &&
                                                formik
                                                    .errors
                                                    .rooms?.[
                                                    roomIndex
                                                ]
                                                    ?.description && (
                                                    <p className="text-red-500 text-sm mt-1">
                                                        {
                                                            formik
                                                                .errors
                                                                .rooms[
                                                                roomIndex
                                                            ]
                                                                .description
                                                        }
                                                    </p>
                                                )}
                                        </div>

                                        {/* FEATURES */}
                                        <div>
                                            <h3 className="font-bold">
                                                Features
                                            </h3>

                                            {room.features.map(
                                                (
                                                    feature,
                                                    featureIndex
                                                ) => (
                                                    <div
                                                        key={
                                                            featureIndex
                                                        }
                                                        className="flex gap-4 mt-3 items-start"
                                                    >
                                                        {/* FEATURE */}
                                                        <div className="w-1/2">
                                                            <Autocomplete
                                                                value={
                                                                    feature.label
                                                                }
                                                                onChange={async (
                                                                    event,
                                                                    newValue
                                                                ) => {
                                                                    if (
                                                                        typeof newValue ===
                                                                        "string"
                                                                    ) {
                                                                        formik.setFieldValue(
                                                                            `rooms.${roomIndex}.features.${featureIndex}.label`,
                                                                            newValue
                                                                        );
                                                                    } else if (
                                                                        newValue?.inputValue
                                                                    ) {
                                                                        const newItem =
                                                                        {
                                                                            name: newValue.inputValue,
                                                                        };

                                                                        await post(
                                                                            "common/feature-options",
                                                                            newItem
                                                                        );

                                                                        setRoomFeaturesOptions(
                                                                            (
                                                                                prev
                                                                            ) => [
                                                                                    ...prev,
                                                                                    newItem,
                                                                                ]
                                                                        );

                                                                        formik.setFieldValue(
                                                                            `rooms.${roomIndex}.features.${featureIndex}.label`,
                                                                            newValue.inputValue
                                                                        );
                                                                    } else {
                                                                        formik.setFieldValue(
                                                                            `rooms.${roomIndex}.features.${featureIndex}.label`,
                                                                            newValue?.name ||
                                                                            ""
                                                                        );
                                                                    }
                                                                }}
                                                                filterOptions={(
                                                                    options,
                                                                    params
                                                                ) => {
                                                                    const filtered =
                                                                        filter(
                                                                            options,
                                                                            params
                                                                        );

                                                                    const {
                                                                        inputValue,
                                                                    } =
                                                                        params;

                                                                    const isExisting =
                                                                        options.some(
                                                                            (
                                                                                o
                                                                            ) =>
                                                                                o.name.toLowerCase() ===
                                                                                inputValue.toLowerCase()
                                                                        );

                                                                    if (
                                                                        inputValue !==
                                                                        "" &&
                                                                        !isExisting
                                                                    ) {
                                                                        filtered.push(
                                                                            {
                                                                                inputValue,
                                                                                name: `Add "${inputValue}"`,
                                                                            }
                                                                        );
                                                                    }

                                                                    return filtered;
                                                                }}
                                                                options={
                                                                    roomFeaturesOptions
                                                                }
                                                                getOptionLabel={(
                                                                    option
                                                                ) => {
                                                                    if (
                                                                        typeof option ===
                                                                        "string"
                                                                    )
                                                                        return option;

                                                                    if (
                                                                        option.inputValue
                                                                    )
                                                                        return option.inputValue;

                                                                    return option.name;
                                                                }}
                                                                renderInput={(
                                                                    params
                                                                ) => (
                                                                    <TextField
                                                                        {...params}
                                                                        label="Feature"
                                                                    />
                                                                )}
                                                                freeSolo
                                                            />

                                                            {formik
                                                                .errors
                                                                .rooms?.[
                                                                roomIndex
                                                            ]
                                                                ?.features?.[
                                                                featureIndex
                                                            ]
                                                                ?.label && (
                                                                    <p className="text-red-500 text-sm mt-1">
                                                                        {
                                                                            formik
                                                                                .errors
                                                                                .rooms[
                                                                                roomIndex
                                                                            ]
                                                                                .features[
                                                                                featureIndex
                                                                            ]
                                                                                .label
                                                                        }
                                                                    </p>
                                                                )}
                                                        </div>

                                                        {/* VALUE */}
                                                        <div className="w-1/2">
                                                            <TextField
                                                                fullWidth
                                                                label="Value"
                                                                value={
                                                                    feature.answer
                                                                }
                                                                onChange={(
                                                                    e
                                                                ) => {
                                                                    formik.setFieldValue(
                                                                        `rooms.${roomIndex}.features.${featureIndex}.answer`,
                                                                        e
                                                                            .target
                                                                            .value
                                                                    );
                                                                }}
                                                            />

                                                            {formik
                                                                .errors
                                                                .rooms?.[
                                                                roomIndex
                                                            ]
                                                                ?.features?.[
                                                                featureIndex
                                                            ]
                                                                ?.answer && (
                                                                    <p className="text-red-500 text-sm mt-1">
                                                                        {
                                                                            formik
                                                                                .errors
                                                                                .rooms[
                                                                                roomIndex
                                                                            ]
                                                                                .features[
                                                                                featureIndex
                                                                            ]
                                                                                .answer
                                                                        }
                                                                    </p>
                                                                )}
                                                        </div>

                                                        {/* DELETE */}
                                                        {room
                                                            .features
                                                            .length >
                                                            1 && (
                                                                <button
                                                                    type="button"
                                                                    onClick={() =>
                                                                        removeFeature(
                                                                            roomIndex,
                                                                            featureIndex
                                                                        )
                                                                    }
                                                                >
                                                                    <Trash2 />
                                                                </button>
                                                            )}
                                                    </div>
                                                )
                                            )}

                                            <Button
                                                type="button"
                                                onClick={() =>
                                                    addFeature(
                                                        roomIndex
                                                    )
                                                }
                                                className="mt-3"
                                            >
                                                +
                                                Add
                                                Feature
                                            </Button>
                                        </div>

                                        {/* AVAILABLE FEATURES */}
                                        <div>
                                            <h3 className="font-bold mb-2">
                                                Available
                                                Facilities
                                            </h3>

                                            <QuillEditor
                                                value={
                                                    room.availableFeatures
                                                }
                                                onChange={(
                                                    val
                                                ) => {
                                                    formik.setFieldValue(
                                                        `rooms.${roomIndex}.availableFeatures`,
                                                        val
                                                    );
                                                }}
                                            />

                                            {formik
                                                .errors
                                                .rooms?.[
                                                roomIndex
                                            ]
                                                ?.availableFeatures && (
                                                    <p className="text-red-500 text-sm mt-1">
                                                        {
                                                            formik
                                                                .errors
                                                                .rooms[
                                                                roomIndex
                                                            ]
                                                                .availableFeatures
                                                        }
                                                    </p>
                                                )}
                                        </div>

                                        {/* RESORT AMENITIES */}
                                        <div>
                                            <h3 className="font-bold mb-2">
                                                Resort
                                                Amenities
                                            </h3>

                                            <QuillEditor
                                                value={
                                                    room.resortAmenities
                                                }
                                                onChange={(
                                                    val
                                                ) => {
                                                    formik.setFieldValue(
                                                        `rooms.${roomIndex}.resortAmenities`,
                                                        val
                                                    );
                                                }}
                                            />

                                            {formik
                                                .errors
                                                .rooms?.[
                                                roomIndex
                                            ]
                                                ?.resortAmenities && (
                                                    <p className="text-red-500 text-sm mt-1">
                                                        {
                                                            formik
                                                                .errors
                                                                .rooms[
                                                                roomIndex
                                                            ]
                                                                .resortAmenities
                                                        }
                                                    </p>
                                                )}
                                        </div>

                                        {/* SAVE ROOM */}
                                        <div className="flex justify-end">
                                            <Button
                                                type="button"
                                                onClick={() =>
                                                    saveRoom(
                                                        roomIndex
                                                    )
                                                }
                                            >
                                                Save
                                                Room
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
                            onClick={addRoom}
                        >
                            +
                            Add
                            Room
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

export default RoomDetails;