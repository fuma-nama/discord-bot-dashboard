import {Box} from "@chakra-ui/react";
import React from "react";
import {Outlet} from "react-router-dom"

export function FeaturesLayout() {
    return <Box pt={{ base: "180px", md: "80px", xl: "80px" }}>
        <Outlet />
    </Box>
}