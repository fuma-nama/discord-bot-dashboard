// Chakra imports
import {Box, Flex, Icon, SimpleGrid, Text, useColorModeValue,} from "@chakra-ui/react";
// Custom components
import React, {useContext} from "react";
import {usePageInfo} from "../../../contexts/PageInfoContext";
import {GuildDetailContext, ServerDetailProvider} from "../../../contexts/guild/GuildDetailContext";
import {useQuery} from "react-query";
import {getServerAdvancedDetails} from "api/yeecord";
import {QueryHolderSkeleton} from "contexts/components/AsyncContext";
import {GuildContext} from "contexts/guild/GuildContext";
import DataCard from "components/card/DataCard";
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

    const query = useQuery(
        "server_advanced_detail",
        () => getServerAdvancedDetails(serverId)
    )

    return (
        <Box pt={{base: "130px", md: "80px", xl: "80px"}}>
            {
                config.dashboard.data.map((row, key) => {
                    let content

                    if (row.advanced) {
                        content = <QueryHolderSkeleton query={query} height="400px" count={row.count}>
                            {
                                () => row.items(query.data, detail).map((item, key) =>
                                    <DataCard key={key} {...item} />
                                )
                            }
                        </QueryHolderSkeleton>
                    } else {
                        const items = row.items(detail)

                        content = items.map((item, key) =>
                            <DataCard key={key} {...item} />
                        )
                    }

                    const count = row.count

                    return <SimpleGrid
                        key={key}
                        columns={{base: 1, md: Math.min(2, count), "2xl": count}}
                        gap="20px"
                        mb="20px"
                    >
                        {content}
                    </SimpleGrid>
                })
            }
        </Box>
    );
}
