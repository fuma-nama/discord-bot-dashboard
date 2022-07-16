import {createContext, useContext} from "react";
import {QueryHolder} from "../components/AsyncContext";
import {getSettings} from "../../api/yeecord";
import {GuildContext} from "./GuildContext";
import {useQuery} from "react-query";

export const SettingsContext = createContext({
    options: null
})

export function SettingsProvider({children}) {
    const {id: serverId} = useContext(GuildContext);
    const query = useQuery("settings", () =>
        getSettings(serverId)
    )

    return <QueryHolder query={query}>
        <SettingsContext.Provider value={query.data}>
            {children}
        </SettingsContext.Provider>
    </QueryHolder>
}