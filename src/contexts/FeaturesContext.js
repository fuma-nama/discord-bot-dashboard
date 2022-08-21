import {createContext, useContext} from "react";
import {QueryHolder} from "./components/AsyncContext";
import {getFeatures} from "api/internal";
import {GuildContext} from "./guild/GuildContext";
import {useQuery} from "react-query";

export const FeaturesContext = createContext({
    enabled: [],
    data: null
});

export function FeaturesProvider({children}) {
    const {id: serverId} = useContext(GuildContext);
    const query = useQuery(["features", serverId],
        () => getFeatures(serverId),
        { retry: 0 }
    )

  return (
    <QueryHolder query={query}>
        <FeaturesContext.Provider value={query.data}>
          {children}
        </FeaturesContext.Provider>
    </QueryHolder>
  );
}