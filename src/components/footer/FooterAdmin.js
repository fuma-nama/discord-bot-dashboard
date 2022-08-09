/*eslint-disable*/
import React from "react";
import {Flex, Link as LinkText, List, ListItem, Text, useColorModeValue,} from "@chakra-ui/react";
import {homepage} from "variables/links";
import {config} from "variables/config";

export default function Footer() {
    const textColor = useColorModeValue("gray.400", "white");
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
            px={{base: "30px", md: "50px"}}
            pb='30px'>
            <Text
                color={textColor}
                textAlign={{
                    base: "center",
                    xl: "start",
                }}
                mb={{base: "20px", xl: "0px"}}>
                &copy; {1900 + new Date().getYear()}
                <Text as='span' fontWeight='500' ms='4px'>
                    {config.name} Dashboard. All Rights Reserved. Made with
                    <LinkText
                        mx='3px'
                        color={textColor}
                        href={homepage}
                        target='_blank'
                        fontWeight='700'>
                        Discord Dashboard!
                    </LinkText>
                </Text>
            </Text>
            <List display='flex'>{
                config.footer.map(item => (
                    <ListItem
                        key={item.name}
                        me={{
                            base: "20px",
                            md: "44px",
                        }}>
                        <LinkText
                            fontWeight='500'
                            color={textColor}
                            href={item.url}
                        >
                            {item.name}
                        </LinkText>
                    </ListItem>
                ))
            }
            </List>
        </Flex>
    );
}
