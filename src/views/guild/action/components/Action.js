import React, {Fragment, useContext} from "react";
import {Box, Button, Flex, Grid, GridItem, HStack, Image, Text, useColorModeValue} from "@chakra-ui/react";
import Card from "components/card/Card";
import {Link} from "react-router-dom";
import {GuildContext} from "contexts/guild/GuildContext";

/**
 * {
 *  id: "kill_kane",
 *  banner: "",
 *  name: "Kill Kane",
 *  description: "Kill Kane in a channel"
 * }
 */
export function Action({action}) {
    const textColor = useColorModeValue("navy.700", "white");
    const {id: serverId} = useContext(GuildContext)
    const actionId = action.id

    const configUrl = `/guild/${serverId}/action/${actionId}`
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
                    {action.name}
                </Text>
                <Text
                    color={textColor}
                    fontSize="md"
                    mb={5}
                >
                    {action.description}
                </Text>
                <HStack>
                    <Link to={configUrl}>
                        <Button px={10} variant="brand">Open</Button>
                    </Link>
                </HStack>
            </Flex>
        </Card>
    );
}