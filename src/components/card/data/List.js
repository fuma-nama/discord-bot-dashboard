import {Flex, Icon, Text, useColorModeValue} from "@chakra-ui/react";
import Card from "components/card/Card";
import React from "react";
import {useTextColor} from "../../../utils/colors";

/**
 * input:
 * {
 *     title: "Hello World"
 *     description: "Brun"
 *     icon: MiMoney
 *     items: [
 *         {
 *             name: "Money"
 *             description: "Money you have"
 *             value: 0
 *             //icon: <...> (optional)
 *         }
 *     ]
 * }
 */
export function List({title, description, icon, items}) {
    const textColor = useTextColor()

    return <Card p="0px">
            <Flex
                direction="column"
                w="100%"
                px="22px"
                py="18px"
            >
                <Text color={textColor} fontSize="xl" fontWeight="600">
                    {title}
                </Text>
                <Text color={textColor}>
                    {description}
                </Text>
            </Flex>
        {
            items.map((item, key) => (
                <ListItem key={key} icon={icon} {...item} />
            ))
        }
    </Card>
}

function ListItem({name, description, value, icon}) {
    // Chakra Color Mode
    const textColor = useColorModeValue("brands.900", "white");
    const bgItem = useColorModeValue(
        {bg: "white", boxShadow: "0px 40px 58px -20px rgba(112, 144, 176, 0.12)"},
        {bg: "navy.700", boxShadow: "unset"}
    );

    return (
        <Card
            _hover={bgItem}
            bg='transparent'
            boxShadow='unset'
            px='24px'
            py='21px'
            transition='0.2s linear'>
            <Flex direction={{base: "column"}} justify='center'>
                <Flex position='relative' align='center'>
                    <Flex
                        direction='column'
                        w={{base: "70%", md: "100%"}}
                        me={{base: "4px", md: "32px", xl: "10px", "3xl": "32px"}}>
                        <Text
                            color={textColor}
                            fontSize={{
                                base: "md",
                            }}
                            mb='5px'
                            fontWeight='bold'
                            me='14px'>
                            {name}
                        </Text>
                        <Text
                            color='secondaryGray.600'
                            fontSize={{
                                base: "sm",
                            }}
                            fontWeight='400'
                            me='14px'>
                            {description}
                        </Text>
                    </Flex>
                    <Flex
                        me={{base: "4px", md: "32px", xl: "10px", "3xl": "32px"}}
                        align='center'>
                        <Icon as={icon} color={textColor} width='18px' me='7px'/>
                        <Text fontWeight='700' fontSize='md' color={textColor}>
                            {value}
                        </Text>
                    </Flex>
                </Flex>
            </Flex>
        </Card>
    );
}