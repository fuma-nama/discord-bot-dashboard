import {createContext} from "react";
import {QueryHolder} from "../components/AsyncContext";
import {getActionsData} from "api/internal";
import {GuildContext} from "../guild/GuildContext";
import {useQuery} from "react-query";

export const ActionsDataContext = createContext({})

export function ActionsDataProvider({children}) {
    const {id: serverId} = createContext(GuildContext);
    const query = useQuery(["actions", serverId], () =>
        getActionsData(serverId)
    )

    return <QueryHolder query={query}>
        <ActionsDataContext.Provider value={query.data}>
            {children}
        </ActionsDataContext.Provider>
    </QueryHolder>
}