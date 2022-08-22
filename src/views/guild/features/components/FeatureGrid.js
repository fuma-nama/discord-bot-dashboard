import {Flex, SimpleGrid, SlideFade, Text} from "@chakra-ui/react";
import Feature from "components/card/Feature";
import {useContext} from "react";

import {FeaturesContext} from "contexts/FeaturesContext";
import {config} from "../../../../config/config";
import {Locale} from "../../../../utils/Language";
import {useTextColor} from "../../../../utils/colors";

export default function FeatureGrid() {
    const textColor = useTextColor();

    return (
        <Flex direction="column" gap="20px">
            <Text
                color={textColor}
                fontSize="2xl"
                fontWeight="700"
                ms="24px"
                mt="45px">
                <Locale zh="功能列表" en="Features List" />
            </Text>
            <SlideFade in={true} offsetY='20px'>
                <SimpleGrid columns={{ base: 1, lg: 3, xl:2, "2xl": 3 }} gap="20px">
                    <Features />
                </SimpleGrid>
            </SlideFade>
        </Flex>
    );
}

function Features() {
    const {enabled} = useContext(FeaturesContext);

    return Object.entries(config.features).map(([id, feature]) =>
        <Feature
            key={id}
            {...feature}
            id={id}
            enabled={enabled.includes(id)}
        />
    )
}