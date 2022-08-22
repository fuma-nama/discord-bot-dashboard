import {Flex, Table, Tbody, Td, Text, Th, Thead, Tr, useColorModeValue,} from "@chakra-ui/react";
import React from "react";
import {useGlobalFilter, usePagination, useSortBy, useTable,} from "react-table";

// Custom components
import Card from "components/card/Card";
import {useTextColor} from "../../../utils/colors";

export default function DataTable({name, data, columns}) {

  const tableInstance = useTable(
    {
      columns,
      data
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    initialState,
  } = tableInstance;
  initialState.pageSize = 11;

  const textColor = useTextColor();
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");
  return (
    <Card
      direction='column'
      w='100%'
      px='0px'
      overflowX={{ sm: "scroll", lg: "hidden" }}>
        <Text
            ml="25px"
            color={textColor}
            fontSize='22px'
            fontWeight='700'
            lineHeight='100%'
        >
            {name}
        </Text>
      <Table {...getTableProps()} variant='simple' color='gray.500' mb='24px'>
        <Thead>
          {headerGroups.map((headerGroup, index) => (
            <Tr {...headerGroup.getHeaderGroupProps()} key={index}>
              {headerGroup.headers.map((column, index) => (
                <Th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  pe='10px'
                  key={index}
                  borderColor={borderColor}>
                  <Flex
                    justify='space-between'
                    align='center'
                    fontSize={{ sm: "10px", lg: "12px" }}
                    color='gray.400'>
                    {column.render("header")}
                  </Flex>
                </Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody {...getTableBodyProps()}>
          {page.map((row, index) => {
            prepareRow(row);
            return (
              <Tr {...row.getRowProps()} key={index}>
                {row.cells.map((cell, index) => {

                  return (
                    <Td
                      {...cell.getCellProps()}
                      key={index}
                      color={textColor}
                      fontSize={{ sm: "14px" }}
                      minW={{ sm: "150px", md: "200px", lg: "auto" }}
                      borderColor='transparent'>
                      {
                          cell.column.wrapper?
                              cell.column.wrapper(cell.value) :
                              <Text fontSize='md' fontWeight='700'>
                                  {cell.value}
                              </Text>
                      }
                    </Td>
                  );
                })}
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </Card>
  );
}
