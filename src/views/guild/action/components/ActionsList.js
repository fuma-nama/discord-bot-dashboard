import {Flex, ScaleFade, SimpleGrid, Text} from "@chakra-ui/react";

import {Action} from "components/card/Action";
import {config} from "config/config";
import {Locale} from "utils/Language";
import {useTextColor} from "../../../../utils/colors";

export default function ActionsList() {
    const textColor = useTextColor();

    return (
        <Flex direction="column" gap="20px">
            <Text
                color={textColor}
                fontSize="2xl"
                fontWeight="700"
                ms="24px"
                mt="45px">
                <Locale zh="動作列表" en="Actions List" />
            </Text>
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
