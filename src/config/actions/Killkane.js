export const KillKaneAction = {
    name: "自動殺死凱恩",
    description: "凱恩加入服務器時自動殺死凱恩",
    options: values => [
        {
            id: "kill_friends_name",
            name: "殺死他的朋友",
            description: "當他的朋友加入時也殺死他們",
            type: "string",
            value: values.test,
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
    ]
}