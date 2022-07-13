import {Box, Grid, Skeleton} from "@chakra-ui/react";

// Custom components
import Banner from "views/admin/profile/components/Banner";
import General from "views/admin/profile/components/General";
import Settings from "views/admin/profile/components/Settings";
import ServerPicker from "views/admin/profile/components/ServerPicker";

// Assets
import React, {useMemo} from "react";
import {UserDataContext} from "contexts/UserDataContext";
import {useContext} from "react";
import {avatarToUrl, bannerToUrl} from "api/discord/DiscordApi";
import {getConfigurableServers, getRPGInfo} from "api/yeecord";
import {QueryHolderSkeleton} from "../../../contexts/components/AsyncContext";
import {useQuery} from "react-query";

function LoadedOverview({configurableServers, isLoaded}) {
    const userData = useContext(UserDataContext);
    const {id, banner, username, avatar} = userData.user;

    const guilds = useMemo(() =>
            isLoaded && userData.guilds.map(g => ({
        ...g,
        configurable: configurableServers.includes(g.id)
            })),
        [configurableServers, isLoaded, userData.guilds]
    )

    const query = useQuery(
        ["user_rpg_info", id],
        () => getRPGInfo(id)
    )

    return (
        <Box pt={{base: "130px", md: "80px", xl: "80px"}}>
            {/* Main Fields */}
            <Grid
                templateColumns={{
                    base: "1fr",
                    lg: "1.34fr 1fr",
                }}
                templateRows={{
                    base: "repeat(2, 1fr)",
                    lg: "1fr",
                }}
                gap="20px"
            >
                <Banner
                    gridArea="1 / 1 / 2 / 2"
                    banner={banner && bannerToUrl(id, banner)}
                    avatar={avatarToUrl(id, avatar)}
                    name={username}
                    joinedServers={isLoaded ? configurableServers.length : "Loading..."}
                    servers={userData.guilds.length}
                />
                <Settings
                    gridArea={{
                        base: "2 / 1 / 3 / 2",
                        lg: "1 / 2 / 2 / 2",
                    }}
                />
            </Grid>
            <Grid
                mb="20px"
                templateColumns={{
                    base: "1fr",
                    lg: "repeat(2, 1fr)",
                    "2xl": "1.34fr 1.62fr",
                }}
                templateRows={{
                    base: "1fr",
                    lg: "repeat(2, 1fr)",
                    "2xl": "1fr",
                }}
                gap={{base: "20px", xl: "20px"}}
            >
                <Skeleton gridArea="1 / 1 / 2 / 2" isLoaded={isLoaded} rounded="lg">
                    {guilds ? <ServerPicker servers={guilds}/> : null}
                </Skeleton>
                <QueryHolderSkeleton query={query}>

                    <General
                        gridArea={{
                            base: "2 / 1 / 4 / 2",
                            lg: "1 / 2 / 2 / 2",
                        }}
                        minH="365px"
                        pe="20px"
                        data={query.data}
                    />
                </QueryHolderSkeleton>
            </Grid>
        </Box>
    );
}

export default function Overview() {
    const userData = useContext(UserDataContext);

    const query = useQuery(
        ["configurable_servers", userData.id],
        () => getConfigurableServers(userData.id)
    )

    return <LoadedOverview configurableServers={query.data} isLoaded={query.isFetched}/>
}
