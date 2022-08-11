import {delay} from "../utils";
import {ExampleOptions} from "./example";

const ActionTasks = [
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

const Actions = [
    {
        id: "kill_kane",
        banner: "",
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

const TaskDetail = {
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

export async function getTasks(serverId, actionId) {

}

export async function getTaskDetail(serverId, actionId, taskId) {

}

export async function updateTask(serverId, actionId, taskId, options) {

}

export async function deleteDetail(serverId, actionId, taskId) {

}