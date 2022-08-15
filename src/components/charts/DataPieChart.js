// Chakra imports
import {Box, Flex, SimpleGrid, Text, useColorModeValue} from "@chakra-ui/react";
// Custom components
import Card from "components/card/Card.js";
import PieChart from "components/charts/PieChart";
import { pieChartOptions } from "variables/charts";
import { VSeparator } from "components/separator/Separator";
import React from "react";

export default function DataPieChart({name, data, options, unit}) {

  // Chakra Color Mode
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const cardColor = useColorModeValue("white", "navy.700");
  const cardShadow = useColorModeValue(
    "0px 18px 40px rgba(112, 144, 176, 0.12)",
    "unset"
  );
  return (
    <Card p='20px' align='center' direction='column' w='100%'>
      <Flex
        px={{ base: "0px", "2xl": "10px" }}
        justifyContent='space-between'
        alignItems='center'
        w='100%'
        mb='8px'>
        <Text color={textColor} fontSize='lg' fontWeight='bold' mt='4px'>
          {name}
        </Text>
      </Flex>

      <PieChart
        chartData={data}
        chartOptions={options}
      />
      <SimpleGrid
          columns={2}
          rounded="lg"
        bg={cardColor}
        boxShadow={cardShadow}
        w='100%'
        py='15px'
        px='20px'
        mt='15px'
        mx='auto'>
        {
          data.map((v, i) =>
              <Flex align="center" justify="center" direction='column' py='5px' key={i}>
                  <Flex>
                      <Box h='8px' w='8px' bg='brand.500' borderRadius='50%' me='4px' />
                      <Text
                          fontSize='xs'
                          color='secondaryGray.600'
                          fontWeight='700'
                          mb='5px'>
                          {options.labels[i]}
                      </Text>
                  </Flex>
                  <Text align="start" fontSize='lg' color={textColor} fontWeight='700'>
                      {v}{unit}
                  </Text>
              </Flex>
          )
        }
      </SimpleGrid>
    </Card>
  );
}
