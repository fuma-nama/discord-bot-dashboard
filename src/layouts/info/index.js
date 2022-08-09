// noinspection ES6UnusedImports

import React from "react";
import SignIn from "views/auth/signIn";
// Chakra imports
import {Box, useColorModeValue} from "@chakra-ui/react";
import AuthProcessing from "../../views/auth/signIn/processing";

// Layout components

// Custom Chakra theme
export default function Info() {
  // states and functions
  // functions for changing the states from components
  const authBg = useColorModeValue("white", "navy.900");
  document.documentElement.dir = "ltr";
  return (
      <Box
          bg={authBg}
          float="right"
          minHeight="100vh"
          height="100%"
          position="relative"
          w="100%"
          transition="all 0.33s cubic-bezier(0.685, 0.0473, 0.346, 1)"
          transitionDuration=".2s, .2s, .35s"
          transitionProperty="top, bottom, width"
          transitionTimingFunction="linear, linear, ease"
      >
        <Box mx="auto" minH="100vh">
        </Box>
      </Box>
  );
}