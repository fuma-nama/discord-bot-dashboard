import React from "react";

// Chakra imports
import {
  Box,
  Flex,
  Grid,


} from "@chakra-ui/react";

// Custom components
import Banner from "./components/Banner";
import ActionsList from "./components/ActionsList";
import {usePageInfo} from "../../../contexts/PageInfoContext";
import {ActionBar} from "./components/ActionBar";
import {ActionsProvider, ActionTypesProvider} from "../../../contexts/actions/ActionsContext";

export default function ActionsBoard() {
  return (
      <Actions />
  );
}

function Actions() {
  usePageInfo("動作面板")

  return (
    <Box pt={{ base: "180px", md: "80px", xl: "80px" }}>
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
          <ActionsProvider>
            <ActionsList />
          </ActionsProvider>
        </Flex>
        <Flex
          flexDirection="column"
          gridArea={{ xl: "1 / 3 / 2 / 4", "2xl": "1 / 2 / 2 / 3" }}
        >
          <ActionTypesProvider>
            <ActionBar />
          </ActionTypesProvider>
        </Flex>
      </Grid>
    </Box>
  );
}