import React, {useContext} from "react";
import {Box, Button, Flex, HStack, Image, Text, useColorModeValue} from "@chakra-ui/react";
import Card from "components/card/Card";
import {Link} from "react-router-dom";
import {GuildContext} from "contexts/guild/GuildContext";
import {Locale, useLocale} from "../../utils/Language";

/**
 * {
 *  banner: "",
 *  name: "Kill Kane",
 *  description: "Kill Kane in a channel"
 * }
 */
export function Action({id, action}) {
    const {id: serverId} = useContext(GuildContext)
    const configUrl = `/guild/${serverId}/action/${id}`
    const locale = useLocale()

    const textColor = useColorModeValue("navy.700", "white");
    const detailColor = useColorModeValue("secondaryGray.900", "secondaryGray.600");

    return (
        <Card p="20px">
            <Flex direction="column" gap={3}>
                {action.banner?
                    <Image h="5rem" objectFit="cover" rounded="lg" bg="brand.500" src={action.banner}/> :
                    <Box h="5rem" rounded="lg" bg="brand.500" />
                }
                <Text
                    color={textColor}
                    fontSize={{
                        base: "xl",
                        md: "lg",
                    }}
                    fontWeight="bold"
                >
                    {locale(action.name)}
                </Text>
                <Text
                    color={detailColor}
                    fontSize="md"
                    mb={5}
                >
                    {action.description}
                </Text>
                <HStack>
                    <Link to={configUrl}>
                        <Button px={10} variant="brand">
                            <Locale zh='打開' en="Open" />
                        </Button>
                    </Link>
                </HStack>
            </Flex>
        </Card>
    );
}