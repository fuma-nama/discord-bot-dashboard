import React, { useState } from "react";

import {
  Box,
  Button,
  Flex,
  Grid,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

// Custom components
import { OptionPanel } from "./components/OptionPanel";
import { SaveAlert } from "./components/SaveAlert";
import Banner from "./components/Banner";
import TableTopCreators from "./components/TableTopCreators";
import Card from "components/card/Card.js";
import tableDataTopCreators from "./variables/tableDataTopCreators.json";
import { tableColumnsTopCreators } from "./variables/tableColumnsTopCreators";

import {
  FeatureDetailProvider,
  FeatureDetailContext,
} from "contexts/FeatureDetailContext";
import { useContext } from "react";

export default function FeaturePanel() {
  const textColor = useColorModeValue("secondaryGray.900", "white");

  return (
    <FeatureDetailProvider>
      <Box pt={{ base: "180px", md: "80px", xl: "80px" }}>
        {/* Main Fields */}
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
            <FeatureConfigPanel />
          </Flex>
          <Flex
            flexDirection="column"
            gridArea={{ xl: "1 / 3 / 2 / 4", "2xl": "1 / 2 / 2 / 3" }}
          >
            <Card px="0px" mb="20px">
              <TableTopCreators
                tableData={tableDataTopCreators}
                columnsData={tableColumnsTopCreators}
              />
            </Card>
            <Card p="0px">
              <Flex
                align={{ sm: "flex-start", lg: "center" }}
                justify="space-between"
                w="100%"
                px="22px"
                py="18px"
              >
                <Text color={textColor} fontSize="xl" fontWeight="600">
                  History
                </Text>
                <Button variant="action">See all</Button>
              </Flex>
            </Card>
          </Flex>
        </Grid>
      </Box>
    </FeatureDetailProvider>
  );
}

function FeatureConfigPanel() {
  const [saving, setSaving] = useState(false);
  const [options, setOptions] = useState(
    useContext(FeatureDetailContext).options
  );
  const [changes, setChanges] = useState(new Map());

  const onChange = (id, value) => {
    if (saving) return;
    setChanges(new Map(changes.set(id, value)));
  };

  const onSave = (saved) => {
    const updated = options.map((option) => {
      return {
        ...option,
        value: saved.has(option.id) ? saved.get(option.id) : option.value,
      };
    });

    setOptions(updated);
    setChanges(new Map());
  };

  return (
    <>
      <Stack mt="10">
        {options.map((option) => (
          <OptionPanel
            option={option}
            value={
              changes.has(option.id) ? changes.get(option.id) : option.value
            }
            key={option.id}
            onChange={(v) => onChange(option.id, v)}
          />
        ))}
      </Stack>
      <SaveAlert
        saving={saving}
        setSaving={setSaving}
        changes={changes}
        onSave={onSave}
        onDiscard={() => setChanges(new Map())}
      />
    </>
  );
}
