// Chakra imports
import {
  Box,
  Button,
  Flex,
  Icon,
  Image,
  Link,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
// Custom components
import Card from "components/card/Card.js";
import React from "react";
// Assets
import { iconToUrl } from "api/discord/DiscordApi";
import {invite} from "variables/links";

export default function Server(props) {
  const { server, ...rest } = props;
  const { name, id, icon } = server;

  // Chakra Color Mode
  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  const bg = useColorModeValue("white", "navy.700");
  return (
    <Card bg={bg} {...rest} p="14px">
      <Flex align="center" direction={{ base: "column", md: "row" }}>
        <Image
          h="160px"
          w="160px"
          src={iconToUrl(id, icon)}
          borderRadius="8px"
          me="20px"
        />
        <Stack
          mt={{ base: "10px", md: "0" }}
          alignItems={{ base: "center", md: "start" }}
        >
          <Text
            color={textColorPrimary}
            fontWeight="500"
            fontSize="2xl"
            mb="4px"
          >
            {name}
          </Text>
          <ServerButton server={server} />
        </Stack>
      </Flex>
    </Card>
  );
}

function ServerButton({server}) {
  const url = server.configurable? `/guild/${server.id}` : invite;

  return <Link href={url}>
    <Button fontWeight="500" variant={server.configurable? "brand" : "outline"} fontSize="md">
      {server.configurable? "配置服務器" : "邀請到服務器"}
    </Button>
  </Link>
}
