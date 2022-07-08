import React, { useContext } from "react";

// Chakra imports
import { Button, Flex, Text } from "@chakra-ui/react";
import { FeatureDetailContext } from "contexts/FeatureDetailContext";
// Assets
import banner from "assets/img/layout/NftBanner1.png";
import { GuildContext } from "contexts/GuildContext";
import { BiArrowBack } from "react-icons/bi";
import {Link} from "react-router-dom";

export default function Banner() {
  const { name, description } = useContext(FeatureDetailContext);

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
        maxW={{
          base: "100%",
          md: "64%",
          lg: "46%",
          xl: "70%",
          "2xl": "50%",
          "3xl": "42%",
        }}
        fontWeight="700"
        lineHeight={{ base: "32px", md: "42px" }}
      >
        {name}
      </Text>
      <Text
        fontSize="md"
        color="#E3DAFF"
        maxW={{
          base: "100%",
          md: "64%",
          lg: "40%",
          xl: "56%",
          "2xl": "46%",
          "3xl": "34%",
        }}
        fontWeight="500"
        mb="40px"
        lineHeight="28px"
      >
        {description}
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
    <Link to={`/guild/${serverId}/features`}>
      <Button
          variant="white"
        me="38px"
        leftIcon={<BiArrowBack />}
      >
        返回控制面板
      </Button>
    </Link>
  );
}
