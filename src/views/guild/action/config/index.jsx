import React, {useContext} from "react";

import {Box, Button, ButtonGroup, Flex, HStack, SimpleGrid, Text, VStack} from "@chakra-ui/react";

import {usePageInfo} from "contexts/PageInfoContext";
import {ActionDetailContext, ActionDetailProvider, useActionInfo} from "contexts/actions/ActionDetailContext";
import TasksBanner from "./components/TasksBanner";
import Card from "components/card/Card";
import {Link, useParams} from "react-router-dom";
import NotFound from "../../../info/Not_Found";
import {GuildContext} from "contexts/guild/GuildContext";
import {useMutation, useQueryClient} from "react-query";
import {deleteTask} from "api/yeecord";

export default function ActionTasks() {
    const info = useActionInfo()

    if (info == null) {
        return <NotFound />
    }

    return (
        <ActionDetailProvider>
            <Box pt={{base: "180px", md: "80px", xl: "80px"}}>
                <Flex
                    flexDirection="column"
                    mb="10"
                    gridArea={{xl: "1 / 1 / 2 / 3", "2xl": "1 / 1 / 2 / 2"}}
                >
                    <TasksBanner />
                    <TasksPanel />
                </Flex>
            </Box>
        </ActionDetailProvider>
    );
}

function TasksPanel() {
    const {name} = useActionInfo()
    const {tasks} = useContext(ActionDetailContext)

    usePageInfo(["動作", name])

    return <Flex direction="column" gap={5} pt={10} px={{base: 1, md: 3, lg: 10}}>
        <Text align="center" fontSize={24} fontWeight="bold">運行中</Text>
        <SimpleGrid columns={{base: 1, lg: 2}} gap={5}>
            {
                tasks.map(task =>
                    <Task key={task.id} task={task} />
                )
            }
        </SimpleGrid>
    </Flex>
}

function Task({task}) {
    const {id: guild} = useContext(GuildContext)
    const {action} = useParams()

    const client = useQueryClient()
    const mutation = useMutation(
        () => deleteTask(guild, action, task.id),
        {
            onSuccess() {
                return client.invalidateQueries(["action_detail", action])
            }
        }
    )

    const configUrl = `/guild/${guild}/action/${action}/task/${task.id}`
    return <Card p={5} gap={5}>
        <Flex direction="row" gap={5}>
            <VStack align="start">
                <Text fontSize="lg" fontWeight="bold">{task.name}</Text>
                <HStack>
                    <Text fontWeight="bold">創建於: </Text>
                    <Text>{task.createdAt.toLocaleDateString("en-US")}</Text>
                </HStack>
            </VStack>

            <Button ml="auto" variant="danger" onClick={mutation.mutate} isLoading={mutation.isLoading}>
                Delete
            </Button>
        </Flex>
        <Box>
            <Link to={configUrl}>
                <Button px={10} variant="action">Config</Button>
            </Link>
        </Box>
    </Card>
}