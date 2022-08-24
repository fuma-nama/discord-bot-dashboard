import React, {useContext, useMemo} from "react";

import {Flex} from "@chakra-ui/react";

// Custom components
import {updateFeatureOptions} from "api/internal";

import {useFeatureDetailQuery, useFeatureInfo,} from "contexts/FeatureDetailContext";
import {GuildContext} from "contexts/guild/GuildContext";
import {ConfigGrid, ConfigGridSkeleton} from "components/fields/ConfigPanel";
import {config} from "config/config";
import NotFound from "../../info/Not_Found";
import {useParams} from "react-router-dom";
import {useQueryClient} from "react-query";
import {usePageState} from "utils/State";
import {useLocale} from "utils/Language";
import useBanner from "./components/Banner";

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
    const locale = useLocale()
    const query = useFeatureDetailQuery(id)
    useBanner(locale(name))

    return (
        <Flex
            flexDirection="column"
            mb="10"
        >
            {query.isLoading?
                <ConfigGridSkeleton />
                :
                <FeatureConfigPanel detail={query.data} />
            }
        </Flex>
    );
}

function FeatureConfigPanel({detail}) {
    const { id: serverId } = useContext(GuildContext);
    const state = usePageState()
    const info = useFeatureInfo()
    const {values} = detail

    const client = useQueryClient()
    const options = useMemo(
        () => info.options(values, state),
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