import {Locale} from "../../utils/Language";

export const KillKane = {
    name: {
        zh: "自動殺死凱恩",
        en: "Auto Kill Kane"
    },
    description: <Locale zh="凱恩加入服務器時自動殺死凱恩" en="Kill Kane when he joined the server" />,
    options: values => [
        {
            id: "kill_friends",
            name: "殺死他的朋友",
            description: "當他的朋友加入時也殺死他們",
            type: "boolean", //boolean, string, enum, number, color, message_create, array, id_enum, image
            choices: null, //only enum type option have choices array
            value: true, //value must be nonnull in string, boolean, number type
        },
        {
            id: "message",
            name: "殺死他的朋友",
            description: "當他的朋友加入時也殺死他們",
            type: "string",
            value: values.message,
        },
        {
            id: "kill_friends_types",
            name: "殺死他的朋友",
            description: "當他的朋友加入時也殺死他們",
            type: "enum",
            choices: ["Gay", "Dalao", "None"],
            multiple: true, //allow selecting multi options, the value might be return as an array
            value: "Gay",
        },
        {
            id: "kill_friends_count",
            name: "殺死他的朋友",
            description: "當他的朋友加入時也殺死他們",
            type: "number",
            value: 1,
        },
        {
            id: "color",
            name: "我的顏色",
            description: "",
            type: "color",
            value: null,
        },
        {
            id: "kill_message",
            name: "我的顏色",
            description: "",
            type: "message_create",
            value: null,
        },
        {
            id: "all_targets",
            name: "All Targets",
            description: "",
            type: "array",
            element: {
                type: "string",
                holder: ""
            },
            value: null,
        },
        /**
         * to add a role or channel option, use id_enum and define choosable entries at choices
         * description is nullable, you may add the color arg to customize option color
         */
        {
            id: "channel",
            name: "Target Channel",
            description: "Where to kill people",
            type: "id_enum",
            choices: [
                { name: "General", description: "My chat channel", id: 432423 },
                { name: "Off-Topic", description: "Share your cool things", id: 534424 },
                { name: "NSFW", id: 696969, color: "#de5656" }
            ],
            element: { //nullable
                type: "channel" //supports channel and role
            },
            value: 432423, //id of enum
        },
        {
            id: "image",
            name: "Example Image",
            description: "A image",
            type: "image",
            value: "", //as image url, non-nullable
        },
        {
            id: "emoji",
            name: "Emoji Example",
            description: "Select an Emoji to see",
            type: "emoji",
            value: "", //id of enum
        },
        {
            id: "pair",
            name: "Pair Example",
            description: "Create a pair of strings",
            type: "pair",
            element: {
                first: {
                    type: "emoji",
                },
                second: { //option holder
                    type: "id_enum",
                    choices: [
                        {name: "Admin", id: 432423},
                    ],
                    element: {
                        type: "role"
                    },
                    multiple: true,
                }
            },
            value: ["☝️", []], //pair is an 2-length array
        }
    ]
}