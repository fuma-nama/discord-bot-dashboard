import {Flex, Icon, Table, Tbody, Td, Text, Th, Thead, Tr, useColorModeValue,} from "@chakra-ui/react";
import React, {useContext} from "react";
import {useGlobalFilter, usePagination, useSortBy, useTable,} from "react-table";

// Custom components
import Card from "components/card/Card";
import Menu from "components/menu/MainMenu";
import {GuildDetailContext} from "contexts/guild/GuildDetailContext";
import {MdCancel, MdCheckCircle} from "react-icons/md";

export const columns = [
  {
    Header: "NAME",
    accessor: "name",
  },
  {
    Header: "ENABLED",
    accessor: "enabled",
  },
];

export default function FeatureTable() {
  const {detail} = useContext(GuildDetailContext)

  const tableInstance = useTable(
    {
      columns,
      data: detail.unlocked
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

  const textColor = useColorModeValue("secondaryGray.900", "white");
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");
  return (
    <Card
      direction='column'
      w='100%'
      px='0px'
      overflowX={{ sm: "scroll", lg: "hidden" }}>
      <Flex px='25px' justify='space-between' align='center'>
        <Text
          color={textColor}
          fontSize='22px'
          fontWeight='700'
          lineHeight='100%'>
          服務器功能
        </Text>
        <Menu />
      </Flex>
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
                    {column.render("Header")}
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
                  let data = "";

                  switch (cell.column.Header) {
                    case "NAME": {
                      data = (
                          <Text color={textColor} fontSize='md' fontWeight='700'>
                            {cell.value}
                          </Text>
                      );
                      break;
                    }
                    case "ENABLED": {
                      data = (
                          <Flex align='center'>
                            <Icon
                                w='24px'
                                h='24px'
                                me='5px'
                                color={
                                  cell.value? "green.500" : "red.500"
                                }
                                as={
                                  cell.value? MdCheckCircle : MdCancel
                                }
                            />
                            <Text color={textColor} fontSize='sm' fontWeight='700'>
                              {cell.value? "Enabled" : "Locked"}
                            </Text>
                          </Flex>
                      );
                      break;
                    }
                    default: {
                      data = "UNKNOWN"
                    }
                  }

                  return (
                    <Td
                      {...cell.getCellProps()}
                      key={index}
                      fontSize={{ sm: "14px" }}
                      minW={{ sm: "150px", md: "200px", lg: "auto" }}
                      borderColor='transparent'>
                      {data}
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
