import React, {useContext, useMemo, useState} from "react";

// Chakra imports
import {
    Box, Button,
    Flex,
    SimpleGrid, Stack, Text,
} from "@chakra-ui/react";

// Custom components
import {usePageInfo} from "contexts/PageInfoContext";
import {useActionInfo} from "contexts/actions/ActionDetailContext";
import { ConfigPanel} from "components/fields/ConfigPanel";
import {Link, useParams} from "react-router-dom";
import { updateTask} from "api/yeecord";
import {GuildContext} from "contexts/guild/GuildContext";
import ActionBanner from "../components/ActionBanner";
import {BiArrowBack} from "react-icons/bi";
import {TaskDetailContext, TaskDetailProvider} from "../../../../contexts/actions/TaskDetailContext";
import NameInput from "../components/NameInput";

export default function TaskBoard() {

    return <TaskDetailProvider>
        <TaskConfigPanel />
    </TaskDetailProvider>
}

function TaskConfigPanel() {
    const {name: action} = useActionInfo()
    const {name: task} = useContext(TaskDetailContext)

    usePageInfo(["動作", action, task])

    return <Box pt={{base: "180px", md: "80px", xl: "80px"}}>
        <Flex
            flexDirection="column"
            mb="30"
        >
            <ActionBanner>
                <BackButton />
            </ActionBanner>
            <Stack mt={10} gap={5}>
                <Text fontSize={25} fontWeight="bold">修改任務</Text>

                <SimpleGrid columns={{base: 1, lg: 2}} gap={5}>
                    <Config />
                </SimpleGrid>
            </Stack>
        </Flex>
    </Box>
}

export function Config() {
    const {id: guild, action, task} = useParams();

    const {options} = useActionInfo()
    const {name: initialName, values} = useContext(TaskDetailContext)

    const [savedName, setSavedName] = useState(initialName)
    const [name, setName] = useState(savedName)

    const onSave = changes =>
        updateTask(guild, action, task, name, changes)
            .then(() => setSavedName(name))

    return (
        <>
            <NameInput value={name} onChange={setName} />
            <ConfigPanel
                options={options(values)}
                onSave={onSave}
                hasChanges={name !== savedName}
                onDiscard={() => setName(savedName)}
            />
        </>
    );
}

function BackButton() {
    const {action} = useParams()
    const {id: guild} = useContext(GuildContext)

    const actionUrl = `/guild/${guild}/action/${action}`

    return (
        <Link to={actionUrl}>
            <Button
                bg="white"
                color="black"
                _hover={{ bg: "whiteAlpha.900" }}
                _active={{ bg: "white" }}
                _focus={{ bg: "white" }}
                fontWeight="500"
                fontSize="14px"
                py="20px"
                minH="full"
                leftIcon={<BiArrowBack />}
            >
                返回動作
            </Button>
        </Link>
    );
}