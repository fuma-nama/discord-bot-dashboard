import {useContext} from "react";
import {SettingsContext} from "../contexts/SettingsContext";
import {useColorMode} from "@chakra-ui/react";

export function usePageState(add) {
    const {language} = useContext(SettingsContext)
    const {colorMode} = useColorMode()

    return {
        darkMode: colorMode === "dark",
        lang: language,
        ...add
    }
}

/**
 * @param children {(state: PageState) => any}
 * @return {*}
 * @constructor
 */
export function WithState({children}) {
    const state = usePageState()

    return children(state)
}