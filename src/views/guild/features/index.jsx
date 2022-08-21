import React, {useContext} from "react";

// Chakra imports
import {Box, Flex, Grid,} from "@chakra-ui/react";

// Custom components
import Banner from "./components/Banner";
import FeatureGrid from "./components/FeatureGrid";
import {FeaturesContext, FeaturesProvider} from "contexts/FeaturesContext";
import {usePageInfo} from "../../../contexts/PageInfoContext";
import {DataList} from "../../../components/card/data/DataCard";
import {config} from "../../../config/config";
import {useLocale} from "../../../utils/Language";

export default function FeaturesBoard() {
  return (
    <FeaturesProvider>
      <Features />
    </FeaturesProvider>
  );
}

function Features() {
  const locale = useLocale()

  usePageInfo(
      locale({zh: "功能控制面板", en: "Features"})
  )

  return <Box pt={{ base: "180px", md: "80px", xl: "80px" }}>
    <Content />
  </Box>
}

function Content() {
  const {data} = useContext(FeaturesContext)

  if (config.data.features) {

    return (
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
    );
  } else {
    return <Flex
          flexDirection="column"
          mb="10"
      >
        <Banner />
        <FeatureGrid />
      </Flex>
  }
}