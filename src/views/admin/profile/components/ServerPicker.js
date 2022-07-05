// Chakra imports
import { Stack, Text, useColorModeValue } from "@chakra-ui/react";
// Custom components
import Card from "components/card/Card.js";
import React from "react";
import Server from "views/admin/profile/components/Server";

export default function ServerPicker({ servers }) {
  // Chakra Color Mode
  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  const textColorSecondary = "gray.400";
  const cardShadow = useColorModeValue(
    "0px 18px 40px rgba(112, 144, 176, 0.12)",
    "unset"
  );
  return (
    <Card mb={{ base: "0px", "2xl": "20px" }}>
      <Text
        color={textColorPrimary}
        fontWeight="bold"
        fontSize="2xl"
        mt="10px"
        mb="4px"
      >
        您的服務器
      </Text>
      <Text color={textColorSecondary} fontSize="md" me="26px" mb="40px">
        把Yeecord邀請到你的服務器, 並且客製化你的機器人
      </Text>
      <Stack overflowY="auto" maxHeight="container.md" direction="column">
        {servers.map((server) => {
          return (
            <Server
              key={server.id}
              boxShadow={cardShadow}
              mb="20px"
              server={server}
            />
          );
        })}
      </Stack>
    </Card>
  );
}
