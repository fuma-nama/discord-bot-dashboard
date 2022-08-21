import {DataItem} from "./data";
import {TextElement} from "./locale";

export type Option =
    BooleanOption | TextOption | EnumOption | NumberOption
    | ColorOption | MessageCreateOption
    | ArrayOption | IdEnumOption | EmojiOption | PairOption

type IOption = {
    /**
     * Option id for server-side to read
     */
    id: string,
    /**
     * Field Name
     */
    name: string,
    /**
     * Nullable field description
     */
    description?: TextElement,
    /**
     * If this field is required, the user must enter something to save it
     */
    required?: boolean,
    /**
     * Help text for form control
     */
    helper?: TextElement
}

type BooleanOption = IOption & {
    type: "boolean"
    value?: boolean
}

type TextOption = IOption & {
    type: "string"
    value?: string
}

type EnumOption = IOption & {
    type: "enum"
    choice: string[]
    multiple: boolean
    value: string | string[]
}

type NumberOption = IOption & {
    type: "number"
    value: number
}

type ColorOption = IOption & {
    type: "color"
    value: string
}
type Message = {
    type: "embed" | "message",
    message?: string,
    embed?: {
        title: string,
        description: string,
        url: string,
        color: string,
        thumbnail: string,
        author: {
            name: string,
            link: string,
            icon: string
        },
        footer: string,
        fields: Field[]
    }
}

type Field = {
    name: string
    value: string
    inline: boolean
}

type MessageCreateOption = IOption & {
    type: "message_create"
    value: Message
}

type ArrayOption = IOption & {
    type: "array"
    element: {
        type: Option["type"]
        holder: any
    }
    value: any[] | null
}

type IdEnumOption = IOption & {
    type: "id_enum"
    placeholder?: string
    choices: [
        {
            id: number
            name: string
            color?: string
            icon: "channel" | "role" | any
        }
    ]
    value: number
}

type EmojiOption = IOption & {
    type: "emoji"
    value: string
}

type PairOption = IOption & {
    type: "pair"
    element: {
        first: DataItem,
        second: DataItem
    }
    value: [first: any, second: any]
}