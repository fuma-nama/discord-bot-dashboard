import {createContext, useContext} from "react";
import { AsyncContext } from "./components/AsyncContext";
import { getFeatures } from "api/yeecord";
import {GuildContext} from "./GuildContext";

export const FeatureContext = createContext({
  features: null,
  betaFeatures: null
});

export function FeaturesProvider({ children }) {
  const {id: serverId} = useContext(GuildContext);

  return (
    <AsyncContext fetch={() => getFeatures(serverId)}>
      {(features) => (
        <FeatureContext.Provider value={features}>
          {children}
        </FeatureContext.Provider>
      )}
    </AsyncContext>
  );
}
