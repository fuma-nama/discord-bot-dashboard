import {Flex, ScaleFade, SimpleGrid, Text, useColorModeValue} from "@chakra-ui/react";

import {Action} from "../../../../components/card/Action";
import {config} from "config/config";

export default function ActionsList() {
    const textColor = useColorModeValue("secondaryGray.900", "white");

    return (
        <Flex direction="column">
            <Flex
                mt="45px"
                mb="20px"
                justifyContent="space-between"
                direction={{base: "column", md: "row"}}
                align={{base: "start", md: "center"}}
            >
                <Text color={textColor} fontSize="2xl" ms="24px" fontWeight="700">
                    動作列表
                </Text>
            </Flex>
            <SimpleGrid columns={{base: 1, lg: 2}} gap="20px">
                <Actions/>
            </SimpleGrid>
        </Flex>
    );
}

function Actions() {

    return Object.entries(config.actions).map(([id, action]) => {
        return (
            <ScaleFade key={id} in={true}>
                <Action
                    id={id}
                    action={action}
                />
            </ScaleFade>
        );
    })
}
