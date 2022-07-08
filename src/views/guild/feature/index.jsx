import React from "react";

import {
  Box,
  Flex,
  useColorModeValue,
} from "@chakra-ui/react";

// Custom components
import Banner from "./components/Banner";
import { updateFeatureOptions } from "api/yeecord";

import {
  FeatureDetailProvider,
  FeatureDetailContext,
} from "contexts/FeatureDetailContext";
import { useContext } from "react";
import {usePageInfo} from "../../../contexts/PageInfoContext";
import {GuildContext} from "../../../contexts/GuildContext";
import {ConfigPanel} from "../../../components/fields/ConfigPanel";

export default function FeaturePanel() {
  const textColor = useColorModeValue("secondaryGray.900", "white");

  return (
    <FeatureDetailProvider>
      <Box pt={{ base: "180px", md: "80px", xl: "80px" }}>
        {/* Main Fields */}
        <Flex
            flexDirection="column"
            mb="10"
            gridArea={{ xl: "1 / 1 / 2 / 3", "2xl": "1 / 1 / 2 / 2" }}
        >
          <Banner />
          <FeatureConfigPanel />
        </Flex>
      </Box>
    </FeatureDetailProvider>
  );
}

function FeatureConfigPanel() {
  const {id: serverId } = useContext(GuildContext);
  const feature = useContext(FeatureDetailContext)
  usePageInfo(feature.name)

  const onSave = (changes) => updateFeatureOptions(serverId, feature.id, changes);

  return (
      <ConfigPanel onSave={onSave} options={feature.options} />
  );
}
