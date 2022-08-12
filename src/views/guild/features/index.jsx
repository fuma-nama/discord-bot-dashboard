import React, {useContext} from "react";

// Chakra imports
import {
  Box,
  Flex,
  Grid,


} from "@chakra-ui/react";

// Custom components
import Banner from "./components/Banner";
import FeatureGrid from "./components/FeatureGrid";
import {FeaturesContext, FeaturesProvider, useFeaturesDataQuery} from "contexts/FeaturesContext";
import {usePageInfo} from "../../../contexts/PageInfoContext";
import {DataList} from "../../../components/card/DataCard";
import {config} from "../../../config/config";

export default function FeaturesBoard() {
  return (
    <FeaturesProvider>
      <Features />
    </FeaturesProvider>
  );
}

function Features() {
  usePageInfo("功能控制板")
  const {data} = useContext(FeaturesContext)

  if (config.data.features) {

    return (
        <Box pt={{ base: "180px", md: "80px", xl: "80px" }}>
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
              <DataList items={config.data.features(data)} />
            </Flex>
          </Grid>
        </Box>
    );
  } else {
    return <Box pt={{ base: "180px", md: "80px", xl: "80px" }}>
      <Flex
          flexDirection="column"
          mb="10"
      >
        <Banner />
        <FeatureGrid />
      </Flex>
    </Box>
  }
}