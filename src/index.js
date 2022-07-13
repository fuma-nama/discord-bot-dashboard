import React, {useContext, useEffect} from "react";
import ReactDOM from 'react-dom';
import "assets/css/App.css";
import {
    BrowserRouter,
    Navigate,
    Route,
    Routes,
    useSearchParams,
} from "react-router-dom";
import AuthLayout from "layouts/auth";
import AdminLayout from "layouts/admin";
import GuildLayout, {GuildRoutes} from "layouts/guild";
import {Center, ChakraProvider, Spinner, Stack, Text} from "@chakra-ui/react";
import theme from "theme/theme";
import {
    QueryClient,
    QueryClientProvider,
} from 'react-query'

import {
    AccountContext,
    AccountProvider,
    saveSecret,
} from "./contexts/AccountContext";
import {invite} from "./variables/links";
import AuthProcessing from "./views/auth/signIn/processing";

const queryClient = new QueryClient()

ReactDOM.render(
    <React.StrictMode>
        <AccountProvider>
            <ChakraProvider theme={theme}>
                <QueryClientProvider client={queryClient}>

                    <BrowserRouter>
                        <AppRoutes/>
                    </BrowserRouter>
                </QueryClientProvider>
            </ChakraProvider>
        </AccountProvider>
    </React.StrictMode>,
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
                    <Route path={`/admin`} element={<AdminLayout/>}/>
                    <Route path="/guild/:id/*" element={<GuildLayout/>}>
                        {GuildRoutes()}
                    </Route>

                    <Route path="/invite" element={
                        <Redirect url={invite}/>
                    }/>

                    <Route path="*" element={
                        <Navigate replace to="/admin"/>
                    }/>
                </>
            )}

            {!accessToken && (
                <>
                    <Route path={`/auth`} element={<AuthLayout layout={AuthProcessing}/>}/>
                    <Route path={`/signin`} element={<AuthLayout/>} exact/>
                    <Route path="*" element={
                        <Navigate replace to="/signin"/>
                    }/>
                </>
            )}
        </Routes>
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