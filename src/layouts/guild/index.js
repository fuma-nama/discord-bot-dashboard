// Chakra imports
import {Box, Portal, useDisclosure} from "@chakra-ui/react";
import Footer from "components/footer/FooterAdmin.js";
// Layout components
import Navbar from "components/navbar/NavbarAdmin.js";
import Sidebar from "components/sidebar/Sidebar.js";
import {PageInfoContext} from "contexts/PageInfoContext";
import React, {useState} from "react";
import {Navigate, Outlet, Route, useParams} from "react-router-dom";
import {UserDataProvider} from "contexts/UserDataContext";
//routes
import routes from "routes.js";
import hidden_routes from "hidden_routes.js";
import {GuildContext} from "contexts/GuildContext";

function getRoutes(routes) {
    return routes.map((prop, key) => {
        return <Route path={prop.path}
                      element={prop.component}
                      key={key}
        />;
    });
}

function RouteWrapper({children}) {
    // states and functions

    const {onOpen} = useDisclosure();
    const [fixed] = useState(false)
    const [toggleSidebar, setToggleSidebar] = useState(false);
    const [info, setInfo] = useState({
        name: "",
    })

    return <Box>
        <PageInfoContext.Provider
            value={{
                routes,
                toggleSidebar,
                setToggleSidebar,
                info,
                setInfo
            }}
        >
            <Sidebar routes={routes} display="none"/>
            <Box
                float="right"
                minHeight="100vh"
                height="100%"
                overflow="auto"
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
                        <Navbar
                            onOpen={onOpen}
                            logoText={"Horizon UI Dashboard PRO"}
                            brandText={info ? info.name : "Loading..."}
                            message={info ? info.name : "Loading..."}
                            fixed={fixed}
                        />
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
                    <Footer/>
                </Box>
            </Box>
        </PageInfoContext.Provider>
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
        {getRoutes(hidden_routes)}
        <Route path="*" element={<Navigate replace to="dashboard"/>}/>

    </>
}