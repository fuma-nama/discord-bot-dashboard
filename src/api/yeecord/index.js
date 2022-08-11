import {delay, fetchAuto} from "../utils";
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
export * from "./auth";

/**
 * Get configurable features of a server
 * You may include other data
 *
 * example: {
 *     features: [...] //required
 *     another_data: {} //optional
 * }
 * @returns An object includes a features array
 */
export async function getFeatures(serverId) {

  return await fetchAuto(`/guild/${serverId}/features`, {toJson: true})
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
  return fetchAuto(`/guild/${serverId}/feature/${featureId}`, {toJson: true})
}

/**
 * Update Feature options value
 */
export async function updateFeatureOptions(serverId, featureId, options) {
  return fetchAuto(`/guild/${serverId}/feature/${featureId}`, {
    toJson: true,
    method: "PATCH",
    body: options
  })
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