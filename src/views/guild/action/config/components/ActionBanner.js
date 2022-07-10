import React, { useContext } from "react";

// Chakra imports
import { Button, Flex, Text } from "@chakra-ui/react";
// Assets
import banner from "assets/img/layout/NftBanner1.png";
import { GuildContext } from "contexts/GuildContext";
import { BiArrowBack } from "react-icons/bi";
import {ActionDetailContext} from "../../../../../contexts/actions/ActionDetailContext";
import {Link} from "react-router-dom";

export default function ActionBanner() {
  const { description, status } = useContext(ActionDetailContext).action;

  return (
    <Flex
      direction="column"
      bgImage={banner}
      bgSize="cover"
      py={{ base: "30px", md: "56px" }}
      px={{ base: "30px", md: "64px" }}
      borderRadius="30px"
    >
      <Text
        fontSize={{ base: "24px", md: "34px" }}
        color="white"
        mb="14px"
        fontWeight="700"
        lineHeight={{ base: "32px", md: "42px" }}
      >
        {description}
      </Text>
        <Text
            color="white"
            mb="14px"
            fontWeight="700"
            lineHeight={{ base: "32px", md: "42px" }}
        >
            {status}
        </Text>
      <Flex align="center">
        <BackButton />
      </Flex>
    </Flex>
  );
}

function BackButton() {
  const { id: serverId } = useContext(GuildContext);

  return (
    <Link to={`/guild/${serverId}/actions`}>
      <Button
        bg="white"
        color="black"
        _hover={{ bg: "whiteAlpha.900" }}
        _active={{ bg: "white" }}
        _focus={{ bg: "white" }}
        fontWeight="500"
        fontSize="14px"
        py="20px"
        px="27"
        me="38px"
        leftIcon={<BiArrowBack />}
      >
        返回動作面板
      </Button>
    </Link>
  );
}
