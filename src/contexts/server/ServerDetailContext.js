import {createContext, useContext} from "react";
import {QueryHolder} from "../components/AsyncContext";
import {useQuery} from "react-query";
import {getServerDetails} from "../../api/yeecord";
import {GuildContext} from "../GuildContext";

export const ServerDetailContext = createContext({
    detail: null
})

export function ServerDetailProvider({children}) {
    const {id: serverId} = useContext(GuildContext)

    const query = useQuery(
        ["server_detail", serverId],
        () => getServerDetails(serverId)
    )

    return <QueryHolder query={query}>
        <ServerDetailContext.Provider value={{
            detail: query.data
        }}>
            {children}
        </ServerDetailContext.Provider>
    </QueryHolder>
}