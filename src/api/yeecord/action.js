import {delay} from "../utils";
import {ExampleOptions} from "./example";

const ActionTypes = [
    {
        name: "Kill Kane",
        id: "kill_kane"
    },
    {
        name: "Kill Kane Every day",
        id: "kill_kane_day"
    }
]

const Actions = [
    {
        id: "action_id",
        description: "Directly Kill Kane", //written by the user, it is nullable
        status: "Waiting for his reply", //status of the action
        createdAt: new Date(),
        type: ActionTypes[0]
    },
    {
        id: "action_id_2",
        description: null,
        status: "Ready to kill Kane In #General-Channel",
        createdAt: new Date(),
        type: ActionTypes[1]
    }
]

const ActionDetail = {
    action: Actions[0],
    options: ExampleOptions
}

/**
 * @returns a string array of all actions types usable for server
 */
export async function getActions(serverId) {
    await delay(3000)
    return Actions
}

export async function getActionTypes() {
    await delay(2000)
    return ActionTypes
}

/**
 * Add an action
 * description might be null or empty
 * @returns added action ids
 */
export async function addAction(serverId, typeId, description) {
    await delay(3000)
    return "action_id"
}

export async function cloneAction(actionId) {
    await delay(2000)
}

export async function deleteAction(actionId) {
    await delay(2000)
}

/**
 * Execute the action
 */
export async function runAction(actionId) {
    await delay(3000)
}

export async function getActionDetail(actionId) {
    await delay(3000)
    return ActionDetail
}

/**
 * Modify Action Info (ex: description)
 */
export async function modifyActionInfo(actionId, description) {
    await delay(1000)
}

/**
 * Update Action Options
 */
export async function modifyAction(actionId, options) {
    await delay(3000)
}