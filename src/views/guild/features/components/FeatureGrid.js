import { Flex, Text, SimpleGrid, useColorModeValue } from "@chakra-ui/react";
import Feature from "components/card/Feature";
import { useContext } from "react";

import { FeatureContext } from "contexts/FeatureContext";

export default function FeatureGrid() {
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const { features } = useContext(FeatureContext);

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
      <SimpleGrid columns={{ base: 1, lg: 3, xl:2, "2xl": 3 }} gap="20px">
        {features.map((feature) => {
          return (
            <Feature
              key={feature.id}
              {...feature}
              configUrl={`../feature/${feature.id}`}
            />
          );
        })}
      </SimpleGrid>
    </Flex>
  );
}
