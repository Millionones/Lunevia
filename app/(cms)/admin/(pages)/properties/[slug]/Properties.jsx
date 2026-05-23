"use client";

import React, { useState, useEffect } from "react";

import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";

import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

import PropertyDetails from "./PropertyDetails";
import RoomDetails from "./RoomDetails";
import Amenties from "./Amenties";
import Locations from "./Locations";

import { get, post, put } from "@/helpers/api";
import { useRouter } from "next/navigation";


const STORAGE_KEY = "propertyForm";

const Properties = ({ slug }) => {
    const router = useRouter();
    const [value, setValue] = useState("1");

    const [formData, setFormData] = useState({});


    const fetchPropertyDetails = async () => {
        const res = await get(`destination/${slug}`);

        let data = res.data;

        let formattedData = {
            step1: {
                title: data.title,
                mainImage: data.mainImage,
                locationLink: data.locationLink,
                aboutProperty: {
                    image: data.aboutProperty?.image,
                    description: data.aboutProperty?.description,
                    highlights: data.aboutProperty?.highlights,
                },
                galleryImages: data.galleryImages
            },
            step2: {
                rooms: data.roomDetails || []
            },
            step3: {
                amenities: data.amenties || []
            },
            step4: {
                locations: data.locations || []
            }
        };
        setFormData(formattedData);
    }

    // LOAD DATA ON PAGE REFRESH
    useEffect(() => {
        fetchPropertyDetails()
    }, []);

    // HANDLE TAB CHANGE
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    // UPDATE STEP DATA
    const updateData = (data) => {

        let updatedData = {
            ...formData,
        };

        // STEP 1
        if (value === "1") {
            updatedData.step1 = data;

            setValue("2");
        }

        // STEP 2
        if (value === "2") {
            updatedData.step2 = data;

            setValue("3");
        }

        // STEP 3
        if (value === "3") {
            updatedData.step3 = data;

            setValue("4");
        }

        // STEP 4
        if (value === "4") {
            updatedData.step4 = data;
            updateProperty(updatedData);
        }

        // UPDATE STATE
        setFormData(updatedData);

    };

    const updateProperty = async (data) => {
        // API CALL TO UPDATE PROPERTY
        // Use formData to get all the details from different steps

        let req = {
            ...data?.step1,
            roomDetails: [...data?.step2?.rooms],
            amenties: [...data?.step3?.amenities],
            locations: [...data?.step4?.locations],
        }

        const res = await put(`destination/${slug}`, req);
        console.log(res, "PROPERTY UPDATED");

        router.push("/admin/properties");
    }

    return (
        <>
            <Box
                sx={{
                    width: "100%",
                    typography: "body1",
                }}
            >
                <TabContext value={value}>
                    {/* TAB HEADERS */}
                    <Box
                        sx={{
                            borderBottom: 1,
                            borderColor: "divider",
                        }}
                    >
                        <TabList
                            onChange={handleChange}
                            aria-label="property form tabs"
                        >
                            <Tab
                                label="Property Details"
                                value="1"
                            />

                            <Tab
                                label="Rooms Details"
                                value="2"
                            />

                            <Tab
                                label="Amenities"
                                value="3"
                            />

                            <Tab
                                label="Near by Locations"
                                value="4"
                            />
                        </TabList>
                    </Box>

                    {/* STEP 1 */}
                    <TabPanel value="1">
                        <PropertyDetails
                            updateData={updateData}
                            existData={formData}
                        />
                    </TabPanel>

                    {/* STEP 2 */}
                    <TabPanel value="2">
                        <RoomDetails
                            updateData={updateData}
                            existData={formData}
                        />
                    </TabPanel>

                    {/* STEP 3 */}
                    <TabPanel value="3">
                        <Amenties
                            updateData={updateData}
                            existData={formData}
                        />
                    </TabPanel>

                    {/* STEP 4 */}
                    <TabPanel value="4">
                        <Locations
                            updateData={updateData}
                            existData={formData}
                        />
                    </TabPanel>
                </TabContext>
            </Box>
        </>
    );
};

export default Properties;