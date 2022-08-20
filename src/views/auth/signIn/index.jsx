import React from "react";
// Chakra imports
import {Box, Button, Flex, Heading, Icon, Text, useColorModeValue,} from "@chakra-ui/react";
// Custom components
import DefaultAuth from "layouts/auth/Default";
// Assets
import illustration from "assets/img/auth/Banner.jpg";
import {FaDiscord} from "react-icons/fa";
import {config} from "config/config";
import {Locale} from "../../../utils/Language";

function SignIn({loading = false}) {

  // Chakra color mode

  const textColor = useColorModeValue("navy.700", "white");
  const textColorSecondary = "gray.400";
  const textColorDetails = useColorModeValue("navy.700", "secondaryGray.600");
  const dcBg = useColorModeValue("secondaryGray.300", "whiteAlpha.200");
  const dcText = useColorModeValue("navy.700", "white");
  const dcHover = useColorModeValue(
    { bg: "gray.200" },
    { bg: "whiteAlpha.300" }
  );
  const dcActive = useColorModeValue(
    { bg: "secondaryGray.300" },
    { bg: "whiteAlpha.200" }
  );

  const onSignIn = () => {
    window.location.href = `${config.serverUrl}/login`
  };

  return (
    <DefaultAuth illustrationBackground={illustration} image={illustration}>
      <Flex
        maxW={{ base: "100%", md: "max-content" }}
        w="100%"
        mx={{ base: "auto", lg: "0px" }}
        me="auto"
        h="100%"
        alignItems="start"
        justifyContent="center"
        mb={{ base: "30px", md: "60px" }}
        px={{ base: "25px", md: "0px" }}
        mt={{ base: "40px", md: "14vh" }}
        flexDirection="column"
      >
        <Box me="auto">
          <Heading color={textColor} fontSize="36px" mb="10px">
            <Locale zh="使用 Discord 登入控制面板" en="Login to your Discord Account" />
          </Heading>
          <Text
            mb="36px"
            ms="4px"
            color={textColorSecondary}
            fontWeight="400"
            fontSize="md"
          >
            <Locale zh="讓 Discord 不再只是聊天軟體" en="Discover more Features and Grow your Server up" />
          </Text>
        </Box>
        <Flex
          zIndex="2"
          direction="column"
          w={{ base: "100%", md: "420px" }}
          maxW="100%"
          background="transparent"
          borderRadius="15px"
          mx={{ base: "auto", lg: "unset" }}
          me="auto"
          mb={{ base: "20px", md: "auto" }}
        >
          <Button
            fontSize="sm"
            me="0px"
            mb="26px"
            py="15px"
            h="50px"
            borderRadius="16px"
            bg={dcBg}
            color={dcText}
            fontWeight="500"
            _hover={dcHover}
            _active={dcActive}
            _focus={dcActive}
            onClick={onSignIn}
            isLoading={loading}
          >
            <Icon as={FaDiscord} w="20px" h="20px" me="10px" />
            <Locale zh="Discord 登入" en="Login with Discord" />
          </Button>
          <Flex
            flexDirection="column"
            justifyContent="center"
            alignItems="start"
            maxW="100%"
            mt="0px"
          >
            <Text color={textColorDetails} fontWeight="400" fontSize="14px">
              <Locale zh="您的所有個人信息都將被保密" en="All your personal information will be kept confidential" />
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </DefaultAuth>
  );
}

export default SignIn;