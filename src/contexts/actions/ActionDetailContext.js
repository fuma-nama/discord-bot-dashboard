import {createContext} from "react";
import {QueryHolderSkeleton} from "../components/AsyncContext";
import {useQuery} from "react-query";
import {useParams} from "react-router-dom";
import {getActionDetail} from "../../api/internal";
import {config} from "config/config";

export const ActionDetailContext = createContext({
    tasks: []
})

export function ActionDetailProvider({children}) {
    const {id: guild, action} = useParams();
    const query = useQuery(["action_detail", action], () =>
        getActionDetail(guild, action)
    )

    return <QueryHolderSkeleton query={query} count={2}>
        <ActionDetailContext.Provider value={query.data}>
            {children}
        </ActionDetailContext.Provider>
    </QueryHolderSkeleton>
}

export function useActionInfo() {
    const {action} = useParams()

    return config.actions[action]
}