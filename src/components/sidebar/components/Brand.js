import React, {useContext} from "react";

// Chakra imports
import {Avatar, Flex, HStack, Skeleton, Text} from "@chakra-ui/react";

// Custom components
import {HSeparator} from "components/separator/Separator";
import {GuildContext} from "contexts/guild/GuildContext";
import {iconToUrl, useGuild} from "api/discord/DiscordApi";
import {config} from "../../../config/config";
import {useTextColor} from "../../../utils/colors";

export function SidebarBrand() {
  //   Chakra color mode
  let logoColor = useTextColor()
  const {id} = useContext(GuildContext)

  return (
    <Flex align="center" direction="column" gap={5}>
        {
            id != null? (
                <GuildHeader id={id} logoColor={logoColor} />
            ) : (
                <Text my="32px" fontWeight="extrabold" fontSize="2xl" color={logoColor}>
                  {config.name} Dashboard
                </Text>
            )
        }
      <HSeparator mb="20px" />
    </Flex>
  );
}

function GuildHeader({id, logoColor}) {
  const query = useGuild(id)

  return query.isLoading?
      <Skeleton w="80%" h="5rem" rounded="xl" />
      :
      <HStack align="center" px={5}>
        <Avatar name={query.data.name} src={iconToUrl(query.data.id, query.data.icon)} />
        <Text fontWeight="extrabold" fontSize="2xl" color={logoColor}>
          {query.data.name}
        </Text>
      </HStack>
}

export default SidebarBrand;
