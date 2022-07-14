import {OptionField} from "../OptionPanel";
import {Box, Button, Flex, Text} from "@chakra-ui/react";
import {HSeparator} from "../../separator/Separator";

export default function ArrayField({element, value: valueRaw, onChange}) {
    const value = valueRaw || []

    const change = (i, v) => {
        const next = [...value]
        next[i] = v

        onChange(next)
    }

    return <>
        {
            value.map((val, i) => {
                const option = {
                    id: i,
                    ...element
                }

                const removeItem = () => {
                    onChange(
                        value.filter((_, j) => i !== j)
                    )
                }

                return <>
                    {i !== 0 && <HSeparator my={3}/>}
                    <Flex direction="row" gap={5}>
                        <OptionField option={option} value={val} onChange={v => change(i, v)} />
                        <Button variant="brand" onClick={removeItem}>刪除此行</Button>
                    </Flex>
                </>
            })
        }

        {value.length === 0 && <Text color="secondaryGray.600">還沒有任何內容</Text>}

        <Box mt={2}>
            <Button onClick={() => onChange([...value, element.holder])}>添加新行</Button>
        </Box>
    </>
}