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

    // Save a single section immediately. The backend `update` does a partial
    // update (only fields present in the body are written), so each tab persists
    // on its own without disturbing the others. Refetch afterwards so switching
    // tabs (MUI unmounts inactive panels) always reflects what was just saved.
    // Throws on failure so the calling section can surface the real error.
    const saveSection = async (partial) => {
        await put(`destination/${slug}`, partial);
        await fetchPropertyDetails();
    };

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
                            onSave={saveSection}
                            existData={formData}
                        />
                    </TabPanel>

                    {/* STEP 2 */}
                    <TabPanel value="2">
                        <RoomDetails
                            onSave={saveSection}
                            existData={formData}
                        />
                    </TabPanel>

                    {/* STEP 3 */}
                    <TabPanel value="3">
                        <Amenties
                            onSave={saveSection}
                            existData={formData}
                        />
                    </TabPanel>

                    {/* STEP 4 */}
                    <TabPanel value="4">
                        <Locations
                            onSave={saveSection}
                            existData={formData}
                        />
                    </TabPanel>
                </TabContext>
            </Box>
        </>
    );
};

export default Properties;