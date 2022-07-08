// Chakra imports
import {Button, Text, useColorMode, useColorModeValue} from "@chakra-ui/react";
import Card from "components/card/Card.js";
// Custom components
import SwitchField from "components/fields/SwitchField";
import {AccountContext, logout} from "../../../../contexts/AccountContext";
import {useContext} from "react";

export default function Settings(props) {
  const { ...rest } = props;
  const { colorMode, setColorMode } = useColorMode();
  const accountCtx = useContext(AccountContext);

  // Chakra Color Mode
  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  return (
    <Card mb="20px" {...rest}>
        <Text
            w="100%"
          color={textColorPrimary}
          fontWeight="bold"
          fontSize="2xl"
          mb="30px"
        >
          設置
        </Text>
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
        <Button
            size="lg"
            mt="auto"
            variant="brand"
            onClick={() => logout(accountCtx)}
        >
            登出帳號
        </Button>
    </Card>
  );
}
