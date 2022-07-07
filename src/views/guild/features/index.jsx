import React, {useContext, useEffect} from "react";

// Chakra imports
import {
  Box,
  Button,
  Flex,
  Grid,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

// Custom components
import Banner from "./components/Banner";
import FeatureGrid from "./components/FeatureGrid";
import { FeaturesProvider } from "contexts/FeatureContext";
import {usePageInfo} from "../../../contexts/PageInfoContext";
import {BetaFeatures} from "./components/BetaFeatures";

export default function Marketplace() {
  return (
    <FeaturesProvider>
      <Features />
    </FeaturesProvider>
  );
}

function Features() {
  usePageInfo("功能控制板")

  return (
    <Box pt={{ base: "180px", md: "80px", xl: "80px" }}>
      {/* Main Fields */}
      <Grid
        mb="20px"
        gridTemplateColumns={{ xl: "repeat(3, 1fr)", "2xl": "1fr 0.46fr" }}
        gap={{ base: "20px", xl: "20px" }}
        display={{ base: "block", xl: "grid" }}
      >
        <Flex
          flexDirection="column"
          mb="10"
          gridArea={{ xl: "1 / 1 / 2 / 3", "2xl": "1 / 1 / 2 / 2" }}
        >
          <Banner />
          <FeatureGrid />
        </Flex>
        <Flex
          flexDirection="column"
          gridArea={{ xl: "1 / 3 / 2 / 4", "2xl": "1 / 2 / 2 / 3" }}
        >
          <BetaFeatures />
        </Flex>
      </Grid>
      {/* Delete Product */}
    </Box>
  );
}
