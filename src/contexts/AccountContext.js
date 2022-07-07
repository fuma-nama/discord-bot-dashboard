import React, { useState } from "react";

export const AccountContext = React.createContext({
  tokenType: null,
  accessToken: null,
});

export function AccountProvider({ children }) {
  const [info, setInfo] = useState({
    accessToken: localStorage.getItem("accessToken"),
    tokenType: localStorage.getItem("tokenType"),
  });

  const { accessToken, tokenType } = info;
  return (
    <AccountContext.Provider
      value={{
        accessToken,
        tokenType,
        setInfo
      }}
    >
      {children}
    </AccountContext.Provider>
  );
}

export function saveSecret(secret, context) {
  const { tokenType, accessToken } = secret;

  localStorage.setItem("accessToken", accessToken);
  localStorage.setItem("tokenType", tokenType);
  context.setInfo(secret);
}

export function logout(context) {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("tokenType");

  context.setInfo({
    accessToken: null,
    tokenType: null
  });
}
