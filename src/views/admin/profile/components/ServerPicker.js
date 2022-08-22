// Chakra imports
import {Flex, SimpleGrid, Text, useColorModeValue} from "@chakra-ui/react";
// Custom components
import Card from "components/card/Card.js";
import React, {useState} from "react";
import Server from "views/admin/profile/components/Server";
import {QueryHolderSkeleton} from "../../../../contexts/components/AsyncContext";
import SearchInput from "../../../../components/fields/impl/SearchInput";
import {config} from "../../../../config/config";
import {Locale} from "../../../../utils/Language";
import {useDetailColor, useTextColor} from "../../../../utils/colors";

export default function ServerPicker({query, ...rest}) {

    // Chakra Color Mode
    const textColorPrimary = useTextColor();
    const textColorSecondary = useDetailColor();

    const [filter, setFilter] = useState("")

    return (
        <Card mb={{base: "0px", "2xl": "20px"}} gap="5rem" {...rest}>
            <Flex direction="column" align="center">
                <Text
                    color={textColorPrimary}
                    fontWeight="bold"
                    fontSize="2xl"
                    mt="10px"
                >
                    <Locale zh="您的服務器" en="Your Servers" />
                </Text>
                <Text color={textColorSecondary} fontSize="md">
                    <Locale
                        zh={`把${config.name}邀請到你的服務器, 並且客製化你的機器人`}
                        en={`Invite ${config.name} to Your Server, And Customize the bot`}
                    />
                </Text>

                <SearchInput value={filter} onChange={setFilter} groupStyle={{
                    mt: 5,
                    maxW: "900px"
                }}/>
            </Flex>
            <SimpleGrid columns={{base: 1, lg: 2, "2xl": 3}} gap={5}>
                <QueryHolderSkeleton count={3} query={query}>
                    <Servers filter={filter} guilds={query.data}/>
                </QueryHolderSkeleton>
            </SimpleGrid>
        </Card>
    );
}

function Servers({filter, guilds}) {
    const cardShadow = useColorModeValue(
        "0px 18px 40px rgba(112, 144, 176, 0.12)",
        "unset"
    );

    return guilds
        .filter(server => server.name
            .toLowerCase()
            .includes(filter.toLowerCase())
        )
        .map((server) => {
            return (
                <Server
                    key={server.id}
                    boxShadow={cardShadow}
                    server={server}
                />
            );
        })
}