/*eslint-disable*/
import React from "react";
import {
  Flex,
  Link,
  List,
  ListItem,
  Text,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import {blog, homepage, support} from "../../variables/links";

export default function Footer() {
  const textColor = useColorModeValue("gray.400", "white");
  const { toggleColorMode } = useColorMode();
  return (
    <Flex
      zIndex='3'
      flexDirection={{
        base: "column",
        xl: "row",
      }}
      alignItems={{
        base: "center",
        xl: "start",
      }}
      justifyContent='space-between'
      px={{ base: "30px", md: "50px" }}
      pb='30px'>
      <Text
        color={textColor}
        textAlign={{
          base: "center",
          xl: "start",
        }}
        mb={{ base: "20px", xl: "0px" }}>
        {" "}
        &copy; {1900 + new Date().getYear()}
        <Text as='span' fontWeight='500' ms='4px'>
          Yeecord Dashboard. All Rights Reserved. Made with love by
          <Link
            mx='3px'
            color={textColor}
            href={homepage}
            target='_blank'
            fontWeight='700'>
            Yeecord!
          </Link>
        </Text>
      </Text>
      <List display='flex'>
          <ListItem
              me={{
                  base: "20px",
                  md: "44px",
              }}>
              <Link
                  fontWeight='500'
                  color={textColor}
                  href={homepage}
              >
                  Home Page
              </Link>
          </ListItem>
        <ListItem
          me={{
            base: "20px",
            md: "44px",
          }}>
          <Link
            fontWeight='500'
            color={textColor}
            href={support}>
            Support
          </Link>
        </ListItem>
        <ListItem>
          <Link
            fontWeight='500'
            color={textColor}
            href={blog}>
            Blog
          </Link>
        </ListItem>
      </List>
    </Flex>
  );
}
