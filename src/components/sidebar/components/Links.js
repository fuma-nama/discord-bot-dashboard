/* eslint-disable */
import React from "react";
import {NavLink, useLocation} from "react-router-dom";
// chakra imports
import {Box, Flex, HStack, Text} from "@chakra-ui/react";
import {useBrandBg, useNoteColor, useTextColor} from "utils/colors";
import {useLocale} from "../../../utils/Language";

export function SidebarLinks({ routes }) {
  //   Chakra color mode
  let location = useLocation();

  const activeRoute = (routeName) => {
    return location.pathname.endsWith(routeName.toLowerCase());
  };

  const includesRoute = (routeName) => {
    return location.pathname.includes(routeName.toLowerCase());
  };

  function createLinks(routes) {
    return routes.map((route, index) =>
        createLink(route, index)
    );
  }

  function createLink(route, key) {
    const active = activeRoute(route.path);
    const includes = includesRoute(route.path)

    return <>
      <Item key={key} active={active} route={route} />

      <Flex direction="column" pl={5}>
        {includes && route.items && route.items.map((item, key) => {
          const path = `${route.path}/${item.path}`

          return <Item key={key} route={item} to={path} active={activeRoute(path)} />
        })}
      </Flex>
    </>
  }

  return createLinks(routes);
}

function Item({active, route, to = route.path}) {
  let activeColor = useTextColor();
  let inactiveColor = useNoteColor()
  let brandColor = useBrandBg();

  const locale = useLocale()

  return (
      <NavLink to={to}>
        <HStack spacing={active ? "22px" : "26px"} py="5px" ps="10px">
          <Flex w="100%" alignItems="center" justifyContent="center">
            {route.icon &&
                <Box color={active ? brandColor : inactiveColor} me="18px">
                  {route.icon}
                </Box>
            }

            <Text
                me="auto"
                color={active ? activeColor : inactiveColor}
                fontWeight={active ? "bold" : "normal"}
            >
              {locale(route.name)}
            </Text>
          </Flex>
          <Box
              h="36px"
              w="4px"
              bg={active ? brandColor : "transparent"}
              borderRadius="5px"
          />
        </HStack>
      </NavLink>
  );
}

export default SidebarLinks;
