import {Option} from "./types/option";
import {DataItem} from "./types/data";
import {MultiLang, TextElement} from "./types/locale";

export declare const config: ConfigType

export type PageState = {
    /**
     * User's Language
     */
    lang: "en" | "zh"
    darkMode: boolean
}

export type DashboardState = PageState & {
    /**
     * Advanced Data, only exists if `advanced` is true
     */
    advanced: any | undefined
}

export type OptionState = PageState & {
    /**
     * Additional Data, Defined by Server
     */
    data: any
}

export type DashboardDataRow = {
    advanced: boolean,
    count: number,
    items: (detail: any, state: DashboardState) => DataItem[]
}

type FooterItem = {
    name: MultiLang,
    url: string
}

export type ConfigType = {
    name: string,
    actions: {
        [key: string]: {
            banner?: any,
            name: MultiLang,
            description: TextElement,
            options: (data: any | null, state: OptionState) => Option[]
        }
    },
    features: {
        [key: string]: {
            banner?: any,
            name: MultiLang,
            description: TextElement,
            options: (data: any, state: OptionState) => Option[]
        }
    },
    settings: (data: any) => Option[]
    data: {
        features?: (data: any) => DataItem[],
        dashboard: DashboardDataRow[],
        actions?: (data: any) => DataItem[]
    },
    footer: FooterItem[],
    serverUrl: string,
    inviteUrl: string,
    /**
     * The tutorial or document website of the bot
     */
    tutorialUrl?: string,
}