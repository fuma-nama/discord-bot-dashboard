import {createContext, useEffect, useState} from "react";

export const SettingsContext = createContext({
    setSettings: null,
    devMode: null,
    fixedWidth: null
})

export function SettingsProvider({children}) {
    const [settings, setSetting] = useState(() => ({
        devMode: getItem("dev_mode", false),
        fixedWidth: getItem("fixedWidth", true),
        setSettings: (v) => {
            setSetting(prev => ({
                ...prev,
                ...v
            }))
        }
    }))

    useEffect(() => {
            localStorage.setItem("dev_mode", settings.devMode)
            localStorage.setItem("fixedWidth", settings.fixedWidth)
        },
        [settings]
    )

    return <SettingsContext.Provider value={settings}>
        {children}
    </SettingsContext.Provider>
}

function getItem(key, initial) {
    const result = localStorage.getItem(key)

    if (result == null) {
        return initial
    }
    switch (typeof initial) {
        case "undefined":
        case "string":
            return result
        default:
            return JSON.parse(result)
    }
}