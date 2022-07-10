import Information from "../../views/admin/profile/components/Information";
import React from "react";

const AuthHeaders = {
    userId: 6969696969696,
    //you may add some headers soon
}
/**
 * An option of feature, going to support following types soon:
 *
 * Date, Time, File
 */
export const ExampleOption = {
    id: "kill_friends",
    name: "殺死他的朋友",
    description: "當他的朋友加入時也殺死他們",
    type: "boolean", //boolean, string, enum, number, color
    choices: null, //only enum type option have choices array
    value: true,
};

export const ExampleOption2 = {
    id: "kill_friends_name",
    name: "殺死他的朋友",
    description: "當他的朋友加入時也殺死他們",
    type: "string",
    choices: null,
    value: "test",
};
export const ExampleOption3 = {
    id: "kill_friends_types",
    name: "殺死他的朋友",
    description: "當他的朋友加入時也殺死他們",
    type: "enum",
    choices: ["Gay", "Dalao", "None"],
    value: "Gay",
};
export const ExampleOption4 = {
    id: "kill_friends_count",
    name: "殺死他的朋友",
    description: "當他的朋友加入時也殺死他們",
    type: "number",
    choices: null,
    value: 1,
};
export const ExampleOption5 = {
    id: "color",
    name: "我的顏色",
    description: "",
    type: "color",
    choices: null,
    value: null,
}
export const ExampleOption6 = {
    id: "kill_message",
    name: "我的顏色",
    description: "",
    type: "message_create",
    choices: null,
    value: null,
}

export const ExampleOptions = [ExampleOption, ExampleOption2, ExampleOption3, ExampleOption4, ExampleOption5, ExampleOption6]

//Used to test to async function
export const features = [
    {
        id: "auto_kill_kane",
        banner: null, //use default banner
        name: "自動殺死凱恩",
        description: "凱恩加入服務器時自動殺死凱恩",
        enabled: false,
        favorite: false,
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