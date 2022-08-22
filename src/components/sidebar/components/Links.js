/* eslint-disable */
import React from "react";
import {NavLink, useLocation} from "react-router-dom";
// chakra imports
import {Box, Flex, HStack, Text} from "@chakra-ui/react";
import {useBrandBg, useNoteColor, useTextColor} from "utils/colors";

export function SidebarLinks(props) {
  //   Chakra color mode
  let location = useLocation();
  let activeColor = useTextColor();
  let inactiveColor = useNoteColor()
  let brandColor = useBrandBg();

  const { routes } = props;

  // verifies if routeName is the one active (in browser input)
  const activeRoute = (routeName) => {
    return location.pathname.includes(routeName);
  };

  // this function creates the links from the secondary accordions (for example auth -> sign-in -> default)
  const createLinks = (routes) => {
    return routes.map((route, index) => {
      const active = activeRoute(route.path.toLowerCase());

      return (
        <NavLink key={index} to={route.path}>
          {route.icon ? (
              <HStack spacing={active ? "22px" : "26px"} py="5px" ps="10px">
                <Flex w="100%" alignItems="center" justifyContent="center">
                  <Box color={active ? brandColor : inactiveColor} me="18px">
                    {route.icon}
                  </Box>
                  <Text
                    me="auto"
                    color={active ? activeColor : inactiveColor}
                    fontWeight={active ? "bold" : "normal"}
                  >
                    {route.name}
                  </Text>
                </Flex>
                <Box
                  h="36px"
                  w="4px"
                  bg={active ? brandColor : "transparent"}
                  borderRadius="5px"
                />
              </HStack>
          ) : (
            <Box>
              <HStack spacing={active ? "22px" : "26px"} py="5px" ps="10px">
                <Text
                  me="auto"
                  color={active ? activeColor : inactiveColor}
                  fontWeight={active ? "bold" : "normal"}
                >
                  {route.name}
                </Text>
                <Box h="36px" w="4px" bg="brand.400" borderRadius="5px" />
              </HStack>
            </Box>
          )}
        </NavLink>
      );
    });
  };
  //  BRAND
  return createLinks(routes);
}

export default SidebarLinks;
