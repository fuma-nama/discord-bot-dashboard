import {createContext} from "react";
import {getAccountInfo} from "api/discord/DiscordApi";
import {QueryHolder} from "./components/AsyncContext";
import {useQuery} from "react-query";

export const UserDataContext = createContext({});

export function UserDataProvider({children}) {
    const query = useQuery("user_data",
      () => getAccountInfo(),
      {
          refetchOnWindowFocus: false
      }
  )

  return (
    <QueryHolder query={query}>
      <UserDataContext.Provider value={query.data}>
        {children}
      </UserDataContext.Provider>
    </QueryHolder>
  );
}
