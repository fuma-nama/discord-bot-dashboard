import {FormControl, FormHelperText, FormLabel} from "@chakra-ui/react";
import {InputField} from "components/fields/impl/InputField";
import Card from "components/card/Card";
import React from "react";
import {Locale, useLocale} from "utils/Language";

export default function NameInput({value, onChange}) {
    const locale = useLocale()

    return <Card gap={5}>
        <FormControl isRequired>
            <FormLabel fontSize="lg" fontWeight="bold">
                <Locale zh="任務名稱" en="Task Name" />
            </FormLabel>
            <InputField
                value={value}
                placeholder={locale({zh: "請輸入文字", en: "Please enter Text"})}
                onChange={({target}) => onChange(target.value)}
            />
            <FormHelperText>
                <Locale zh="你必須輸入一個名字" en="You must enter a Name" />
            </FormHelperText>
        </FormControl>
    </Card>
}