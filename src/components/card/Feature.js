// Chakra imports
import {
    Box,
    Button,
    Flex,
    Image,
    Text,
    useColorModeValue,
} from "@chakra-ui/react";
import {Link} from "react-router-dom";
// Custom components
import Card from "components/card/Card.js";
// Assets
import React, {useContext, useState} from "react";
import {GuildContext} from "../../contexts/GuildContext";
import {enableFeature} from "api/yeecord";
import {useMutation, useQueryClient} from "react-query";

export default function Feature({
                                    banner,
                                    name,
                                    description,
                                    id: featureId,
                                    enabled: featureEnabled,
                                }) {
    const [enabled, setEnabled] = useState(featureEnabled);
    const {id: serverId} = useContext(GuildContext);
    const client = useQueryClient()

    const configUrl = `/guild/${serverId}/feature/${featureId}`
    const enableMutation = useMutation(
        () => enableFeature(serverId, featureId),
        {
            onSuccess() {
                setEnabled(true)

                return client.invalidateQueries(["features", serverId])
            }
        }
    )

    const textColor = useColorModeValue("navy.700", "white");
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
                <Flex flexDirection="column" justify="space-between" h="100%">
                    <Flex direction="column">
                        <Text
                            color={textColor}
                            fontSize="lg"
                            mb="5px"
                            fontWeight="bold"
                            me="14px"
                        >
                            {name}
                        </Text>
                        <Text
                            color="secondaryGray.600"
                            fontSize="sm"
                            fontWeight="400"
                            me="14px"
                        >
                            {description}
                        </Text>
                    </Flex>
                    <Flex mt="5">
                        {enabled ? (
                            <ConfigButton configUrl={configUrl}/>
                        ) : (
                            <EnableButton
                                enabling={enableMutation.isLoading}
                                onEnable={enableMutation.mutate}
                            />
                        )}
                    </Flex>
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

function EnableButton({enabling, onEnable}) {
    return (
        <Button
            onClick={onEnable}
            isLoading={enabling}
            fontSize="sm"
            borderRadius="70px"
            px="24px"
            py="5px"
        >
            啟用此功能
        </Button>
    );
}
