import {createContext, useContext} from "react";
import {useQuery} from "react-query";
import {useParams} from "react-router-dom";
import {getTaskDetail} from "api/yeecord";
import {GuildContext} from "../guild/GuildContext";
import {QueryHolder} from "../components/AsyncContext";

export const TaskDetailContext = createContext({
    banner: null,
    name: null,
    createdAt: null,
    values: null
})

export function TaskDetailProvider({children}) {
    const {id: guild} = useContext(GuildContext)
    const {action, task} = useParams()

    const query = useQuery(
        ["task_detail", guild, action, task],
        () => getTaskDetail(guild, action, task)
    )

    return <QueryHolder query={query}>
        <TaskDetailContext.Provider value={query.data}>
            {children}
        </TaskDetailContext.Provider>
    </QueryHolder>
}