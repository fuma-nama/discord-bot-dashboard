// Chakra imports
import { Stack, Text, useColorModeValue } from "@chakra-ui/react";
// Custom components
import Card from "components/card/Card.js";
import React, {useContext, useMemo} from "react";
import Server from "views/admin/profile/components/Server";
import {UserDataContext} from "../../../../contexts/UserDataContext";
import {QueryHolderSkeleton} from "../../../../contexts/components/AsyncContext";

export default function ServerPicker({ query, ...rest }) {
    const userData = useContext(UserDataContext);

    const guilds = query.isSuccess && userData.guilds.map(g => ({
        ...g,
        configurable: query.data.includes(g.id)
    }))

  // Chakra Color Mode
  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  const textColorSecondary = "gray.400";
  return (
    <Card mb={{ base: "0px", "2xl": "20px" }} {...rest}>
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
      <Stack direction="column">
          <QueryHolderSkeleton query={query} count={3}>
              <Servers guilds={guilds} />
          </QueryHolderSkeleton>
      </Stack>
    </Card>
  );
}

function Servers({guilds}) {
    const cardShadow = useColorModeValue(
        "0px 18px 40px rgba(112, 144, 176, 0.12)",
        "unset"
    );

    return guilds.map((server) => {
        return (
            <Server
                key={server.id}
                boxShadow={cardShadow}
                mb="20px"
                server={server}
            />
        );
    })
}