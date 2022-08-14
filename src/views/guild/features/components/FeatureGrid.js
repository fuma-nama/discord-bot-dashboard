import {Flex, Text, SimpleGrid, useColorModeValue, SlideFade} from "@chakra-ui/react";
import Feature from "components/card/Feature";
import { useContext } from "react";

import { FeaturesContext } from "contexts/FeaturesContext";
import {config} from "../../../../config/config";

export default function FeatureGrid() {
  const textColor = useColorModeValue("secondaryGray.900", "white");

  return (
    <Flex direction="column">
      <Flex
        mt="45px"
        mb="20px"
        justifyContent="space-between"
        direction={{ base: "column", md: "row" }}
        align={{ base: "start", md: "center" }}
      >
        <Text color={textColor} fontSize="2xl" ms="24px" fontWeight="700">
          功能列表
        </Text>
      </Flex>
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