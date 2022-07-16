import React, {useContext} from "react";

import {Box, Flex,} from "@chakra-ui/react";

// Custom components
import Banner from "./components/Banner";
import {updateFeatureOptions} from "api/yeecord";

import {FeatureDetailContext, FeatureDetailProvider,} from "contexts/FeatureDetailContext";
import {usePageInfo} from "../../../contexts/PageInfoContext";
import {GuildContext} from "../../../contexts/guild/GuildContext";
import {ConfigPanel} from "../../../components/fields/ConfigPanel";

export default function FeaturePanel() {

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
