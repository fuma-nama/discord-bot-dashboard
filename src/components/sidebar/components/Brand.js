import React, {useContext} from "react";

// Chakra imports
import {Text, Flex, useColorModeValue, Avatar, HStack} from "@chakra-ui/react";

// Custom components
import { HSeparator } from "components/separator/Separator";
import {GuildContext} from "contexts/guild/GuildContext";
import {iconToUrl, useGuild} from "api/discord/DiscordApi";
import {QueryHolderSkeleton} from "contexts/components/AsyncContext";
import {config} from "../../../config/config";

export function SidebarBrand() {
  //   Chakra color mode
  let logoColor = useColorModeValue("navy.700", "white");
  const {id} = useContext(GuildContext)

  return (
    <Flex align="center" direction="column">
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

  return <QueryHolderSkeleton query={query} height="100px" count={1}>{() =>
      <HStack align="center" mb={5} px={5}>
        <Avatar name={query.data.name} src={iconToUrl(query.data.id, query.data.icon)} />
        <Text fontWeight="extrabold" fontSize="2xl" color={logoColor}>
          {query.data.name}
        </Text>
      </HStack>
  }
  </QueryHolderSkeleton>
}

export default SidebarBrand;
