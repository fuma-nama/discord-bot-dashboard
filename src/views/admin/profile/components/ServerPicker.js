// Chakra imports
import {Stack, Text, useColorModeValue} from "@chakra-ui/react";
// Custom components
import Card from "components/card/Card.js";
import React, {useState} from "react";
import Server from "views/admin/profile/components/Server";
import {QueryHolderSkeleton} from "../../../../contexts/components/AsyncContext";
import SearchInput from "../../../../components/fields/SearchInput";

export default function ServerPicker({query, ...rest}) {

    // Chakra Color Mode
    const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
    const textColorSecondary = "gray.400";

    const [filter, setFilter] = useState("")

    return (
        <Card mb={{base: "0px", "2xl": "20px"}} gap={2} {...rest}>
            <Text
                color={textColorPrimary}
                fontWeight="bold"
                fontSize="2xl"
                mt="10px"
            >
                您的服務器
            </Text>
            <Text color={textColorSecondary} fontSize="md" me="26px">
                把Yeecord邀請到你的服務器, 並且客製化你的機器人
            </Text>
            <SearchInput value={filter} onChange={setFilter} groupStyle={{
                mt: 5,
                mb: "40px"
            }}/>
            <Stack direction="column">
                <QueryHolderSkeleton query={query} count={3}>
                    <Servers filter={filter} guilds={query.data}/>
                </QueryHolderSkeleton>
            </Stack>
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
                    mb="20px"
                    server={server}
                />
            );
        })
}