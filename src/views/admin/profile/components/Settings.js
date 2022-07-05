// Chakra imports
import { Flex, Text, useColorMode, useColorModeValue } from "@chakra-ui/react";
import Card from "components/card/Card.js";
// Custom components
import SwitchField from "components/fields/SwitchField";
import Menu from "components/menu/MainMenu";

export default function Settings(props) {
  const { ...rest } = props;
  const { colorMode, setColorMode } = useColorMode();

  // Chakra Color Mode
  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  return (
    <Card mb="20px" {...rest}>
      <Flex align="center" w="100%" justify="space-between" mb="30px">
        <Text
          color={textColorPrimary}
          fontWeight="bold"
          fontSize="2xl"
          mb="4px"
        >
          設置
        </Text>
        <Menu />
      </Flex>
      <SwitchField
        reversed={true}
        fontSize="sm"
        mb="20px"
        id="1"
        label="Item update notifications"
      />
      <SwitchField
        reversed={true}
        fontSize="sm"
        mb="20px"
        id="2"
        label="Item comment notifications"
      />
      <SwitchField
        reversed={true}
        fontSize="sm"
        mb="20px"
        id="3"
        label="黑暗主題"
        isChecked={colorMode === "dark"}
        onChange={({ target }) => {
          setColorMode(target.checked ? "dark" : "light");
        }}
      />
    </Card>
  );
}
