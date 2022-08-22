// Chakra imports
import {Box, Flex, SimpleGrid, Text, useColorModeValue} from "@chakra-ui/react";
// Custom components
import Card from "components/card/Card.js";
import PieChart from "components/charts/PieChart";
import React from "react";
import {useNoteColor, useTextColor} from "utils/colors";

export default function PieChartData({name, data, options, unit}) {

    // Chakra Color Mode
    const textColor = useTextColor();
    const cardShadow = useColorModeValue(
        "0px 18px 40px rgba(112, 144, 176, 0.12)",
        "unset"
    );

    return (
        <Card p='20px' align='center' direction='column' w='100%'>
            <Flex mb='3rem'>
                <Text color={textColor} fontSize='lg' fontWeight='bold' mt='4px'>
                    {name}
                </Text>
            </Flex>

            <Box maxW={{xl: "20rem"}} mx="auto">
                <PieChart
                    chartData={data}
                    chartOptions={options}
                />
            </Box>

            <SimpleGrid
                columns={{
                    base: Math.min(data.length, 2),
                    md: Math.min(data.length, 3),
                    "2xl": Math.min(data.length, 4)}
                }
                rounded="lg"
                boxShadow={cardShadow}
                w='100%'
                py='15px'
                px='20px'
                mt='15px'>
                {
                    data.map((v, i) =>
                        <FooterItem key={i} label={options.labels[i]} value={v} unit={unit} />
                    )
                }
            </SimpleGrid>
        </Card>
    );
}

function FooterItem({label, value, unit}) {
    const textColor = useTextColor();
    const detailColor = useNoteColor()

    return <Flex align="center" justify="center" direction='column' py='5px'>
        <Flex>
            <Box h='8px' w='8px' bg='brand.500' borderRadius='50%' me='4px' />
            <Text
                fontSize='xs'
                color={detailColor}
                fontWeight='700'
                mb='5px'>
                {label}
            </Text>
        </Flex>
        <Text align="start" fontSize='lg' color={textColor} fontWeight='700'>
            {value}{unit}
        </Text>
    </Flex>
}