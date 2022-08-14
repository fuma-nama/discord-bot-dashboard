import React, {useContext, useMemo} from "react";

import {Box, Flex, Stack,} from "@chakra-ui/react";

// Custom components
import Banner from "./components/Banner";
import {updateFeatureOptions} from "api/yeecord";

import {FeatureDetailContext, FeatureDetailProvider,} from "contexts/FeatureDetailContext";
import {usePageInfo} from "contexts/PageInfoContext";
import {GuildContext} from "contexts/guild/GuildContext";
import {ConfigGrid, ConfigPanel} from "components/fields/ConfigPanel";
import {config} from "config/config";
import NotFound from "../../info/Not_Found";
import {useParams} from "react-router-dom";

export default function FeaturePanel() {
  const { feature: featureId } = useParams()

  if (config.features[featureId] == null) {
    return <NotFound />
  }

  return (
    <FeatureDetailProvider featureId={featureId}>
      <Box pt={{ base: "180px", md: "80px", xl: "80px" }}>
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
  const detail = useContext(FeatureDetailContext)
  usePageInfo(detail.name)

  const options = useMemo(
      () => config.features[detail.id].options(detail.values),
      [detail.id]
  )

  const onSave = (changes) => updateFeatureOptions(serverId, detail.id, changes);

  return (
        <ConfigGrid onSave={onSave} options={options} />
  )
}
