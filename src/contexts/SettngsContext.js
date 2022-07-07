import {createContext, useContext} from "react";
import {AsyncContext} from "./components/AsyncContext";
import {getSettings} from "../api/yeecord";
import {GuildContext} from "./GuildContext";

export const SettingsContext = createContext({
    options: null
})
export function SettingsProvider({children}) {
    const {id: serverId} = useContext(GuildContext);

    return <AsyncContext fetch={() => getSettings(serverId)}>{info =>
        <SettingsContext.Provider value={info}>
            {children}
        </SettingsContext.Provider>
    }</AsyncContext>
}