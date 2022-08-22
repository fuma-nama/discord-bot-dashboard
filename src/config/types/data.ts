import {ReactJSXElement} from "@emotion/react/types/jsx-namespace";
import {ApexOptions} from "apexcharts";
import {TextElement} from "./locale";

export type DataItem = Group | Statistics | ChartData | PieChart | Table | List | InfoMap

type Item = {
    name: TextElement
}

type Statistics = Item & {
   type: "statistics"
    icon?: any | undefined
    value: number
}

type InfoMap = Item & {
    type: "info_map"
    description?: string,
    value: {name: string, value: any}[]
}

type ChartData = Item & {
    type: "line_chart" | "bar_chart"
    description?: string | undefined
    status?: {
        success: boolean,
        text: TextElement
    }
    value: ApexOptions['series']
    options: ApexOptions
    time_unit?: string | undefined
}

type PieChart = Item & {
   type: "pie_chart"
    unit?: string | undefined
    options: ApexOptions
    value: ApexOptions['series']
}

type Group = {
   type: "group"
    value: DataItem[]
}

type Table = Item & {
   type: "table"
    columns: {
        header: string,
        accessor: string,
        wrapper?: (v: any) => ReactJSXElement
    }[]
    value: any[]
}

type List = {
   type: "list",
    icon?: any,
    description?: string,
    value: {name: string, value: any}[]
}