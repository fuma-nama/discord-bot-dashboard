import {Flex, Text, useColorModeValue, Stack} from "@chakra-ui/react";
import {useContext} from "react";

import {Action} from "./Action";
import {ActionsContext, ActionsProvider} from "contexts/actions/ActionsContext";

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
            <Stack direction="column" gap="20px">
                <ActionsProvider>
                    <Actions/>
                </ActionsProvider>
            </Stack>
        </Flex>
    );
}

function Actions() {
    const {actions} = useContext(ActionsContext);

    return actions.map((action) => {
        return (
            <Action
                key={action.id}
                {...action}
                configUrl={`../action/${action.id}`}
            />
        );
    })
}
