import {createContext, useContext} from "react";
import {GuildContext} from "./guild/GuildContext";
import {getFeatureDetail} from "api/internal";
import {useQuery} from "react-query";
import {useParams} from "react-router-dom";
import {config} from "../config/config";

export const FeatureDetailContext = createContext({
  values: null
});

export function useFeatureDetailQuery(featureId) {
    const { id: serverId } = useContext(GuildContext);

    return useQuery(["feature_detail", serverId, featureId],
        () => getFeatureDetail(serverId, featureId),
        {
            retry: 0
        }
    )
}

export function useFeatureInfo() {
    const { feature } = useParams()

    return {
        id: feature,
        ...config.features[feature]
    }
}