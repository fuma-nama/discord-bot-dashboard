import { createContext } from "react";
import { AsyncContext } from "./components/AsyncContext";
import { getFeatures } from "api/yeecord";

export const FeatureContext = createContext({
  features: null,
});

export function FeaturesProvider({ children }) {
  return (
    <AsyncContext fetch={() => getFeatures()}>
      {(features) => (
        <FeatureContext.Provider value={{ features }}>
          {children}
        </FeatureContext.Provider>
      )}
    </AsyncContext>
  );
}
