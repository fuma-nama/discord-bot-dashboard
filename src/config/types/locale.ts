import {ReactJSXElement} from "@emotion/react/types/jsx-namespace";

export type MultiLang = string | {
    en: string
    [lang: string]: string
}

export type TextElement = string | ReactJSXElement