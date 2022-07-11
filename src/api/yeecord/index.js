import {delay} from "./utils";
import {
  betaFeatures,
  ExampleOptions,
  ExampleRPGInfo,
  features,
  Notifications,
  ServerDetails,
  ServerDetailsAdvanced
} from "./example";

export * from "./action";

/**
 * Get configurable servers
 * @returns A array of server ids which yeecord is enabled in the server and owned by user
 */
export async function getConfigurableServers(userId) {
  await delay(3000);
  return ["684766026776576052"];
}

/**
 * Get configurable features of a server
 * @returns An array of features
 */
export async function getFeatures(serverId) {
  await delay(3000);
  return {
    features,
    betaFeatures
  };
}

/**
 * Enable a feature for a server
 */
export async function enableFeature(serverId, featureId) {
  await delay(2000);
}

/**
 * @returns feature info, and configurable options
 */
export async function getFeatureDetail(serverId, featureId) {
  await delay(2000);
  return {
    id: featureId,
    name: "自動殺死凱恩",
    description: "凱恩加入服務器時自動殺死凱恩",
    options: ExampleOptions,
  };
}

/**
 * Update Feature options value
 */
export async function updateFeatureOptions(serverId, featureId, options) {
  await delay(3000);
}

/**
 * Get configurable settings of a server
 */
export async function getSettings(serverId) {
  await delay(3000)
  return {
    options: ExampleOptions,
  }
}

export async function updateSettingsOptions(serverId, changes) {
  await delay(3000);
}

/**
 * Normal server details
 */
export async function getServerDetails(serverId) {
  await delay(3000)
  return ServerDetails
}

/**
 * Advanced Details of server
 */
export async function getServerAdvancedDetails(serverId) {
  await delay(3000)
  return ServerDetailsAdvanced
}

/**
 * get Notifications of server
 */
export async function getNotifications(serverId) {
  await delay(2000)
  return Notifications
}

/**
 * RPG information of a user
 */
export async function getRPGInfo(userId) {
  await delay(3000)
  return ExampleRPGInfo
}