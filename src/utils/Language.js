import {useContext} from "react";
import {SettingsContext} from "../contexts/SettingsContext";

export const Languages = [
    { label: "Chinese", value: "zh"},
    { label: "English", value: "en"}
]

/**
 *
 * @param lang {string}
 * @param props? {string | {[key: string]: string}}
 * @return {string}
 */
export function locale(lang, props) {
    if (props == null) return props

    if (typeof props === "string")
        return props

    return props[lang] || props["en"]
}

/**
 * @return {(props: string | {[key: string]: string}) => string}
 */
export function useLocale() {
    const {language} = useContext(SettingsContext)

    return (props) => locale(language, props)
}

/**
 * @param props {{[key: string]: string}}
 * @constructor
 */
export function Locale(props) {
    const {language} = useContext(SettingsContext)

    return props[language] || props["en"]
}