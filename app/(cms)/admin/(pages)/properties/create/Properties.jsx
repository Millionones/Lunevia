"use client";
import React, { useState, useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { get, post } from "@/helpers/api";
import toast from "react-hot-toast";
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";


import PropertyDetails from "./PropertyDetails";
import RoomDetails from "./RoomDetails";
import Amenties from "./Amenties";
import Locations from "./Locations";

const STORAGE_KEY = "propertyForm";

const Properties = () => {


    const [value, setValue] = useState('1');
    const [formData, setFormData] = useState({})

    useEffect(() => {
        let data = getFromLocalStorage()

        if (data) {
            console.log(data, 'use effect')
            setFormData(JSON.parse(data));
        }
    }, [])

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const getFromLocalStorage = () => {
        const savedData = localStorage.getItem(STORAGE_KEY);

        return savedData
    }

    const updateData = (data) => {
        const existing = getFromLocalStorage();

        let parsedData = existing ? JSON.parse(existing) : {};

        const updatedData = {
            ...parsedData,
            ...data,
        };

        setFormData(updatedData);

        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(updatedData)
        );
    };
    return (
        <>
            <Box sx={{ width: '100%', typography: 'body1' }}>
                <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList onChange={handleChange} aria-label="lab API tabs example">
                            <Tab label="Property Details" value="1" />
                            <Tab label="Rooms Details" value="2" />
                            <Tab label="Ameneties" value="3" />
                            <Tab label="Near by Locations" value="4" />
                        </TabList>
                    </Box>
                    <TabPanel value="1">
                        <PropertyDetails updateData={updateData} existData={formData} />
                    </TabPanel>
                    <TabPanel value="2">
                        <RoomDetails />
                    </TabPanel>
                    <TabPanel value="3">
                        <Amenties />
                    </TabPanel>
                    <TabPanel value="4">
                        <Locations />
                    </TabPanel>
                </TabContext>
            </Box>
        </>
    );
};

export default Properties;