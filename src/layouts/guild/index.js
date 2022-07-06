// Chakra imports
import { Portal, Box, useDisclosure } from "@chakra-ui/react";
import Footer from "components/footer/FooterAdmin.js";
// Layout components
import Navbar from "components/navbar/NavbarAdmin.js";
import Sidebar from "components/sidebar/Sidebar.js";
import { SidebarContext } from "contexts/SidebarContext";
import React, { useMemo, useState } from "react";
import { Redirect, Route, Switch, useParams } from "react-router-dom";
import { UserDataProvider } from "contexts/DataContext";
//routes
import routes from "routes.js";
import hidden_routes from "hidden_routes.js";
import { GuildContext } from "contexts/GuildContext";

function getActiveRoute(routes) {
  let activeRoute = "Default Brand Text";
  for (let i = 0; i < routes.length; i++) {
    if (window.location.href.indexOf(routes[i].path) !== -1) {
      return routes[i].name;
    }
  }
  return activeRoute;
}

function getActiveNavbar(routes) {
  let activeNavbar = false;
  for (let i = 0; i < routes.length; i++) {
    if (window.location.href.indexOf(routes[i].path) !== -1) {
      return routes[i].secondary;
    }
  }
  return activeNavbar;
}

function getRoutes(routes) {
  return routes.map((prop, key) => {
    return <Route path={prop.path} component={prop.component} key={key} />;
  });
}

function getActiveNavbarText(routes) {
  let activeNavbar = false;
  for (let i = 0; i < routes.length; i++) {
    if (routes[i].collapse) {
      let collapseActiveNavbar = getActiveNavbarText(routes[i].items);
      if (collapseActiveNavbar !== activeNavbar) {
        return collapseActiveNavbar;
      }
    } else if (routes[i].category) {
      let categoryActiveNavbar = getActiveNavbarText(routes[i].items);
      if (categoryActiveNavbar !== activeNavbar) {
        return categoryActiveNavbar;
      }
    } else {
      if (window.location.href.indexOf(routes[i].path) !== -1) {
        return routes[i].messageNavbar;
      }
    }
  }
  return activeNavbar;
}

function mapRoutes(id, routes) {
  return routes.map((route) => {
    return {
      ...route,
      path: `/guild/${id}${route.path}`,
    };
  });
}

export default function GuildBoard(props) {
  const { id } = useParams();
  const { ...rest } = props;

  // states and functions
  const { onOpen } = useDisclosure();
  const [fixed] = useState(false);
  const [toggleSidebar, setToggleSidebar] = useState(false);

  const publicRoutes = useMemo(() => mapRoutes(id, routes), [id]);
  const hiddenRoutes = useMemo(() => mapRoutes(id, hidden_routes), [id]);

  document.documentElement.dir = "ltr";
  return (
    <Box>
      <GuildContext.Provider value={{ id }}>
        <SidebarContext.Provider
          value={{
            routes: publicRoutes,
            toggleSidebar,
            setToggleSidebar,
          }}
        >
          <Sidebar routes={publicRoutes} display="none" {...rest} />
          <Box
            float="right"
            minHeight="100vh"
            height="100%"
            overflow="auto"
            position="relative"
            maxHeight="100%"
            w={{ base: "100%", xl: "calc( 100% - 290px )" }}
            maxWidth={{ base: "100%", xl: "calc( 100% - 290px )" }}
            transition="all 0.33s cubic-bezier(0.685, 0.0473, 0.346, 1)"
            transitionDuration=".2s, .2s, .35s"
            transitionProperty="top, bottom, width"
            transitionTimingFunction="linear, linear, ease"
          >
            <UserDataProvider>
              <Portal>
                <Box>
                  <Navbar
                    onOpen={onOpen}
                    logoText={"Horizon UI Dashboard PRO"}
                    brandText={getActiveRoute(publicRoutes)}
                    secondary={getActiveNavbar(publicRoutes)}
                    message={getActiveNavbarText(publicRoutes)}
                    fixed={fixed}
                    {...rest}
                  />
                </Box>
              </Portal>

              <Box
                mx="auto"
                p={{ base: "20px", md: "30px" }}
                pe="20px"
                minH="100vh"
                pt="50px"
              >
                <Switch>
                  {getRoutes(publicRoutes)}
                  {getRoutes(hiddenRoutes)}
                  <Redirect from="/" to={`/guild/${id}/dashboard`} />
                </Switch>
              </Box>

              <Box>
                <Footer />
              </Box>
            </UserDataProvider>
          </Box>
        </SidebarContext.Provider>
      </GuildContext.Provider>
    </Box>
  );
}
