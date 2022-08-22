import {DataTypes} from "../../../variables/type";
import MiniStatistics from "./MiniStatistics";
import React from "react";
import {Icon, SimpleGrid, useColorModeValue} from "@chakra-ui/react";
import IconBox from "../../icons/IconBox";
import ChartData from "../../charts/data/ChartData";
import DataTable from "./DataTable";
import PieChartData from "../../charts/data/PieChartData";
import {List} from "./List";
import InformationMap from "./InformationMap";
import {useIconColor} from "../../../utils/colors";

export function DataList({items}) {
    return items.map((item, key) => {

        return <DataCard key={key} {...item} />
    })
}

export default function DataCard({name, value, type, ...optional}) {
    const getItem = () => {

        switch (type) {
            case DataTypes.Statistics: {
                const {icon, growth} = optional

                return <MiniStatistics
                    startContent={
                        icon && <BaseIcon icon={icon}/>
                    }
                    growth={growth}
                    name={name}
                    value={value}
                />
            }
            case DataTypes.InfoMap: {
                const {description} = optional

                return <InformationMap
                    name={name}
                    description={description}
                    value={value}
                />
            }
            case DataTypes.Bar_Chart:
            case DataTypes.Line_Chart:
                const {time_unit, description, status, options} = optional

                return <ChartData
                    name={name}
                    value={value}
                    description={description}
                    status={status}
                    time_unit={time_unit}
                    options={options}
                    chartType={getChartType(type)}
                />

            case DataTypes.Pie_Chart: {
                const {options, unit} = optional

                return <PieChartData name={name} data={value} options={options} unit={unit} />
            }

            case DataTypes.Table:{
                const {columns} = optional

                return <DataTable name={name} data={value} columns={columns} />
            }

            case DataTypes.Group: {
                return <SimpleGrid columns={{base: 1, xl: value.length}} gap="20px">
                    {value.map((item, key) => <DataCard key={key} {...item} />)}
                </SimpleGrid>
            }

            case DataTypes.List: {
                const {description, icon} = optional

                return <List title={name} description={description} icon={icon} items={value} />
            }

            case DataTypes.Custom: {
                return value
            }

            default: return <></>
        }
    }

    return getItem()
}

function getChartType(type) {
    switch (type) {
        case DataTypes.Line_Chart:
            return "line"
        case DataTypes.Bar_Chart:
            return "bar"
    }
}

function BaseIcon({icon}) {
    // Chakra Color Mode
    const iconColor = useIconColor()
    const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");

    return <IconBox
        w="56px"
        h="56px"
        bg={boxBg}
        icon={
            <Icon w="32px" h="32px" as={icon} color={iconColor}/>
        }
    />
}