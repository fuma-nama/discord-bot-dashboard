import {FormControl, FormHelperText, FormLabel} from "@chakra-ui/react";
import {InputField} from "components/fields/impl/InputField";
import Card from "components/card/Card";
import React from "react";

export default function NameInput({value, onChange}) {
    return <Card gap={5}>
        <FormControl isRequired>
            <FormLabel fontSize="lg" fontWeight="bold">Task Name</FormLabel>
            <InputField
                value={value}
                placeholder="請輸入文字"
                onChange={({target}) => onChange(target.value)}
            />
            <FormHelperText>
                你必須輸入一個名字
            </FormHelperText>
        </FormControl>
    </Card>
}