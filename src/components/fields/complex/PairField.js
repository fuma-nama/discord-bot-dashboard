import {Box, Flex} from "@chakra-ui/react";
import {OptionField} from "../OptionPanel";

export default function PairField({element, value, onChange}) {
    const [first, second] = value || []

    return <Flex direction={{base: "column", "3sm": "row"}} gap={3}>
        <Box w="fit-content">
            <OptionField
                option={element.first}
                value={first}
                onChange={v => onChange([v, second])}
            />
        </Box>

        <Box w="full">
            <OptionField
                option={element.second}
                value={second}
                onChange={v => onChange([first, v])}
            />
        </Box>
    </Flex>
}