import React, {useContext, useMemo, useState} from "react";

// Chakra imports
import {
    Box,
    Flex, FormControl, FormHelperText, FormLabel,
    SimpleGrid, Stack, Text,
} from "@chakra-ui/react";

// Custom components
import {usePageInfo} from "contexts/PageInfoContext";
import {config} from "config/config";
import CreateTaskBanner from "./components/CreateTaskBanner";
import {useActionInfo} from "contexts/actions/ActionDetailContext";
import {useMutation, useQueryClient} from "react-query";
import ErrorModal from "components/modal/ErrorModal";
import {SubmitAlert} from "components/alert/SaveAlert";
import {ConfigItemListAnimated} from "components/fields/ConfigPanel";
import {useNavigate, useParams} from "react-router-dom";
import {addTask} from "api/yeecord";
import {GuildContext} from "contexts/guild/GuildContext";
import NameInput from "../components/NameInput";

export default function SubmitTaskBoard() {
  return <SubmitTask />
}

function SubmitTask() {
    const {name} = useActionInfo()
    usePageInfo(["動作", name, "新任務"])

  return (
    <Box pt={{ base: "180px", md: "80px", xl: "80px" }}>
        <Flex
            flexDirection="column"
            mb="30"
        >
            <CreateTaskBanner />
            <Stack mt={10} gap={5}>
                <Text fontSize={25} fontWeight="bold">創建新任務</Text>

                <SimpleGrid columns={{base: 1, lg: 2}} gap={5}>
                    <ConfigPanel />
                </SimpleGrid>
            </Stack>
        </Flex>
    </Box>
  );
}

function ConfigPanel() {
    const {id: guild} = useContext(GuildContext)
    const {action} = useParams()
    const navigate = useNavigate()
    const client = useQueryClient()

    const options = useMemo(
        () => config.actions[action].options(null),
        []
    )

    const [name, setName] = useState("New Task")
    const [changes, setChanges] = useState(new Map());

    const mutation = useMutation(
        () => addTask(guild, action, name, changes), {
        async onSuccess() {
            await client.invalidateQueries(["action_detail", action])
            navigate(`/guild/${guild}/action/${action}`)
        }
    })

    const onChange = (id, value) => {
        if (mutation.isLoading) return;

        setChanges(new Map(
            changes.set(id, value)
        ))
    };

    return (
        <>
            <ErrorModal
                header="未能創建任務"
                error={mutation.error && mutation.error.toString()}
                onClose={mutation.reset}
            />
            <NameInput value={name} onChange={setName} />
            <ConfigItemListAnimated
                options={options}
                changes={changes}
                onChange={onChange}
            />
            <SubmitAlert
                visible={name.length !== 0}
                loading={mutation.isLoading}
                onSubmit={mutation.mutate}
            />
        </>
    );
}