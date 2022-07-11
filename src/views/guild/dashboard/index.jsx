// Chakra imports
import {
    Box,
    Icon,
    SimpleGrid,
    useColorModeValue,
} from "@chakra-ui/react";
// Custom components
import MiniCalendar from "components/calendar/MiniCalendar";
import MiniStatistics from "components/card/MiniStatistics";
import IconBox from "components/icons/IconBox";
import React, {useContext} from "react";
import {
    MdBarChart,
} from "react-icons/md";
import FeatureTable from "./components/FeatureTable";
import ComplexTable from "./components/ComplexTable";
import DailyTraffic from "./components/DailyTraffic";
import Status from "./components/Status";
import Tasks from "./components/Tasks";
import TotalCommand from "./components/TotalCommand";
import WeeklyVC from "./components/WeeklyVC";
import {columnsDataCheck, columnsDataComplex} from "./variables/columnsData";
import tableDataCheck from "./variables/tableDataCheck.json";
import tableDataComplex from "./variables/tableDataComplex.json";
import {usePageInfo} from "../../../contexts/PageInfoContext";
import {ServerDetailContext, ServerDetailProvider} from "../../../contexts/server/ServerDetailContext";
import {BsPeopleFill} from "react-icons/bs";
import {VscDebugConsole} from "react-icons/vsc";
import {FiCommand} from "react-icons/fi";
import {useQuery} from "react-query";
import {getServerAdvancedDetails} from "../../../api/yeecord";
import {QueryHolder, QueryHolderSkeleton} from "../../../contexts/components/AsyncContext";
import {GuildContext} from "../../../contexts/GuildContext";

export default function Dashboard() {
    return <ServerDetailProvider>
        <UserReports/>
    </ServerDetailProvider>
}

export function UserReports() {
    usePageInfo("服務器儀表板")
    const {detail} = useContext(ServerDetailContext)
    const {id: serverId} = useContext(GuildContext)

    // Chakra Color Mode
    const brandColor = useColorModeValue("brand.500", "white");
    const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");

    const BaseIcon = ({icon}) => {
        return <IconBox
            w="56px"
            h="56px"
            bg={boxBg}
            icon={
                <Icon w="32px" h="32px" as={icon} color={brandColor}/>
            }
        />
    }


    const query = useQuery(
        "server_advanced_detail",
        () => getServerAdvancedDetails(serverId)
    )

    return (
        <Box pt={{base: "130px", md: "80px", xl: "80px"}}>
            <SimpleGrid
                columns={{base: 1, md: 2, "2xl": 4}}
                gap="20px"
                mb="20px"
            >
                <MiniStatistics
                    startContent={
                        <BaseIcon icon={MdBarChart}/>
                    }
                    name="RPG收益"
                    value={`$${detail.earned}`}
                />
                <MiniStatistics
                    startContent={
                        <BaseIcon icon={BsPeopleFill}/>
                    }
                    growth={`+${detail.members.grow}%`}
                    name="成員數量"
                    value={`${detail.members.count}人`}
                />
                <MiniStatistics
                    startContent={
                        <BaseIcon icon={VscDebugConsole}/>
                    }
                    name="總命令使用量"
                    value={detail.command.total}
                />
                <MiniStatistics
                    startContent={
                        <BaseIcon icon={FiCommand}/>
                    }
                    name="最常用的命令"
                    value={detail.command.most}
                />
            </SimpleGrid>

            <QueryHolderSkeleton query={query} direction="row" height="400px">

                <SimpleGrid columns={{base: 1, md: 2, xl: 2}} gap="20px" mb="20px">
                    <TotalCommand data={query.data}/>
                    <WeeklyVC data={query.data}/>
                </SimpleGrid>
            </QueryHolderSkeleton>
            <SimpleGrid columns={{base: 1, md: 1, xl: 2}} gap="20px" mb="20px">
                <FeatureTable />
                <SimpleGrid columns={{base: 1, md: 2, xl: 2}} gap="20px">
                    <Status name="CPU使用量" value={detail.bot.cpu} />
                    <Status name="RAM使用量" value={detail.bot.ram} />
                </SimpleGrid>
            </SimpleGrid>
        </Box>
    );
}
