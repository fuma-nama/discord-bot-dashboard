import { Input, Text, Switch } from "@chakra-ui/react";
import Card from "components/card/Card.js";
import {SelectField} from "components/fields/SelectField";

export function OptionPanel({ value, onChange, option }) {

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
          <SelectField
              options={option.choices.map((choice) => ({
                  label: choice,
                  value: choice,
              }))}
              placeholder="選擇一個項目"
              value={value}
              onChange={(v) => onChange(v)}
          />
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
