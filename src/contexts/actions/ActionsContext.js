import {createContext} from "react";
import {QueryHolder} from "../components/AsyncContext";
import {getActionsData} from "api/yeecord";
import {GuildContext} from "../guild/GuildContext";
import {useQuery} from "react-query";

export const ActionsContext = createContext({})

export function ActionsProvider({children}) {
    const {id: serverId} = createContext(GuildContext);
    const query = useQuery(["actions", serverId], () =>
        getActionsData(serverId)
    )

    return <QueryHolder query={query}>
        <ActionsContext.Provider value={query.data}>
            {children}
        </ActionsContext.Provider>
    </QueryHolder>
}