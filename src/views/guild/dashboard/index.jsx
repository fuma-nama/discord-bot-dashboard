// Chakra imports
import {Box, SimpleGrid,} from "@chakra-ui/react";
// Custom components
import React, {useContext, useMemo} from "react";
import {usePageInfo} from "../../../contexts/PageInfoContext";
import {GuildDetailContext, ServerDetailProvider} from "../../../contexts/guild/GuildDetailContext";
import {useQuery} from "react-query";
import {getServerAdvancedDetails} from "api/internal";
import {QueryHolderSkeleton} from "contexts/components/AsyncContext";
import {GuildContext} from "contexts/guild/GuildContext";
import {DataList} from "components/card/data/DataCard";
import {config} from "config/config";
import {usePageState} from "utils/State";
import {useLocale} from "utils/Language";

export default function Dashboard() {
    const locale = useLocale()

    usePageInfo(locale({zh: "服務器儀表板", en: "Server Statistics"}))

    return <ServerDetailProvider>
        <UserReports />
    </ServerDetailProvider>
}

export function UserReports() {
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
                                {() => <Data row={row} data={detail} advanced={query.data} />}
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

function Data({row, detail, advanced}) {
    const state = usePageState({
        advanced
    })

    const items = useMemo(
        () => row.items(detail, state),
        [detail, ...Object.values(state)]
    )

    return <DataList items={items} />
}