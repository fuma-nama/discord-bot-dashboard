import exmapleImage from "assets/img/common/logo_1024x1024.png";

const AuthHeaders = {
    userId: 6969696969696,
    //you may add some headers soon
}
/**
 * Options can be defined from either backend or frontend
 * An option of feature, going to support following types soon:
 *
 * Date, Time, File, Emoji, Pair<T, T>
 */
export const ExampleOption = {
    id: "kill_friends",
    name: "殺死他的朋友",
    description: "當他的朋友加入時也殺死他們",
    type: "boolean", //boolean, string, enum, number, color, message_create, array, id_enum, image
    value: true, //value must be nonnull in string, boolean, number type
};

export const ExampleOption2 = {
    id: "kill_friends_name",
    name: "殺死他的朋友",
    description: "當他的朋友加入時也殺死他們",
    type: "string",
    value: "test",
};
export const ExampleOption3 = {
    id: "kill_friends_types",
    name: "殺死他的朋友",
    description: "當他的朋友加入時也殺死他們",
    type: "enum",
    choices: ["Gay", "Dalao", "None"],
    multiple: true, //allow selecting multi options, the value might be return as an array
    value: "Gay",
};
export const ExampleOption4 = {
    id: "kill_friends_count",
    name: "殺死他的朋友",
    description: "當他的朋友加入時也殺死他們",
    type: "number",
    value: 1,
};
export const ExampleOption5 = {
    id: "color",
    name: "我的顏色",
    description: "",
    type: "color",
    value: null,
}
export const ExampleOption6 = {
    id: "kill_message",
    name: "我的顏色",
    description: "",
    type: "message_create",
    value: null,
}
export const ExampleOption7 = {
    id: "all_targets",
    name: "All Targets",
    description: "",
    type: "array",
    element: {
        type: "string",
        holder: ""
    },
    value: null,
}
/**
 * to add a role or channel option, use id_enum and define choosable entries at choices
 * description is nullable, you may add the color arg to customize option color
 */
export const ExampleOption8 = {
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
}
export const ExampleOption9 = {
    id: "image",
    name: "Example Image",
    description: "A image",
    type: "image",
    value: "", //as image url, non-nullable
}
export const ExampleOption10 = {
    id: "emoji",
    name: "Emoji Example",
    description: "Select an Emoji to see",
    type: "emoji",
    value: "", //id of enum
}
export const ExampleOption11 = {
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

export const ExampleOptions = [
    ExampleOption,
    ExampleOption2,
    ExampleOption3,
    ExampleOption4,
    ExampleOption5,
    ExampleOption6,
    ExampleOption7,
    ExampleOption8,
    ExampleOption9,
    ExampleOption10,
    ExampleOption11
]

//Used to test to async function
export const features = [
    {
        id: "auto_kill_kane",
        banner: null, //use default banner
        name: "自動殺死凱恩",
        description: "凱恩加入服務器時自動殺死凱恩",
        enabled: false,
    },
    {
        id: "auto_destroy_server",
        banner: exmapleImage,
        name: "自動毀滅服務器",
        description: "凱恩加入服務器時自動殺死凱恩",
        enabled: true,
    },
];

/**
 * Showing votes of beta features that planning to be added
 */
export const betaFeatures = [
    {
        name: "自動毀滅服務器",
        description: "在需要時破壞服務器",
        votes: "69"
    },
    {
        name: "自動毀滅服務器2",
        description: "在需要時破壞服務器",
        votes: "6"
    }
]

export const ServerDetails = {
    earned: 4321,
    members: {
        count: 6969,
        grow: 23 //as percentage
    },
    command: {
        total: 1200,
        most: "&pick"
    },
    /**
     * Status of the bot
     * show as percentage
     */
    bot: {
        ram: 30,
        cpu: 80,
    },
    unlocked: [
        {
            name: "免費功能",
            enabled: true
        },
        {
            name: "高級功能",
            enabled: true
        },
        {
            name: "付費功能",
            enabled: false
        },
        {
            name: "測試版功能",
            enabled: false
        }
    ]
}

export const ServerDetailsAdvanced = {
    /**
     * Total command usage of this year
     */
    command: {
        total: 4322,
        /**
         * One element per month
         */
        usage: [
            {
                name: "查詢類型的指令",
                data: [50, 64, 48, 66, 49, 68],
            },
            {
                name: "音樂命令",
                data: [30, 40, 24, 66, 20, 44],
            },
            {
                name: "RPG遊戲命令",
                data: [50, 20, 54, 46, 60, 56],
            },
            {
                name: "特殊命令",
                data: [3, 2, 4, 36, 10, 26],
            }
        ]
    },

    dvc: {
        total: 432,
        usage: [
            {
                name: "動態語音通道",
                data: [50, 64, 48, 66, 49, 68, 52],
            },
        ]
    }
}

/**
 * Personal RPG info
 * For dynamic adding fields at backend, it is an array of entries
 */
export const ExampleRPGInfo = [
    {
        name: "您的餘額",
        value: "$432423"
    },
    {
        name: "創建時間",
        value: "April 29, 2019 3:51 PM (3 years ago)\n"
    },
    {
        name: "民生職業",
        value: "產品設計師"
    },
    {
        name: "冒險職業",
        value: "Web開發人員"
    },
    {
        name: "稱號",
        value: "Single Dog"
    },
    {
        name: "感情狀態",
        value: "單身"
    }
]

export const Notifications = [
    {
        title: "凱恩在紐約穿女裝",
        description: "一位名叫MONEY的記者在紐約發現凱恩穿著女裝去逛街"
    },
    {
        title: "凱恩在紐約穿女裝",
        description: "一位名叫MONEY的記者在紐約發現凱恩穿著女裝去逛街"
    }
]