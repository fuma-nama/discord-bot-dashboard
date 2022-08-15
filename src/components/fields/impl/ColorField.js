import {HexColorPicker} from "react-colorful";
import {Box, Flex} from "@chakra-ui/react";

export default function ColorField({value, onChange}) {
    const color = value || "#aabbcc";

    return <Flex direction={{base: "column", md: "row"}} gap="10">
        <Box minHeight="200px" flex={1} bg={color} rounded="lg" />
        <Box w={{base: "full", md: "300px"}} maxW={{md: "50%"}}>
            <HexColorPicker style={{width: "100%"}} color={color} onChange={onChange} />
        </Box>
    </Flex>;
}