import {DataTypes} from "../variables/type";
import React from "react";
import {Locale} from "../utils/Language";
import {lineChartOptionsTotalSpent, pieChartOptions, weekBarChartOptions} from "./charts";

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
                type: DataTypes.Group,
                value: [
                    {

                        name: "Members Count",
                        value: [detail.members, 3, 4, 5],
                        options: pieChartOptions,
                        type: DataTypes.Pie_Chart
                    },
                ]
            }

        ]
    },
    {
        advanced: true,
        count: 2,
        items: () => [
            {
                name: `54 Times`,
                description: "Command Usages",
                status: {
                    success: true,
                    text: "Growing"
                },
                value: [
                    {data: [543, 543,543, 1043]}
                ],
                options: lineChartOptionsTotalSpent,
                time_unit: "This Month",
                type: DataTypes.Line_Chart
            },
            {
                name: "Members Count",
                value: [
                    {data: [543, 543,543,43]}
                ],
                options: weekBarChartOptions,
                time_unit: "This Week",
                type: DataTypes.Bar_Chart
            },
        ]
    }
]