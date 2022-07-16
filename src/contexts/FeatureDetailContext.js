import {createContext, useContext} from "react";
import {QueryHolder} from "./components/AsyncContext";
import {GuildContext} from "./guild/GuildContext";
import {getFeatureDetail} from "api/yeecord";
import {useQuery} from "react-query";
import {useParams} from "react-router-dom";

export const FeatureDetailContext = createContext({
  name: null,
  description: null,
  options: null,
});

export function FeatureDetailProvider({children}) {
  const { feature: featureId } = useParams()
  const { id: serverId } = useContext(GuildContext);
  const query = useQuery(["feature_detail", serverId, featureId] , () =>
      getFeatureDetail(serverId, featureId)
  )

  return (
    <QueryHolder query={query}>
        <FeatureDetailContext.Provider value={query.data}>
          {children}
        </FeatureDetailContext.Provider>
    </QueryHolder>
  );
}
