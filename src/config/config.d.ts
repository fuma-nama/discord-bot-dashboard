import {Feature, FeatureOption} from "./types/option";
import {DataItem} from "./types/data";

export type DashboardDataRow = {
    advanced: boolean,
    count: number,
    items: (detail: any) => DataItem[]
}

type Features = {
    features: Feature[]
    [key: string]: any
}
type FooterItem = {
    name: string,
    url: string
}

export type ConfigType = {
    name: string,
    features: {
        [key: string]: (data: any) => FeatureOption[]
    },
    data: {
        features: (data: Features) => DataItem[],
        dashboard: DashboardDataRow[]
    },
    footer: FooterItem[]
}