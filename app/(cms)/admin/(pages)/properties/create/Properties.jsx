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

import { get, post } from "@/helpers/api";
import { useRouter } from "next/navigation";


const STORAGE_KEY = "propertyForm";

const Properties = () => {
    const router = useRouter();
    const [value, setValue] = useState("1");

    const [formData, setFormData] = useState({});

    // GET DATA FROM LOCAL STORAGE
    const getFromLocalStorage = () => {
        if (typeof window === "undefined") return null;

        return localStorage.getItem(STORAGE_KEY);
    };

    // LOAD DATA ON PAGE REFRESH
    useEffect(() => {
        const data = getFromLocalStorage();

        if (data) {
            const parsed = JSON.parse(data);

            setFormData(parsed);

            // OPTIONAL:
            // Automatically move to last completed step

            if (parsed.step4) {
                setValue("4");
            } else if (parsed.step3) {
                setValue("3");
            } else if (parsed.step2) {
                setValue("2");
            } else if (parsed.step1) {
                setValue("1");
            }
        }
    }, []);

    // HANDLE TAB CHANGE
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    // UPDATE STEP DATA
    const updateData = (data) => {
        const existing = getFromLocalStorage();

        let parsedData = existing
            ? JSON.parse(existing)
            : {};

        let updatedData = {
            ...parsedData,
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
            addProperty(updatedData);
        }

        // UPDATE STATE
        setFormData(updatedData);

        // SAVE TO STORAGE
        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(updatedData)
        );
    };

    // CLEAR ALL DATA
    const clearForm = () => {
        localStorage.removeItem(STORAGE_KEY);

        setFormData({});

        setValue("1");
    };

    const addProperty = async (data) => {
        // API CALL TO ADD PROPERTY
        // Use formData to get all the details from different steps

        let req = {
            ...data?.step1,
             roomDetails:[...data?.step2?.rooms],
            amenties:[...data?.step3?.amenities],
            locations:[...data?.step4?.locations],
        }

        const res = await post("destination", req);

        localStorage.removeItem(
            STORAGE_KEY
        );

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