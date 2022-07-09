import {createContext, useContext} from "react";
import { QueryHolder} from "./components/AsyncContext";
import { getFeatures } from "api/yeecord";
import {GuildContext} from "./GuildContext";
import {useQuery} from "react-query";

export const FeatureContext = createContext({
  features: null,
  betaFeatures: null
});

export function FeaturesProvider({ children }) {
  const {id: serverId} = useContext(GuildContext);
  const query = useQuery(["features", serverId], () =>
      getFeatures(serverId)
  )

  return (
    <QueryHolder {...query}>
        <FeatureContext.Provider value={query.data}>
          {children}
        </FeatureContext.Provider>
    </QueryHolder>
  );
}
