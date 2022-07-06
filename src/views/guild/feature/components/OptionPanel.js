import { Input, Text, Switch, Select } from "@chakra-ui/react";
import Card from "components/card/Card.js";

export function OptionPanel({ value, onChange, option }) {
  console.log(value);
  const getInput = () => {
    switch (option.type) {
      case "boolean":
        return (
          <Switch
            colorScheme="brandScheme"
            size="md"
            isChecked={value}
            variant="main"
            onChange={({ target }) => onChange(target.checked)}
          />
        );
      case "number":
      case "string":
        const isText = option.type === "string";
        return (
          <Input
            fontWeight="500"
            variant="main"
            type={isText ? "text" : "number"}
            _placeholder={{ fontWeight: "400", color: "secondaryGray.600" }}
            value={value}
            placeholder={isText ? "請輸入文字" : "請輸入數字"}
            onChange={({ target }) =>
              onChange(isText ? target.value : target.valueAsNumber)
            }
          />
        );
      case "enum":
        return (
          <Select
            placeholder="選擇一個項目"
            value={value}
            onChange={({ target }) => onChange(target.value)}
          >
            {option.choices.map((choice) => {
              return (
                <option key={choice} id={choice}>
                  {choice}
                </option>
              );
            })}
          </Select>
        );
      default:
        return <></>;
    }
  };

  return (
    <Card>
      <Text fontWeight="extrabold" fontSize="xl">
        {option.name}
      </Text>
      <Text mb="10">{option.description}</Text>
      {getInput()}
    </Card>
  );
}
