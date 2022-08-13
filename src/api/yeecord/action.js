import {delay} from "../utils";
import {ExampleOptions} from "./example";

const ActionTasks = [
    {
        id: 0,
        name: "In Channel #Genernal", //status of the action, nullable
        createdAt: new Date(),
    },
    {
        id: 1,
        name: "In Channel #Genernal",
        createdAt: new Date(),
    }
]

/**
 * Only fetch when config.data.actions is not null
 *
 * @returns a custom data object
 */
export async function getActionsData(serverId) {
    await delay(3000)
    return {
        test: "Test"
    }
}

/**
 *
 * @returns {Promise<{tasks: Array<{createdAt: Date, id: number, status: string}>}>}
 */
export async function getActionDetail(serverId, actionId) {
    await delay(3000)
    return {
        tasks: ActionTasks
    }
}

/**
 * @returns {Promise<{createdAt: Date, values: any, name: string, id: number}>} Task Info and option values
 */
export async function getTaskDetail(serverId, actionId, taskId) {
    await delay(2000)
    return {
        id: taskId,
        name: "In Channel #Genernal",
        createdAt: new Date(),
        values: {
            test: "Test"
        }
    }
}

export async function addTask(serverId, actionId, name, options) {
    await delay(2000)
    return 0
}

export async function updateTask(serverId, actionId, taskId, name, options) {
    await delay(2000)
}

export async function deleteTask(serverId, actionId, taskId) {
    await delay(2000)
}