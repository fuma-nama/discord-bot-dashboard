/**
 * @returns A array of server ids which yeecord is enabled in the server and owned by user
 */
export async function getCustomableServers(user) {
  await delay(3000);
  return ["server_id"];
}

//Used to test to async function
const delay = (ms) => new Promise((res) => setTimeout(res, ms));

const features = [
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
 * @returns An array of features
 */
export async function getFeatures() {
  await delay(3000);
  return features;
}

export async function enableFeature(serverId, featureId) {
  await delay(2000);
}

const ExampleOption = {
  id: "kill_friends",
  name: "殺死他的朋友",
  description: "當他的朋友加入時也殺死他們",
  type: "boolean", //boolean, string, enum, number
  choices: null, //only enum type option have choices array
  value: true,
};

const ExampleOption2 = {
  id: "kill_friends_name",
  name: "殺死他的朋友",
  description: "當他的朋友加入時也殺死他們",
  type: "string", //boolean, string, enum, number
  choices: null, //only enum type option have choices array
  value: "test",
};
const ExampleOption3 = {
  id: "kill_friends_types",
  name: "殺死他的朋友",
  description: "當他的朋友加入時也殺死他們",
  type: "enum", //boolean, string, enum, number
  choices: ["Gay", "Dalao", "None"], //only enum type option have choices array
  value: "Gay",
};
const ExampleOption4 = {
  id: "kill_friends_count",
  name: "殺死他的朋友",
  description: "當他的朋友加入時也殺死他們",
  type: "number", //boolean, string, enum, number
  choices: null, //only enum type option have choices array
  value: 1,
};

/**
 * @returns feature details, including configurable options
 */
export async function getFeatureDetail(serverId, featureId) {
  await delay(2000);
  return {
    name: "自動殺死凱恩",
    description: "凱恩加入服務器時自動殺死凱恩",
    options: [ExampleOption, ExampleOption2, ExampleOption3, ExampleOption4],
  };
}

/**
 * @param {Map<String, *>} options a Map of (optionId - value)
 * @returns true if success
 */
export async function updateFeatureOptions(options) {
  await delay(3000);
  return true;
}
