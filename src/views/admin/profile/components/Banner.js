// Chakra imports
import { Avatar, Box, Flex, Text, useColorModeValue } from "@chakra-ui/react";
import Card from "components/card/Card.js";
import React from "react";
import {config} from "../../../../variables/config";

export default function Banner(props) {
  const { banner, avatar, name, joinedServers, servers } = props;
  // Chakra Color Mode
  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  const textColorSecondary = "gray.400";
  const borderColor = useColorModeValue(
    "white !important",
    "#111C44 !important"
  );
  return (
    <Card mb={{ base: "0px", lg: "20px" }} align="center">
      <Box
        bgColor="#4318FF"
        bg={banner && `url(${banner})`}
        bgPosition={"center"}
        bgSize="cover"
        borderRadius="16px"
        h="131px"
        w="100%"
      />
      <Avatar
        mx="auto"
        src={avatar}
        h="87px"
        w="87px"
        mt="-43px"
        border="4px solid"
        borderColor={borderColor}
      />
      <Text color={textColorPrimary} fontWeight="bold" fontSize="xl" mt="10px">
        {name}
      </Text>
      <Text color={textColorSecondary} fontSize="sm">
        歡迎回到 {config.name}
      </Text>
      <Flex w="max-content" mx="auto" mt="26px" flexWrap="wrap">
        <Flex mx="auto" me="60px" align="center" direction="column">
          <Text color={textColorPrimary} fontSize="2xl" fontWeight="700">
            {joinedServers}
          </Text>
          <Text color={textColorSecondary} fontSize="sm" fontWeight="400">
              已加入的服務器
          </Text>
        </Flex>
        <Flex mx="auto" align="center" direction="column">
          <Text color={textColorPrimary} fontSize="2xl" fontWeight="700">
            {servers}
          </Text>
          <Text color={textColorSecondary} fontSize="sm" fontWeight="400">
            您擁有的服務器
          </Text>
        </Flex>
      </Flex>
    </Card>
  );
}
