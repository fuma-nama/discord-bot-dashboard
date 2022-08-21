import React, {useContext, useEffect} from "react";
import ReactDOM from 'react-dom';
import "assets/css/App.css";
import {BrowserRouter, Navigate, Route, Routes,} from "react-router-dom";
import AuthLayout from "layouts/auth";
import AdminLayout from "layouts/admin";
import GuildLayout, {GuildRoutes} from "layouts/guild";
import {Center, ChakraProvider, Spinner, Stack, Text} from "@chakra-ui/react";
import theme from "theme/theme";
import {QueryClient, QueryClientProvider, useQuery} from 'react-query'

import {hasLoggedIn} from "./api/internal";
import {QueryHolder} from "./contexts/components/AsyncContext";
import {SettingsContext, SettingsProvider} from "./contexts/SettingsContext";
import {config} from "./config/config";

const queryClient = new QueryClient()

ReactDOM.render(
    <React.StrictMode>
        <title itemProp="name">{config.name} Dashboard</title>

        <ChakraProvider theme={theme}>
            <QueryClientProvider client={queryClient}>
                <SettingsProvider>
                    <AppRouter/>
                </SettingsProvider>
            </QueryClientProvider>
        </ChakraProvider>
    </React.StrictMode>,
    document.getElementById("root")
);

function AppRouter() {
    const loginQuery = useQuery(
        "logged_in",
        () => hasLoggedIn(),
        {
            refetchOnWindowFocus: false
        }
    )
    const {fixedWidth} = useContext(SettingsContext)

    const loggedIn = loginQuery.data

    return (
        <QueryHolder query={loginQuery}>
            <meta name="viewport" content={`width=${fixedWidth ? "340" : "device-width"}, initial-scale=1`}/>

            <BrowserRouter>
                <Routes>
                    {loggedIn && (
                        <>
                            <Route path={`/admin`} element={<AdminLayout/>}/>
                            <Route path="/guild/:id/*" element={<GuildLayout/>}>
                                {GuildRoutes()}
                            </Route>

                            <Route path="/invite" element={
                                <Redirect url={config.inviteUrl}/>
                            }/>

                            <Route path="*" element={
                                <Navigate replace to="/admin"/>
                            }/>
                        </>
                    )}

                    {!loggedIn && (
                        <>
                            <Route path={`/auth`} element={<AuthLayout isCallback/>}/>
                            <Route path={`/signin`} element={<AuthLayout/>} exact/>
                            <Route path="*" element={
                                <Navigate replace to="/signin"/>
                            }/>
                        </>
                    )}
                </Routes>
            </BrowserRouter>
        </QueryHolder>
    );
}

function Redirect({url}) {
    useEffect(() => {
        window.location.href = url;
    }, [url]);

    return <Center height="100vh">
        <Stack direction="column" align="center">
            <Spinner size="lg"/>
            <Text>正在加載...</Text>
        </Stack>
    </Center>;
}