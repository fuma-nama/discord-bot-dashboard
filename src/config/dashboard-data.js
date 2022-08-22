import {DataTypes} from "../variables/type";
import React from "react";
import {Locale} from "../utils/Language";
import {lineChartOptionsTotalSpent, pieChartOptions, weekBarChartOptions} from "./charts";
import {Flex, Icon, Text} from "@chakra-ui/react";
import {MdCancel, MdCheckCircle} from "react-icons/md";

/**
 * @type Array<DashboardDataRow>
 */
export const dashboardData = [
    {
        advanced: false,
        count: 2,
        items: (detail) => [
            {
                name: <Locale
                    zh="個人信息"
                    en="Personal Information"
                />,
                description: <Locale
                    zh="關於您的所有個人信息"
                    en="All of your personal information about you"
                />,
                type: DataTypes.InfoMap,
                value: [
                    {
                        name: "Job",
                        value: "Software Engineer"
                    }
                ]
            },
            {
                name: "Guild Members",
                value: `$${detail.members}`,
                type: DataTypes.Statistics
            }
        ]
    },
    {
        advanced: true,
        count: 1,
        items: (detail, {advanced}) => [
            {
                name: "Guild Members",
                value: `$${advanced.members}`,
                type: DataTypes.Statistics
            }
        ]
    },
    {
        advanced: true,
        count: 2,
        items: () => [
            {
                name: `54次`,
                description: "每月命令使用量",
                status: {
                    success: true,
                    text: "在成長中"
                },
                value: [
                    {data: [543, 543,543,43]}
                ],
                options: lineChartOptionsTotalSpent,
                time_unit: "這個月",
                type: DataTypes.Line_Chart
            },
            {
                name: "動態語音頻道數量",
                value: [
                    {data: [543, 543,543,43]}
                ],
                options: weekBarChartOptions,
                time_unit: "這個星期",
                type: DataTypes.Bar_Chart
            },
        ]
    },
    {
        count: 2,
        advanced: false,
        items: () => [
            {
                name: "服務器功能",
                type: DataTypes.Table,
                value: [
                    {
                        name: "Gay",
                        enabled: false
                    }
                ],
                columns: [
                    {
                        header: "Name",
                        accessor: "name",
                    },
                    {
                        header: "Enabled",
                        accessor: "enabled",
                        wrapper: v => <Flex align='center'>
                            <Icon
                                w='24px'
                                h='24px'
                                me='5px'
                                color={
                                    v ? "green.500" : "red.500"
                                }
                                as={
                                    v ? MdCheckCircle : MdCancel
                                }
                            />
                            <Text fontSize='sm' fontWeight='700'>
                                {v ? "Enabled" : "Locked"}
                            </Text>
                        </Flex>
                    },
                ]
            },
            {
                type: DataTypes.Group,
                value: [
                    {
                        name: "CPU使用量",
                        type: DataTypes.Pie_Chart,
                        options: pieChartOptions,
                        unit: "%",
                        value: [
                            54,
                            100 - 54,
                        ]
                    },
                    {
                        name: "RAM使用量",
                        type: DataTypes.Pie_Chart,
                        options: pieChartOptions,
                        unit: "%",
                        value: [
                            42,
                            100 - 32
                        ]
                    }
                ]
            }
        ]
    }
]