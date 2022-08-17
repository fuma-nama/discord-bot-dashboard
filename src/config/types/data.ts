import {ReactJSXElement} from "@emotion/react/types/jsx-namespace";
import {ApexOptions} from "apexcharts";

export type DataItem = Group | Statistics | LineChart | BarChart | PieChart | Table | List | InfoMap

interface Statistics {
   type: "statistics"
    name: string
    icon?: any | undefined
    value: number
}

interface InfoMap {
    type: "info_map"
    name: string
    description?: string,
    value: {name: string, value: any}[]
}

interface LineChart extends ChartData {
   type: "line_chart"
}

interface BarChart extends ChartData {
   type: "bar_chart"
}

interface ChartData {
    name: string
    description?: string | undefined
    status?: {
        success: boolean,
        text: string
    }
    value: ApexOptions['series']
    options: ApexOptions
    time_unit?: string | undefined
}

interface PieChart {
   type: "pie_chart"
    name: string
    unit?: string | undefined
    options: ApexOptions
    value: ApexOptions['series']
}

interface Group {
   type: "group"
}

interface Table {
   type: "table"
    name: string
    columns: {
        header: string,
        accessor: string,
        wrapper?: (v: any) => ReactJSXElement
    }[]
    value: any[]
}

interface List {
   type: "list",
    icon?: any,
    description?: string,
    value: {name: string, value: any}[]
}