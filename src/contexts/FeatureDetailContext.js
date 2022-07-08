import { createContext, useContext } from "react";
import {AsyncContext, QueryHolder} from "./components/AsyncContext";
import { GuildContext } from "./GuildContext";
import { getFeatureDetail } from "api/yeecord";
import {useQuery} from "react-query";

export const FeatureDetailContext = createContext({
  name: null,
  description: null,
  options: null,
});

export function FeatureDetailProvider({ featureId, children }) {
  const { id: serverId } = useContext(GuildContext);
  const query = useQuery(["feature_detail", serverId, featureId] , () =>
      getFeatureDetail(serverId, featureId)
  )

  return (
    <QueryHolder {...query}>
        <FeatureDetailContext.Provider value={query.data}>
          {children}
        </FeatureDetailContext.Provider>
    </QueryHolder>
  );
}
