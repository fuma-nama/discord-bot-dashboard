import React, { useContext } from "react";
import ReactDOM from "react-dom";
import "assets/css/App.css";
import {
  HashRouter,
  Route,
  Switch,
  Redirect,
  useParams,
} from "react-router-dom";
import AuthLayout from "layouts/auth";
import AdminLayout from "layouts/admin";
import GuildLayout from "layouts/guild";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "theme/theme";
import {
  AccountContext,
  AccountProvider,
  saveSecret,
} from "./contexts/AccountContext";

ReactDOM.render(
  <AccountProvider>
    <ChakraProvider theme={theme}>
      <React.StrictMode>
        <Routers />
      </React.StrictMode>
    </ChakraProvider>
  </AccountProvider>,
  document.getElementById("root")
);

function Routers() {
  const accountCtx = useContext(AccountContext);

  const getUrlParam = () => {
    const fragment = new URLSearchParams(window.location.hash.slice(1));
    const info = {
      accessToken: fragment.get("access_token"),
      tokenType: fragment.get("token_type"),
    };

    if (info.accessToken) {
      saveSecret(info, accountCtx);
    }
  };

  getUrlParam();
  const { accessToken } = accountCtx;

  return (
    <HashRouter>
      <Switch>
        {accessToken && (
          <>
            <Route path={`/admin`} component={AdminLayout} />
            <Route path="/guild/:id" component={GuildLayout} />
            <Redirect from="/" to="/admin" />
            <Redirect from="/auth/sign-in" to="/admin" />
          </>
        )}

        {!accessToken && (
          <>
            <Route path={`/auth`} component={AuthLayout} />
            <Redirect to="/auth" />
          </>
        )}
      </Switch>
    </HashRouter>
  );
}
