import {delay} from "./utils";
import {ExampleOptions} from "./example";

const Actions = [
    {
        id: "action_id",
        description: "Directly Kill Kane", //written by the user, it is nullable
        status: "Waiting for his reply", //status of the action
        createdAt: new Date(),
        type: {
            name: "Kill Kane",
            id: "kill_kane"
        }
    },
    {
        id: "action_id_2",
        description: null,
        status: "In #Channel",
        createdAt: new Date(),
        type: {
            name: "Kill Kane Every day",
            id: "kill_kane_day"
        }
    }
]

const ActionDetail = {
    action: Actions[0],
    options: ExampleOptions
}

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
 * @returns added action ids
 */
export async function addAction(serverId, type) {
    await delay(3000)
    return "action_id"
}

/**
 * Execute the action
 */
export async function runAction(actionId) {
    await delay(3000)
}

export async function getActionDetail(actionId) {
    return ActionDetail
}

export async function modifyAction(actionId, options) {
    await delay(3000)
}