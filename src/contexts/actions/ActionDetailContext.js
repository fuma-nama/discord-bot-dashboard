import {createContext} from "react";
import {QueryHolder} from "../components/AsyncContext";
import {useQuery} from "react-query";
import {useParams} from "react-router-dom";
import {getActionDetail} from "../../api/yeecord";

export const ActionDetailContext = createContext({
    action: null,
    options: []
})

export function ActionDetailProvider({children}) {
    const {action} = useParams();
    const query = useQuery(["action_detail", action], () =>
        getActionDetail(action)
    )

    return <QueryHolder query={query}>
        <ActionDetailContext.Provider value={query.data}>
            {children}
        </ActionDetailContext.Provider>
    </QueryHolder>
}