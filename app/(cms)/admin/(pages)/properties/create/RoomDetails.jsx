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

        onSubmit: async (values) => {
            try {
                // console.log(values);
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

            return res.data
                .new_filename;
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
    const saveRoom = (
        roomIndex
    ) => {
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

                                            {/* DETAILS */}
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
                                                    onChange={(
                                                        e
                                                    ) => {
                                                        const updated =
                                                            [
                                                                ...formik
                                                                    .values
                                                                    .rooms,
                                                            ];

                                                        updated[
                                                            roomIndex
                                                        ].title =
                                                            e
                                                                .target
                                                                .value;

                                                        formik.setFieldValue(
                                                            "rooms",
                                                            updated
                                                        );
                                                    }}
                                                />
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
                                                            src={`${BASE_URL}/${room.image}`}
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
                                                                            .rooms,
                                                                    ];

                                                                updated[
                                                                    roomIndex
                                                                ].image =
                                                                    "";

                                                                formik.setFieldValue(
                                                                    "rooms",
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
                                                                    "rooms"
                                                                );

                                                            const updated =
                                                                [
                                                                    ...formik
                                                                        .values
                                                                        .rooms,
                                                                ];

                                                            updated[
                                                                roomIndex
                                                            ].image =
                                                                uploadedPath;

                                                            formik.setFieldValue(
                                                                "rooms",
                                                                updated
                                                            );
                                                        }}
                                                    />
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
                                                    onChange={(
                                                        e
                                                    ) => {
                                                        const updated =
                                                            [
                                                                ...formik
                                                                    .values
                                                                    .rooms,
                                                            ];

                                                        updated[
                                                            roomIndex
                                                        ].price =
                                                            e
                                                                .target
                                                                .value;

                                                        formik.setFieldValue(
                                                            "rooms",
                                                            updated
                                                        );
                                                    }}
                                                />
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
                                                    const updated =
                                                        [
                                                            ...formik
                                                                .values
                                                                .rooms,
                                                        ];

                                                    updated[
                                                        roomIndex
                                                    ].description =
                                                        val;

                                                    formik.setFieldValue(
                                                        "rooms",
                                                        updated
                                                    );
                                                }}
                                            />
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
                                                        className="flex gap-4 mt-3 items-center"
                                                    >
                                                        {/* FEATURE */}
                                                        <Autocomplete
                                                            className="w-1/2"
                                                            value={
                                                                feature.label
                                                            }
                                                            onChange={async (
                                                                event,
                                                                newValue
                                                            ) => {
                                                                const updated =
                                                                    [
                                                                        ...formik
                                                                            .values
                                                                            .rooms,
                                                                    ];

                                                                if (
                                                                    typeof newValue ===
                                                                    "string"
                                                                ) {
                                                                    updated[
                                                                        roomIndex
                                                                    ].features[
                                                                        featureIndex
                                                                    ].label =
                                                                        newValue;
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

                                                                    updated[
                                                                        roomIndex
                                                                    ].features[
                                                                        featureIndex
                                                                    ].label =
                                                                        newValue.inputValue;
                                                                } else {
                                                                    updated[
                                                                        roomIndex
                                                                    ].features[
                                                                        featureIndex
                                                                    ].label =
                                                                        newValue?.name ||
                                                                        "";
                                                                }

                                                                formik.setFieldValue(
                                                                    "rooms",
                                                                    updated
                                                                );
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

                                                        {/* VALUE */}
                                                        <TextField
                                                            className="w-1/2"
                                                            label="Value"
                                                            value={
                                                                feature.answer
                                                            }
                                                            onChange={(
                                                                e
                                                            ) => {
                                                                const updated =
                                                                    [
                                                                        ...formik
                                                                            .values
                                                                            .rooms,
                                                                    ];

                                                                updated[
                                                                    roomIndex
                                                                ].features[
                                                                    featureIndex
                                                                ].answer =
                                                                    e
                                                                        .target
                                                                        .value;

                                                                formik.setFieldValue(
                                                                    "rooms",
                                                                    updated
                                                                );
                                                            }}
                                                        />

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
                                                    const updated =
                                                        [
                                                            ...formik
                                                                .values
                                                                .rooms,
                                                        ];

                                                    updated[
                                                        roomIndex
                                                    ].availableFeatures =
                                                        val;

                                                    formik.setFieldValue(
                                                        "rooms",
                                                        updated
                                                    );
                                                }}
                                            />
                                        </div>

                                        {/* Resort Amenities */}
                                        <div>
                                            <h3 className="font-bold mb-2">
                                                Resort Amenities
                                            </h3>

                                            <QuillEditor
                                                value={
                                                    room.resortAmenities
                                                }
                                                onChange={(
                                                    val
                                                ) => {
                                                    const updated =
                                                        [
                                                            ...formik
                                                                .values
                                                                .rooms,
                                                        ];

                                                    updated[
                                                        roomIndex
                                                    ].resortAmenities =
                                                        val;

                                                    formik.setFieldValue(
                                                        "rooms",
                                                        updated
                                                    );
                                                }}
                                            />
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