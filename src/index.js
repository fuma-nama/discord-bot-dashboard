import React, {useEffect} from "react";
import ReactDOM from 'react-dom';
import "assets/css/App.css";
import {BrowserRouter, Navigate, Route, Routes,} from "react-router-dom";
import AuthLayout from "layouts/auth";
import AdminLayout from "layouts/admin";
import GuildLayout, {GuildRoutes} from "layouts/guild";
import {Center, ChakraProvider, Spinner, Stack, Text} from "@chakra-ui/react";
import theme from "theme/theme";
import {QueryClient, QueryClientProvider, useQuery,} from 'react-query'

import {invite} from "./variables/links";
import {hasLoggedIn} from "./api/yeecord";
import {QueryHolder} from "./contexts/components/AsyncContext";
import Credits from "./layouts/info/credits";

const queryClient = new QueryClient()

ReactDOM.render(
    <React.StrictMode>
        <ChakraProvider theme={theme}>
            <QueryClientProvider client={queryClient}>
                <AppRouter/>
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

    const loggedIn = loginQuery.data

    return (
        <QueryHolder query={loginQuery}>
            <BrowserRouter>
                <Routes>
                    {loggedIn && (
                        <>
                            <Route path={`/admin`} element={<AdminLayout/>}/>
                            <Route path="/guild/:id/*" element={<GuildLayout/>}>
                                {GuildRoutes()}
                            </Route>
                            <Route path="/info">
                                <Route path="credits" element={<Credits/>}/>
                            </Route>

                            <Route path="/invite" element={
                                <Redirect url={invite}/>
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