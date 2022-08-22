import React from "react";
import {Flex, Link as LinkText, Text,} from "@chakra-ui/react";
import {homepage} from "variables/links";
import {config} from "config/config";
import {Locale} from "../../utils/Language";
import {useTextColor} from "../../utils/colors";

export default function Footer({children}) {
    const textColor = useTextColor();

    return (
        <Flex
            zIndex='3'
            direction={{
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
                    <Locale
                        zh={`
                            ${config.name} 儀表板，基於
                        `}
                        en={`
                            ${config.name} Dashboard. All Rights Reserved. Made with
                        `}
                    />

                    <LinkText
                        mx='3px'
                        color={textColor}
                        href={homepage}
                        target='_blank'
                        fontWeight='700'>
                        Discord Dashboard
                    </LinkText>
                </Text>
            </Text>
            {children}
        </Flex>
    );
}
