import {DataTypes} from "../variables/type";
import React from "react";

/**
 * @type Array<DashboardDataRow>
 */
export const dashboardData = [
    {
        advanced: false,
        count: 1,
        items: (detail) => [
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
        items: (detail) => [
            {
                name: "Guild Members",
                value: `$${detail.members}`,
                type: DataTypes.Statistics
            }
        ]
    },
    /*
    {
        advanced: false,
        count: 4,
        items: (detail) => [
            {
                name: "RPG收益",
                icon: MdBarChart,
                value: `$${detail.earned}`,
                type: DataTypes.Statistics
            },
            {
                name: "成員數量",
                icon: BsPeopleFill,
                value: `${detail.members.count}人`,
                type: DataTypes.Statistics
            },
            {
                name: "總命令使用量",
                icon: VscDebugConsole,
                value: detail.command.total,
                type: DataTypes.Statistics
            },
            {
                name: "最常用的命令",
                icon: FiCommand,
                value: detail.command.most,
                type: DataTypes.Statistics
            },
        ]
    },
    {
        advanced: true,
        count: 2,
        items: (detail) => [
            {
                name: `${detail.command.total}次`,
                description: "每月命令使用量",
                status: {
                    success: true,
                    text: "在成長中"
                },
                value: detail.command.usage,
                options: lineChartOptionsTotalSpent,
                time_unit: "這個月",
                type: DataTypes.Line_Chart
            },
            {
                name: "動態語音頻道數量",
                value: detail.dvc.usage,
                options: weekBarChartOptions,
                time_unit: "這個星期",
                type: DataTypes.Bar_Chart
            },
        ]
    },
    {
        count: 2,
        advanced: false,
        items: (detail) => [
            {
                name: "服務器功能",
                type: DataTypes.Table,
                value: detail.unlocked,
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
                                    v? "green.500" : "red.500"
                                }
                                as={
                                    v? MdCheckCircle : MdCancel
                                }
                            />
                            <Text fontSize='sm' fontWeight='700'>
                                {v? "Enabled" : "Locked"}
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
                            detail.bot.cpu,
                            100 - detail.bot.cpu,
                        ]
                    },
                    {
                        name: "RAM使用量",
                        type: DataTypes.Pie_Chart,
                        options: pieChartOptions,
                        unit: "%",
                        value: [
                            detail.bot.ram,
                            100 - detail.bot.ram
                        ]
                    }
                ]
            }
        ]
    }
     */
]