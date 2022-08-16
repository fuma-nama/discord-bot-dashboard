import {createContext, useContext} from "react";
import {useQuery, useQueryClient} from "react-query";
import {useParams} from "react-router-dom";
import {getTaskDetail} from "api/yeecord";
import {GuildContext} from "../guild/GuildContext";
import {Query} from "../components/AsyncContext";
import {SimpleGrid, Skeleton} from "@chakra-ui/react";

export const TaskDetailContext = createContext({
    banner: null,
    name: null,
    createdAt: null,
    values: null
})

export function TaskDetailProvider({children}) {
    const {id: guild} = useContext(GuildContext)
    const {action, task} = useParams()
    const client = useQueryClient()

    const key = ["task_detail", guild, action, task]

    const query = useQuery(
        key,
        () => getTaskDetail(guild, action, task), {
            initialData() {
                return client.getQueryData(key)
            },
            refetchOnWindowFocus: false
        }
    )

    return <Query
        query={query}
        placeholder={
            <SimpleGrid columns={{base: 1, lg: 2}} gap={10}>
                <Skeleton rounded="lg" height="200px" />
                <Skeleton rounded="lg" height="200px" />
                <Skeleton rounded="lg" height="200px" />
            </SimpleGrid>
        }>
        <TaskDetailContext.Provider value={query.data}>
            {children}
        </TaskDetailContext.Provider>
    </Query>
}