import React from "react";

// Chakra imports
import { Button, Flex, Link, Text } from "@chakra-ui/react";

// Assets
import banner from "assets/img/common/ActionBanner.jpg";

export default function Banner() {
  // Chakra Color Mode
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
          通過儀表板直接管理您的服務器
      </Text>
      <Text
        fontSize="md"
        color="#E3DAFF"
        fontWeight="500"
        mb="40px"
        lineHeight="28px"
      >
          給你的服務器更多的Yee力，讓你的社區活躍起來!
      </Text>
      <Flex align="center">
        <Button
            variant="white"
            me="38px"
        >
            觀看教程
        </Button>
      </Flex>
    </Flex>
  );
}
