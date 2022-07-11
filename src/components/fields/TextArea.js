import {Textarea } from "@chakra-ui/react";

export default function TextArea(props) {
    return <Textarea
        variant="main"
        _placeholder={{ fontWeight: "400", color: "secondaryGray.600" }}
        placeholder="請輸入文字"
        resize="none"
        {...props}
    />
}