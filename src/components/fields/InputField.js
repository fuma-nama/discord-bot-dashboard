import {Input} from "@chakra-ui/react";

export function InputField(props) {
    return <Input
        fontWeight="500"
        variant="main"
        _placeholder={{ fontWeight: "400", color: "secondaryGray.600" }}
        {...props}
    />
}