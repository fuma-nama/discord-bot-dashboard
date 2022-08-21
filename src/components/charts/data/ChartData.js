// Chakra imports
import {Box, Button, Flex, Icon, Text, useColorModeValue, VStack,} from "@chakra-ui/react";
// Custom components
import Card from "components/card/Card.js";
import React from "react";
import {IoCheckmarkCircle} from "react-icons/io5";
import {MdBarChart, MdOutlineCalendarToday} from "react-icons/md";

import {AiFillWarning} from "react-icons/ai";
import ApexChart from "components/charts/ApexChart";

export default function ChartData({name, description, value, time_unit, status, options, chartType}) {
    // Chakra Color Mode
    const textColor = useColorModeValue("secondaryGray.900", "white");
    const textColorSecondary = useColorModeValue("secondaryGray.600", "white");
    const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
    const iconColor = useColorModeValue("brand.500", "white");
    const bgButton = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
    const bgHover = useColorModeValue(
        {bg: "secondaryGray.400"},
        {bg: "whiteAlpha.50"}
    );
    const bgFocus = useColorModeValue(
        {bg: "secondaryGray.300"},
        {bg: "whiteAlpha.100"}
    );

    return (
        <Card
            direction='column'
            w='100%'
            mb='0px'>
            <Flex justify='space-between' ps='0px' pe='20px' pt='5px'>
                <Flex align='center' w='100%'>
                    {time_unit && <Button
                        bg={boxBg}
                        fontSize='sm'
                        fontWeight='500'
                        color={textColorSecondary}
                        borderRadius='7px'>
                        <Icon
                            as={MdOutlineCalendarToday}
                            color={textColorSecondary}
                            me='4px'
                        />
                        {time_unit}
                    </Button>
                    }

                    <Button
                        ms='auto'
                        align='center'
                        justifyContent='center'
                        bg={bgButton}
                        _hover={bgHover}
                        _focus={bgFocus}
                        _active={bgFocus}
                        w='37px'
                        h='37px'
                        lineHeight='100%'
                        borderRadius='10px'>
                        <Icon as={MdBarChart} color={iconColor} w='24px' h='24px'/>
                    </Button>
                </Flex>
            </Flex>
            <Flex w='100%' h="full" flexDirection={{base: "column", "2xl": "row"}}>
                <VStack align="start" textAlign='start' me='20px' mt='28px'>
                    <Text
                        color={textColor}
                        fontSize={name.length <= 5? "34px" : "20px"}
                        fontWeight='700'
                        lineHeight='100%'>
                        {name}
                    </Text>
                    <Text
                        color='secondaryGray.600'
                        fontSize='sm'
                        fontWeight='500'
                        mt='4px'
                        mb='30px'>
                        {description}
                    </Text>

                    {
                        status && <Flex align='center'>
                            {
                                status.success? <>
                                    <Icon as={IoCheckmarkCircle} color='green.500' me='4px'/>
                                    <Text color='green.500' fontSize='md' fontWeight='700'>
                                        {status.text}
                                    </Text>
                                </> : <>
                                    <Icon as={AiFillWarning} color='red.500' me='4px'/>
                                    <Text color='red.500' fontSize='md' fontWeight='700'>
                                        {status.text}
                                    </Text>
                                </>
                            }
                        </Flex>
                    }
                </VStack>
                <Box minH='260px' minW='75%' mt='auto'>
                    <ApexChart
                        chartOptions={options}
                        chartData={value}
                        chartType={chartType}
                    />
                </Box>
            </Flex>
        </Card>
    );
}