// chakra imports
import {Avatar, Box, Flex, HStack, Icon, Stack, Text, useColorModeValue} from "@chakra-ui/react";
//   Custom components
import Brand from "components/sidebar/components/Brand";
import Links from "components/sidebar/components/Links";
import React, {useContext} from "react";
import {UserDataContext} from "../../../contexts/UserDataContext";
import {avatarToUrl} from "../../../api/discord/DiscordApi";
import {useBrandBg, useTextColor} from "../../../utils/colors";
import {NavLink} from "react-router-dom";
import {IoIosArrowRoundBack} from "react-icons/io";
import {Locale} from "../../../utils/Language";

// FUNCTIONS

function SidebarContent(props) {
  const { routes, width } = props;
  // SIDEBAR
  return (
    <Flex
      w={width}
      direction="column"
      height="100%"
      pt="25px"
      borderRadius="30px"
    >
      <Brand />
      <Stack direction="column" mb="auto" mt="8px">
        <Box ps="20px">
          <Links routes={routes} />
        </Box>
      </Stack>
      <UserPreview />
    </Flex>
  );
}

function UserPreview() {
  const {id, username, avatar} = useContext(UserDataContext)
  const color = useTextColor()
  const bg = useColorModeValue("secondaryGray.400", "navy.600")
  const brand = useBrandBg()

  return <HStack
      pos="relative"
      px={3} py={10}
      m={3}
      justify="center"
      rounded="lg"
      bgGradient={`linear(to-br, ${bg} 60%, ${brand}) 40%`}
  >
    <Box pos="absolute" mt="-40%" p={3} rounded="full" bg={bg}>
      <Text fontWeight="bold">
        <Locale zh="登錄為" en="Logged As"/>
      </Text>
    </Box>

    <Box pos="absolute" top={0} left={0} m={4}>
      <NavLink to="../">
        <Icon as={IoIosArrowRoundBack} w="35px" h="35px"/>
      </NavLink>
    </Box>

    <Avatar
        color={color}
        name={username}
        src={avatarToUrl(id, avatar)}
        bg={brand}
    />
    <Text color={color} fontSize={23}>{username}</Text>
  </HStack>
}

export default SidebarContent;
