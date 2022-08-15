// Chakra imports
import {Box, Flex, Icon, SimpleGrid, Text, useColorModeValue,} from "@chakra-ui/react";
// Custom components
import React, {useContext, useMemo} from "react";
import {usePageInfo} from "../../../contexts/PageInfoContext";
import {GuildDetailContext, ServerDetailProvider} from "../../../contexts/guild/GuildDetailContext";
import {useQuery} from "react-query";
import {getServerAdvancedDetails} from "api/yeecord";
import {QueryHolderSkeleton} from "contexts/components/AsyncContext";
import {GuildContext} from "contexts/guild/GuildContext";
import DataCard, {DataList} from "components/card/DataCard";
import {config} from "../../../config/config";

export default function Dashboard() {
    return <ServerDetailProvider>
        <UserReports/>
    </ServerDetailProvider>
}

export function UserReports() {
    usePageInfo("服務器儀表板")
    const {detail} = useContext(GuildDetailContext)
    const {id: serverId} = useContext(GuildContext)
    const data = config.data.dashboard

    const query = useQuery(
        "server_advanced_detail",
        () => getServerAdvancedDetails(serverId),
        {
            enabled: data.some(row => row.advanced)
        }
    )

    return (
        <Box pt={{base: "130px", md: "80px", xl: "80px"}}>
            {
                data.map((row, key) => {
                    const count = row.count

                    return <SimpleGrid
                        key={key}
                        columns={{base: 1, md: Math.min(2, count), "2xl": count}}
                        gap="20px"
                        mb="20px"
                    >
                        {row.advanced?
                            <QueryHolderSkeleton query={query} height="400px" count={row.count}>
                                {() => <AdvancedData row={row} data={detail} advanced={query.data} />}
                            </QueryHolderSkeleton>
                            :
                            <Data row={row} detail={detail} />
                        }
                    </SimpleGrid>
                })
            }
        </Box>
    );
}

function Data({row, detail}) {
    const items = useMemo(
        () => row.items(detail),
        [detail]
    )

    return <DataList items={items} />
}

function AdvancedData({row, advanced, detail}) {
    const items = useMemo(
        () => {console.log("aa"); return row.items(advanced, detail)},
        [detail]
    )

    return <DataList items={items} />
}