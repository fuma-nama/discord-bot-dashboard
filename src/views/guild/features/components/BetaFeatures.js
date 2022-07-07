import {Flex, Icon, Text, useColorModeValue} from "@chakra-ui/react";
import Card from "components/card/Card";
import React, {useContext, useState} from "react";
import {BsPeopleFill} from "react-icons/bs";
import {FeatureContext} from "../../../../contexts/FeatureContext";

export function BetaFeatures() {
    const textColor = useColorModeValue("secondaryGray.900", "white");
    const {betaFeatures} = useContext(FeatureContext);

    return <Card p="0px">
            <Flex
                direction="column"
                w="100%"
                px="22px"
                py="18px"
            >
                <Text color={textColor} fontSize="xl" fontWeight="600">
                    測試版功能
                </Text>
                <Text color={textColor}>
                    在我們的不和諧服務器中投票，告訴我們您希望什麼功能
                </Text>
            </Flex>
        {
            betaFeatures.map((feature, key) => (
                <BetaFeature key={key} {...feature} />
            ))
        }
    </Card>

}

function BetaFeature({name, description, votes}) {
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
                        <Icon as={BsPeopleFill} color={textColor} width='18px' me='7px'/>
                        <Text fontWeight='700' fontSize='md' color={textColor}>
                            {votes}
                        </Text>
                    </Flex>
                </Flex>
            </Flex>
        </Card>
    );
}