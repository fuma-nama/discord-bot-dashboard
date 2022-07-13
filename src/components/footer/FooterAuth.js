/*eslint-disable*/
import React from "react";
import {
  Flex,
  Link,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

export default function Footer() {
  let textColor = useColorModeValue("gray.400", "white");
  let linkColor = useColorModeValue({ base: "gray.400", lg: "white" }, "white");
  return (
    <Flex
      zIndex='3'
      flexDirection={{
        base: "column",
        lg: "row",
      }}
      alignItems={{
        base: "center",
        xl: "start",
      }}
      justifyContent='space-between'
      px={{ base: "30px", md: "0px" }}
      pb='30px'>
      <Text
        color={textColor}
        textAlign={{
          base: "center",
          xl: "start",
        }}
        mb={{ base: "20px", lg: "0px" }}>
        {" "}
        &copy; {1900 + new Date().getYear()}
        <Text as='span' fontWeight='500' ms='4px'>
          Dashboard. All Rights Reserved. Made with love by
          <Link
            mx='3px'
            color={textColor}
            href='https://www.simmmple.com'
            target='_blank'
            fontWeight='700'>
            Yeecord!
          </Link>
        </Text>
      </Text>
    </Flex>
  );
}
