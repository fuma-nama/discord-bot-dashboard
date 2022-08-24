import {createContext, useContext} from "react";
import {useQuery, useQueryClient} from "react-query";
import {useParams} from "react-router-dom";
import {getTaskDetail} from "api/internal";
import {GuildContext} from "../guild/GuildContext";

export const TaskDetailContext = createContext({
    banner: null,
    name: null,
    createdAt: null,
    values: null
})

export function useTaskDetailQuery() {
    const {id: guild} = useContext(GuildContext)
    const {action, task} = useParams()
    const client = useQueryClient()

    const key = ["task_detail", guild, action, task]

    return useQuery(
        key,
        () => getTaskDetail(guild, action, task), {
            initialData() {
                return client.getQueryData(key)
            },
            refetchOnWindowFocus: false
        }
    )
}