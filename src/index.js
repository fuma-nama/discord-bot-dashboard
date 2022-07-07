import React, {useContext} from "react";
import ReactDOM from "react-dom";
import "assets/css/App.css";
import {
    BrowserRouter, Navigate, Route, Routes,
    useSearchParams,
} from "react-router-dom";
import AuthLayout from "layouts/auth";
import AdminLayout from "layouts/admin";
import GuildLayout, { GuildRoutes } from "layouts/guild";
import {ChakraProvider } from "@chakra-ui/react";
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
                <BrowserRouter>
                    <AppRoutes/>
                </BrowserRouter>
            </React.StrictMode>
        </ChakraProvider>
    </AccountProvider>,
    document.getElementById("root")
);

function AppRoutes() {
    const accountCtx = useContext(AccountContext);
    const [params] = useSearchParams()

    const getUrlParam = () => {
        const accessToken = params.get("accessToken")

        if (accessToken) {
            saveSecret({
                    accessToken,
                    tokenType: params.get("tokenType")
                },
                accountCtx
            );
        }
    };

    getUrlParam();

    const {accessToken} = accountCtx
    return (
        <Routes>
            {accessToken && (
                <>
                    <Route path={`/admin`} element={<AdminLayout />}/>
                    <Route path="/guild/:id/*" element={<GuildLayout />} >
                        {GuildRoutes()}
                    </Route>

                    <Route path="/" element={
                        <Navigate replace to="/admin"/>
                    }/>
                </>
            )}

            {!accessToken && (
                <>
                    <Route path={`/auth`} element={<AuthLayout />}/>
                    <Route path="*" element={
                        <Navigate replace to="/auth/sign-in"/>
                    } />
                </>
            )}
        </Routes>
    );
}