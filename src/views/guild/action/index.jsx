import React, {useContext} from "react";

// Chakra imports
import {Box, Flex, Grid,} from "@chakra-ui/react";

// Custom components
import Banner from "./components/Banner";
import ActionsList from "./components/ActionsList";
import {usePageInfo} from "contexts/PageInfoContext";
import {ActionsDataContext, ActionsDataProvider} from "../../../contexts/actions/ActionsDataContext";
import {DataList} from "components/card/data/DataCard";
import {config} from "config/config";
import {useLocale} from "../../../utils/Language";

export default function ActionsBoard() {

    return <Actions />
}

function Actions() {
    const locale = useLocale()

    usePageInfo(
        locale({zh: "動作面板", en: "Action Panel"})
    );

    return <Box pt={{ base: "180px", md: "80px", xl: "80px" }}>
        <Content />
    </Box>
}

function Content() {
    if (config.data.actions) {

        return (
            <Grid
                mb="20px"
                gridTemplateColumns={{ xl: "repeat(3, 1fr)", "2xl": "1fr 0.46fr" }}
                gap={{ base: "20px", xl: "20px" }}
                display={{ base: "block", xl: "grid" }}
            >
                <Flex
                    flexDirection="column"
                    mb="10"
                    gridArea={{ xl: "1 / 1 / 2 / 3", "2xl": "1 / 1 / 2 / 2" }}
                >
                    <Banner />
                    <ActionsList />
                </Flex>
                <Flex
                    flexDirection="column"
                    gridArea={{ xl: "1 / 3 / 2 / 4", "2xl": "1 / 2 / 2 / 3" }}
                >
                    <ActionsDataProvider>
                        <ActionsData />
                    </ActionsDataProvider>
                </Flex>
            </Grid>
        );
    } else {
        return <Flex
            flexDirection="column"
            mb="30"
        >
            <Banner />
            <ActionsList />
        </Flex>
    }
}

function ActionsData() {
    const data = useContext(ActionsDataContext)

    return <DataList items={config.data.actions(data)}/>
}