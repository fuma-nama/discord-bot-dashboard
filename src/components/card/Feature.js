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
import {useMutation} from "react-query";

export default function Feature({
                                    banner,
                                    name,
                                    description,
                                    configUrl,
                                    id: featureId,
                                    enabled: featureEnabled,
                                }) {
    const [enabled, setEnabled] = useState(featureEnabled);
    const guild = useContext(GuildContext);

    const enableMutation = useMutation(
        () => enableFeature(guild.id, featureId),
        {
            onSuccess() {
                setEnabled(true)
            }
        }
    )

    const textColor = useColorModeValue("navy.700", "white");
    const brandColor = useColorModeValue("brand.500", "brand.400");

    return (
        <Card p="20px">
            <Flex direction={{base: "column"}} justify="center">
                <Box mb={{base: "20px", "2xl": "20px"}} position="relative">
                    <Image
                        bgColor={brandColor}
                        src={banner}
                        w="100%"
                        h="100%"
                        borderRadius="20px"
                    />
                </Box>
                <Flex flexDirection="column" justify="space-between" h="100%">
                    <Flex
                        justify="space-between"
                        direction={{
                            base: "row",
                            md: "column",
                            lg: "row",
                            xl: "column",
                            "2xl": "row",
                        }}
                        mb="auto"
                    >
                        <Flex direction="column">
                            <Text
                                color={textColor}
                                fontSize={{
                                    base: "xl",
                                    md: "lg",
                                }}
                                mb="5px"
                                fontWeight="bold"
                                me="14px"
                            >
                                {name}
                            </Text>
                            <Text
                                color="secondaryGray.600"
                                fontSize={{
                                    base: "sm",
                                }}
                                fontWeight="400"
                                me="14px"
                            >
                                {description}
                            </Text>
                        </Flex>
                    </Flex>
                    <Flex
                        align="start"
                        justify="space-between"
                        direction={{
                            base: "row",
                            md: "column",
                            lg: "row",
                            xl: "column",
                            "2xl": "row",
                        }}
                        mt="25px"
                    >
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
