import {createContext, useContext} from "react";
import {AsyncContext, QueryHolder} from "./components/AsyncContext";
import {getSettings} from "../api/yeecord";
import {GuildContext} from "./GuildContext";
import {useQuery} from "react-query";
import {getAccountInfo} from "../api/discord/DiscordApi";

export const SettingsContext = createContext({
    options: null
})
export function SettingsProvider({children}) {
    const {id: serverId} = useContext(GuildContext);
    const query = useQuery("settings", () =>
        getSettings(serverId)
    )

    return <QueryHolder {...query}>
        <SettingsContext.Provider value={query.data}>
            {children}
        </SettingsContext.Provider>
    }</QueryHolder>
}