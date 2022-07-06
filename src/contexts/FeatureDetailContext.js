import { createContext, useContext } from "react";
import { AsyncContext } from "./components/AsyncContext";
import { GuildContext } from "./GuildContext";
import { getFeatureDetail } from "api/yeecord";

export const FeatureDetailContext = createContext({
  name: null,
  description: null,
  options: null,
});

export function FeatureDetailProvider({ featureId, children }) {
  const { id: serverId } = useContext(GuildContext);

  return (
    <AsyncContext fetch={() => getFeatureDetail(serverId, featureId)}>
      {(detail) => (
        <FeatureDetailContext.Provider value={detail}>
          {children}
        </FeatureDetailContext.Provider>
      )}
    </AsyncContext>
  );
}
