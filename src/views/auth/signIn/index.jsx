import React from "react";
// Chakra imports
import {Box, Button, Flex, Heading, Icon, Text,} from "@chakra-ui/react";
// Custom components
import DefaultAuth from "layouts/auth/Default";
// Assets
import illustration from "assets/img/auth/Banner.jpg";
import {FaDiscord} from "react-icons/fa";
import {config} from "config/config";
import {Locale} from "../../../utils/Language";
import {useDetailColor, useTextColor} from "../../../utils/colors";

function SignIn({loading = false}) {

  // Chakra color mode

  const textColor = useTextColor();
  const textColorSecondary = useDetailColor();

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
              variant="action"
            mb="26px"
            h="50px"
            color={textColor}
            fontWeight="bold"
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
            <Text color={textColorSecondary} fontWeight="400" fontSize="14px">
              <Locale zh="您的所有個人信息都將被保密" en="All your personal information will be kept confidential" />
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </DefaultAuth>
  );
}

export default SignIn;