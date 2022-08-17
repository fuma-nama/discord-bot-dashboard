// Chakra imports
import {Box, Button, ButtonGroup, Flex, Image, Text, useColorModeValue,} from "@chakra-ui/react";
import {Link} from "react-router-dom";
// Custom components
import Card from "components/card/Card.js";
// Assets
import React, {useContext} from "react";
import {GuildContext} from "../../contexts/guild/GuildContext";
import {setFeatureEnabled} from "api/yeecord";
import {useMutation, useQueryClient} from "react-query";

export default function Feature({
                                    banner,
                                    name,
                                    description,
                                    id: featureId,
                                    enabled,
                                }) {
    const {id: serverId} = useContext(GuildContext);
    const client = useQueryClient()

    const configUrl = `/guild/${serverId}/feature/${featureId}`
    const enableMutation = useMutation(
        (enabled) => setFeatureEnabled(serverId, featureId, enabled),
        {
            onSuccess(_, enabled) {
                const modify = (data) => {
                    if (enabled) {
                        return [...data.enabled, featureId]
                    } else {
                        return data.enabled.filter(id => featureId !== id)
                    }
                }

                return client.setQueryData(
                    ["features", serverId],
                    data => ({
                        ...data,
                        enabled: modify(data)
                    })
                )
            }
        }
    )

    const textColor = useColorModeValue("navy.700", "white");
    const detailColor = useColorModeValue("secondaryGray.900", "secondaryGray.600");

    const brandColor = useColorModeValue("brand.500", "brand.400");

    return (
        <Card p="20px">
            <Flex direction="row" gap={3} h="100%">
                {banner && <Box w="10rem">
                    <Image
                        bgColor={brandColor}
                        src={banner}
                        borderRadius="20px"
                    />
                </Box>}
                <Flex flexDirection="column" justify="space-between" h="100%" gap={3}>
                    <Flex direction="column">
                        <Text
                            color={textColor}
                            fontSize="lg"
                            fontWeight="bold"
                        >
                            {name}
                        </Text>
                        <Text
                            color={detailColor}
                            fontSize="sm"
                            fontWeight="400"
                        >
                            {description}
                        </Text>
                    </Flex>
                    <ButtonGroup mt="5">
                        {enabled && (
                            <ConfigButton configUrl={configUrl}/>
                        )}
                        <EnableButton
                            enabled={enabled}
                            isLoading={enableMutation.isLoading}
                            onChange={enableMutation.mutate}
                        />
                    </ButtonGroup>
                </Flex>
            </Flex>
        </Card>
    );
}

function ConfigButton({configUrl}) {
    return (
        <Link
            to={configUrl}
        >
            <Button
                variant="brand"
                fontSize="sm"
                borderRadius="70px"
                px="24px"
                py="5px"
            >
                配置此功能
            </Button>
        </Link>
    );
}

function EnableButton({enabled, isLoading, onChange}) {
    return (
        <Button
            onClick={() => onChange(!enabled)}
            isLoading={isLoading}
            fontSize="sm"
            borderRadius="70px"
            px="24px"
            py="5px"
        >
            {enabled? "禁用" : "啟用"}此功能
        </Button>
    );
}
