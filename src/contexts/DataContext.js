import { createContext, useContext, useEffect, useState } from "react";
import { AccountContext } from "contexts/AccountContext";
import { Text, Spinner, Center, Stack, Button } from "@chakra-ui/react";
import { getAccountInfo } from "api/discord/DiscordApi";
import { AsyncContext } from "./components/AsyncContext";

export const UserDataContext = createContext();

export function UserDataProvider({ children }) {
  const accountCtx = useContext(AccountContext);

  return (
    <AsyncContext fetch={() => getAccountInfo(accountCtx)}>
      {(info) => (
        <UserDataContext.Provider value={info}>
          {children}
        </UserDataContext.Provider>
      )}
    </AsyncContext>
  );
}

function LoadingPanel({ error, onRetry }) {
  return (
    <Center height="2xl">
      <Stack direction="column" align="center">
        {(error && (
          <>
            <Text>Failed to Load User Data</Text>
            <Button onClick={onRetry}>Retry</Button>
          </>
        )) || (
          <>
            <Spinner size="lg" />
            <Text>Loading User Data...</Text>
          </>
        )}
      </Stack>
    </Center>
  );
}
