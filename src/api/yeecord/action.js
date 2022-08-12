import {delay} from "../utils";
import {ExampleOptions} from "./example";

const ActionTasks = [
    {
        id: 0,
        status: "In Channel #Genernal", //status of the action, nullable
        createdAt: new Date(),
    },
    {
        id: 1,
        status: "In Channel #Genernal",
        createdAt: new Date(),
    }
]

const Actions = [
    {
        id: "kill_kane",
        banner: "https://images.unsplash.com/photo-1553095066-5014bc7b7f2d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8d2FsbCUyMGJhY2tncm91bmR8ZW58MHx8MHx8&w=1000&q=80",
        name: "Kill Kane",
        description: "Kill Kane in a channel"
    },
    {
        id: "kill_kane_day",
        banner: "",
        name: "Kill Kane Every day",
        description: "Kill kane in a channel every day"
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
 * @returns {Promise<{tasks: {createdAt: Date, id: number, status: string}[]}>}
 */
export async function getActionDetail(serverId, actionId) {
    await delay(3000)
    return {
        tasks: ActionTasks
    }
}

export async function getTaskDetail(serverId, actionId, taskId) {
    await delay(2000)
    return {
        options: ExampleOptions
    }
}

export async function addTask(serverId, actionId) {
    await delay(2000)
    return 0
}

export async function updateTask(serverId, actionId, taskId, options) {

}

export async function deleteDetail(serverId, actionId, taskId) {

}