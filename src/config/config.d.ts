import {Option} from "./types/option";
import {DataItem} from "./types/data";

export declare const config: ConfigType

export type DashboardDataRow = {
    advanced: boolean,
    count: number,
    items: (detail: any) => DataItem[]
}

type FooterItem = {
    name: string,
    url: string
}

export type ConfigType = {
    name: string,
    actions: {
        [key: string]: {
            banner?: any,
            name: string,
            description: string,
            options: (data: any | null) => Option[]
        }
    },
    features: {
        [key: string]: {
            banner?: any,
            name: string,
            description: string,
            options: (data: any) => Option[]
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
    inviteUrl: string
}