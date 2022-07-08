import { createContext, useContext} from "react";
import { AccountContext } from "contexts/AccountContext";
import { getAccountInfo } from "api/discord/DiscordApi";
import {QueryHolder} from "./components/AsyncContext";
import {useQuery} from "react-query";

export const UserDataContext = createContext();

export function UserDataProvider({ children }) {
  const accountCtx = useContext(AccountContext);
  const query = useQuery(["user_data", accountCtx.accessToken], () =>
      getAccountInfo(accountCtx)
  )

  return (
    <QueryHolder {...query}>
      <UserDataContext.Provider value={query.data}>
        {children}
      </UserDataContext.Provider>
    </QueryHolder>
  );
}
