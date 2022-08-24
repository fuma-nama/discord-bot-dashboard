import {DataTypes} from "../variables/type";
import React from "react";
import {locale, Locale} from "../utils/Language";
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
                        name: <Locale en="Job" zh="工作" />,
                        value: <Locale en="Software Engineer" zh="軟體工程師" />
                    }
                ]
            },
            {
                type: DataTypes.Group,
                value: [
                    {
                        name: <Locale en="Members Amount" zh="會員人數" />,
                        value: [detail.members, 4],
                        options: {
                            ...pieChartOptions,
                            labels: ["Gay", "Not Gay"],
                        },
                        type: DataTypes.Pie_Chart
                    },
                ]
            }

        ]
    },
    {
        advanced: true,
        count: 2,
        items: (detail, {lang}) => [
            {
                name: <Locale en="54 Times" zh="54次" />,
                description: <Locale en="Command Usages" zh="命令使用量" />,
                status: {
                    success: true,
                    text: <Locale en="Growing" zh="成長中" />
                },
                value: [
                    {data: [543, 543,543, 1043]}
                ],
                options: lineChartOptionsTotalSpent,
                time_unit: locale(lang, {
                    en: "This Month",
                    zh: "這個月"
                }),
                type: DataTypes.Line_Chart
            },
            {
                name: locale(lang, {
                    en: "Members Count",
                    zh: "會員人數"
                }),
                value: [
                    {data: [543, 543,543,43]}
                ],
                options: weekBarChartOptions,
                time_unit: locale(lang, {
                    en: "This Week",
                    zh: "本星期"
                }),
                type: DataTypes.Bar_Chart
            },
        ]
    }
]