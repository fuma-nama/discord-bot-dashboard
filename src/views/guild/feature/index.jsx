import React, { useState } from "react";

import {
  Box,
  Button,
  Flex,
  Grid,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

// Custom components
import { OptionPanel } from "components/fields/OptionPanel";
import { SaveAlert } from "../../../components/alert/SaveAlert";
import Banner from "./components/Banner";
import TableTopCreators from "./components/TableTopCreators";
import Card from "components/card/Card.js";
import tableDataTopCreators from "./variables/tableDataTopCreators.json";
import { tableColumnsTopCreators } from "./variables/tableColumnsTopCreators";
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
