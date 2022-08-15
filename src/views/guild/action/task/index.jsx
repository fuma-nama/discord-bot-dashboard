import React, {useContext, useMemo} from "react";

// Chakra imports
import {
    Box, Button,
    Flex,
    SimpleGrid, Stack, Text,
} from "@chakra-ui/react";

// Custom components
import {usePageInfo} from "contexts/PageInfoContext";
import {useActionInfo} from "contexts/actions/ActionDetailContext";
import { MultiConfigPanel} from "components/fields/ConfigPanel";
import {Link, useParams} from "react-router-dom";
import { updateTask} from "api/yeecord";
import {GuildContext} from "contexts/guild/GuildContext";
import ActionBanner from "../components/ActionBanner";
import {BiArrowBack} from "react-icons/bi";
import {TaskDetailContext, TaskDetailProvider} from "../../../../contexts/actions/TaskDetailContext";
import {useQueryClient} from "react-query";

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
                <Config />
            </Stack>
        </Flex>
    </Box>
}

export function Config() {
    const {id: guild, action, task} = useParams()

    const {name, values} = useContext(TaskDetailContext)
    const client = useQueryClient()

    const onSaved = data => {
        return client.setQueryData(["task_detail", guild, action, task], data)
    }

    return (
        <SimpleGrid columns={{base: 1, lg: 2}} gap={5}>
            <ConfigPanel
                savedName={name}
                values={values}
                onSaved={onSaved}
            />
        </SimpleGrid>
    );
}

function ConfigPanel({savedName, onSaved, values}) {
    const {id: guild, action, task} = useParams();
    const info = useActionInfo()

    const options = useMemo(
        () => info.options(values),
        [values]
    )

    const onSave = ([nameChanges, changes]) => {
        return updateTask(guild, action, task, nameChanges.get("name"), changes)
    }

    const nameOption = {
        id: "name",
        type: "string",
        name: "Task Name",
        value: savedName,
        required: true
    }

    return (
        <MultiConfigPanel
            groups={[
                [nameOption], options
            ]}
            onSave={onSave}
            onSaved={onSaved}
        />
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