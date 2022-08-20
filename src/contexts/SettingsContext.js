import {createContext, useEffect, useState} from "react";

export const SettingsContext = createContext({
    updateSettings: (settings) => {},
    devMode: null,
    fixedWidth: null,
    language: "en"
})

export function SettingsProvider({children}) {
    const [settings, setSetting] = useState(() => ({
        devMode: getItem("dev_mode", false),
        fixedWidth: getItem("fixedWidth", true),
        language: getItem("lang", "en"),
        updateSettings: (v) => {
            setSetting(prev => ({
                ...prev,
                ...v
            }))
        }
    }))

    useEffect(() => {
            localStorage.setItem("lang", settings.language)
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