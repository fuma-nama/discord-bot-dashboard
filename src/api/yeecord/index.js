import {fetchAuto} from "../utils";

export * from "./action";
export * from "./auth";

/**
 * Get configurable features of a server
 * You may include other data
 *
 * example: {
 *     enabled: [],
 *     data: {} //nullable
 * }
 * @returns {enabled: string[], data: any} an object contains an array of enabled feature ids and custom data
 */
export async function getFeatures(serverId) {

  return await fetchAuto(`/guild/${serverId}/features`, {toJson: true})
}

/**
 * Enable a feature for a server
 */
export async function setFeatureEnabled(serverId, featureId, enabled = true) {

  return fetchAuto(`/guild/${serverId}/feature/${featureId}/enabled`, {
    method: "PATCH",
    body: enabled,
  })
}

/**
 *
 * @param serverId
 * @param featureId
 * @returns {Promise<{values: any}>} a map of option values
 */
export async function getFeatureDetail(serverId, featureId) {
  return fetchAuto(`/guild/${serverId}/feature/${featureId}`, {toJson: true})
}

/**
 * Update Feature options value
 *
 * @return any The updated option values
 */
export function updateFeatureOptions(serverId, featureId, options) {

  return fetchAuto(`/guild/${serverId}/feature/${featureId}`, {
    method: "PATCH",
    body: JSON.stringify(Object.fromEntries(options)),
    toJson: true
  })
}

/**
 * Get configuration settings values of a server
 * @return {values: any}
 */
export async function getSettings(serverId) {
  return fetchAuto(`/guild/${serverId}/settings`, {
    toJson: true
  })
}

/**
 *
 * @return {Promise<any>} updated option values
 */
export async function updateSettingsOptions(serverId, changes) {
  return fetchAuto(`/guild/${serverId}/settings`, {
    method: "PATCH",
    body: JSON.stringify(
        Object.fromEntries(changes)
    ),
    toJson: true
  })
}

/**
 * Normal server details
 */
export function getServerDetails(serverId) {
  return fetchAuto(`/guild/${serverId}/detail`, {
    toJson: true
  })
}

/**
 * Advanced Details of server
 */
export async function getServerAdvancedDetails(serverId) {
  return fetchAuto(`/guild/${serverId}/detail/advanced`, {
    toJson: true
  })
}

/**
 * get Notifications of server
 */
export async function getNotifications(serverId) {
  return fetchAuto(`/guild/${serverId}/notification`, {
    toJson: true
  })
}