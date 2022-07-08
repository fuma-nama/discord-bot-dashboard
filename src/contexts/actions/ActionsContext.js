import {createContext} from "react";
import { QueryHolderSkeleton} from "../components/AsyncContext";
import {getActions} from "api/yeecord";
import {GuildContext} from "../GuildContext";
import {useQuery} from "react-query";

export const ActionsContext = createContext({
    actions: null
})

export function ActionsProvider({children}) {
    const {id: serverId} = createContext(GuildContext);
    const query = useQuery(["actions", serverId], () =>
        getActions(serverId)
    )

    return <QueryHolderSkeleton {...query}>{
        <ActionsContext.Provider value={{actions: query.data}}>
            {children}
        </ActionsContext.Provider>
    }</QueryHolderSkeleton>
}