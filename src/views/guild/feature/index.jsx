import React, {useContext, useMemo} from "react";

import {Box, Flex,} from "@chakra-ui/react";

// Custom components
import Banner from "./components/Banner";
import {updateFeatureOptions} from "api/yeecord";

import {FeatureDetailContext, FeatureDetailProvider, useFeatureInfo,} from "contexts/FeatureDetailContext";
import {usePageInfo} from "contexts/PageInfoContext";
import {GuildContext} from "contexts/guild/GuildContext";
import {ConfigGrid} from "components/fields/ConfigPanel";
import {config} from "config/config";
import NotFound from "../../info/Not_Found";
import {useParams} from "react-router-dom";
import {useQueryClient} from "react-query";

export default function Feature() {
  const { feature } = useParams()

  if (config.features[feature] == null) {
    return <NotFound />
  } else {
    return <FeaturePanel />
  }
}

function FeaturePanel() {
  const {id, name} = useFeatureInfo()

  usePageInfo(name)

  return (
      <Box pt={{ base: "180px", md: "80px", xl: "80px" }}>
        <Flex
            flexDirection="column"
            mb="10"
            gridArea={{ xl: "1 / 1 / 2 / 3", "2xl": "1 / 1 / 2 / 2" }}
        >
          <Banner />
          <FeatureDetailProvider featureId={id}>
            <FeatureConfigPanel />
          </FeatureDetailProvider>
        </Flex>
      </Box>
  );
}

function FeatureConfigPanel() {
  const {id: serverId } = useContext(GuildContext);
  const {values} = useContext(FeatureDetailContext)
  const info = useFeatureInfo()

  const client = useQueryClient()
  const options = useMemo(
      () => info.options(values),
      [info.id, values]
  )

  const onSave = (changes) => updateFeatureOptions(serverId, info.id, changes);
  const onSaved = (data) => {

    return client.setQueryData(["feature_detail", serverId, info.id], current => ({
          ...current,
          values: data
        })
    )
  }

  return <ConfigGrid
      onSave={onSave}
      options={options}
      onSaved={onSaved}
  />
}