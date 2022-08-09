/*eslint-disable*/
import React from "react";
import {
  Flex,
  Link,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import {config} from "config/config";
import {homepage} from "variables/links";

export default function Footer() {
  let textColor = useColorModeValue("gray.400", "white");

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
            {config.name} Dashboard. All Rights Reserved. Made with
            <Link
                mx='3px'
                color={textColor}
                href={homepage}
                target='_blank'
                fontWeight='700'>
                Discord Dashboard!
            </Link>
        </Text>
      </Text>
    </Flex>
  );
}
