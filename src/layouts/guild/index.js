// Chakra imports
import {Box, Portal} from "@chakra-ui/react";
import AdminFooter from "components/footer/FooterAdmin.js";
// Layout components
import Navbar from "components/navbar/NavbarAdmin.js";
import Sidebar from "components/sidebar/Sidebar.js";
import {PageInfoProvider} from "contexts/PageInfoContext";
import React from "react";
import {Navigate, Outlet, Route, useParams} from "react-router-dom";
import {UserDataProvider} from "contexts/UserDataContext";
//routes
import routes from "routes.js";
import {GuildContext} from "contexts/guild/GuildContext";

function getRoutes(routes) {
    return routes.map((route, key) => {

        return <Route path={route.path} element={route.component} key={key}>
            {route.children && getRoutes(route.children)}
        </Route>
    });
}

function RouteWrapper({children}) {
    return <Box>
        <PageInfoProvider>
            <Sidebar routes={routes} display="none"/>
            <Box
                float="right"
                minHeight="100vh"
                height="100%"
                position="relative"
                maxHeight="100%"
                w={{base: "100%", xl: "calc( 100% - 290px )"}}
                maxWidth={{base: "100%", xl: "calc( 100% - 290px )"}}
                transition="all 0.33s cubic-bezier(0.685, 0.0473, 0.346, 1)"
                transitionDuration=".2s, .2s, .35s"
                transitionProperty="top, bottom, width"
                transitionTimingFunction="linear, linear, ease"
                overflow="hidden"
            >
                <Portal>
                    <Box>
                        <Navbar/>
                    </Box>
                </Portal>

                <Box
                    mx="auto"
                    p={{base: "20px", md: "30px"}}
                    pe="20px"
                    minH="100vh"
                    pt="50px"
                >
                    {children}
                </Box>
                <Box>
                    <AdminFooter/>
                </Box>
            </Box>
        </PageInfoProvider>
    </Box>
}

export default function GuildBoard() {
    const {id} = useParams();
    document.documentElement.dir = "ltr";

    return (
        <GuildContext.Provider value={{id}}>
            <UserDataProvider>

                <RouteWrapper>
                    <Outlet/>
                </RouteWrapper>
            </UserDataProvider>

        </GuildContext.Provider>
    );
}

export function GuildRoutes() {
    return <>
        {getRoutes(routes)}
        <Route path="*" element={<Navigate replace to="dashboard"/>}/>
    </>
}