import React, {useContext} from "react";

// Chakra imports
import {Box, Button, Flex, HStack, Text} from "@chakra-ui/react";
// Assets
import bannerImg from "assets/img/common/ActionBanner.jpg";
import {GuildContext} from "contexts/guild/GuildContext";
import {BiArrowBack} from "react-icons/bi";
import {Link, useParams} from "react-router-dom";
import {SmallAddIcon} from "@chakra-ui/icons";
import {useActionInfo} from "contexts/actions/ActionDetailContext";

export default function ActionBanner({children}) {
  const {name, description, banner} = useActionInfo()

  return (
      <Box
          bgImage={banner || bannerImg}
          bgSize="cover"
          borderRadius="30px"
          overflow="hidden"
      >
        <Flex
            direction="column"
            backdropFilter="auto"
            backdropBrightness={0.5}
            py={{ base: "30px", md: "56px" }}
            px={{ base: "30px", md: "64px" }}
        >
          <Text
              fontSize={{ base: "24px", md: "34px" }}
              color="white"
              mb="14px"
              fontWeight="700"
              lineHeight={{ base: "32px", md: "42px" }}
          >
            {name}
          </Text>
          <Text
              color="white"
              mb="14px"
              fontWeight="700"
              lineHeight={{ base: "32px", md: "42px" }}
          >
            {description}
          </Text>
          <HStack mt={5} align="center">
            {children}
          </HStack>
        </Flex>
      </Box>
  );
}