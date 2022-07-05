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
