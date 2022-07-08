import {delay} from "./utils";

/**
 * An option of feature, going to support following types soon:
 *
 * Date, Time, File
 */
export const ExampleOption = {
    id: "kill_friends",
    name: "殺死他的朋友",
    description: "當他的朋友加入時也殺死他們",
    type: "boolean", //boolean, string, enum, number
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

export const ExampleOptions = [ExampleOption, ExampleOption2, ExampleOption3, ExampleOption4]

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
    command: {
        usage: 1200,
        most: "&pick"
    },
    bot: {
        ram: 30,
        cpu: 80,
        gpu: 30
    }
}

export const ServerDetailsAdvanced = {
    commandUsage: {
        "1/5": 3000,
        "2/5": 43,
        "3/5": 4324
    }
}