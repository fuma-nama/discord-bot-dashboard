import {Flex, Text, SimpleGrid, useColorModeValue, Stack} from "@chakra-ui/react";
import Feature from "components/card/Feature";
import { useContext } from "react";

import { FeatureContext } from "contexts/FeatureContext";
import {Action} from "./Action";
import {ActionsContext} from "../../../../contexts/actions/ActionsContext";

export default function ActionsList() {
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const {actions} = useContext(ActionsContext);

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
            動作列表
        </Text>
      </Flex>
      <Stack direction="column" gap="20px">
        {actions.map((action) => {
          return (
            <Action
              key={action.id}
              {...action}
              configUrl={`../action/${action.id}`}
            />
          );
        })}
      </Stack>
    </Flex>
  );
}
