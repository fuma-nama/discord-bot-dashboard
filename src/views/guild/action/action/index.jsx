import React, {useContext, useState} from "react";

import {
    Box,
    Button,
    Center,
    Flex,
    HStack,
    SimpleGrid,
    SlideFade,
    Text,
    useColorModeValue,
    VStack
} from "@chakra-ui/react";

import {usePageInfo} from "contexts/PageInfoContext";
import {ActionDetailContext, ActionDetailProvider, useActionInfo} from "contexts/actions/ActionDetailContext";
import TasksBanner from "./components/TasksBanner";
import Card from "components/card/Card";
import {Link, useParams} from "react-router-dom";
import NotFound from "../../../info/Not_Found";
import {useMutation, useQueryClient} from "react-query";
import {deleteTask} from "api/internal";
import SearchInput from "components/fields/impl/SearchInput";

//assets
import not_found from "assets/img/info/not_found.svg"
import CreateButton from "./components/CreateButton";

export default function ActionTasks() {
    const info = useActionInfo()

    if (info == null) {
        return <NotFound />
    }

    return (
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
    );
}

function DetailProvider({children}) {
    const {name} = useActionInfo()
    usePageInfo(["動作", name])

    return <ActionDetailProvider>
        {children}
    </ActionDetailProvider>
}

function like(s1, s2) {
    return s1.toLowerCase().includes(s2.toLowerCase())
}

function TasksPanel() {
    const [filter, setFilter] = useState("")

    const inputBg = useColorModeValue("secondaryGray.400", "navy.800");

    return <Flex direction="column" gap={5} pt={10} px={{base: 1, md: 3, lg: 10}}>
        <Center flexDirection="column" gap={5} mb={5}>
            <Text fontSize={24} fontWeight="bold">運行中</Text>

            <SearchInput value={filter} onChange={setFilter} bg={inputBg} groupStyle={{maxW: "20rem"}} />
        </Center>
        <DetailProvider>
            <TasksContent filter={filter} />
        </DetailProvider>
    </Flex>
}

function TasksContent({filter}) {
    const {tasks} = useContext(ActionDetailContext)

    return tasks.length === 0?
        <Box bgImg={not_found} bgSize="cover" h="50vh">
            <VStack w="full" h="full" backdropFilter="blur(50px)">
                <Text align="center" fontSize={22} fontWeight="bold" mt={10}>沒有任務正在運行</Text>
                <CreateButton />
            </VStack>
        </Box>
        :
        <SlideFade in={true}>
            <SimpleGrid columns={{base: 1, lg: 2}} gap={5}>
                {tasks
                    .filter(task => like(task.name, filter))
                    .map(task =>
                        <Task key={task.id} task={task} />
                    )
                }
            </SimpleGrid>
        </SlideFade>
}

function Task({task}) {
    const {id: guild, action} = useParams()

    const client = useQueryClient()
    const deleteMutation = useMutation(
        () => deleteTask(guild, action, task.id),
        {
            onSuccess() {
                return client.setQueryData(
                    ["action_detail", action],
                    data => ({
                        ...data,
                        tasks: data.tasks.filter(t => t.id !== task.id)
                    })
                )
            }
        }
    )

    const configUrl = `/guild/${guild}/action/${action}/task/${task.id}`
    const createdAt = new Date(Date.parse(task.createdAt))

    return <Card p={5} gap={5}>
        <Flex direction="row" gap={5}>
            <VStack align="start">
                <Text fontSize="lg" fontWeight="bold">{task.name}</Text>
                <HStack>
                    <Text minW="fit-content" fontWeight="bold">創建於: </Text>
                    <Text>{createdAt.toLocaleString()}</Text>
                </HStack>
            </VStack>

            <Button
                ml="auto"
                variant="danger"
                onClick={deleteMutation.mutate}
                isLoading={deleteMutation.isLoading}>
                刪除
            </Button>
        </Flex>
        <Box w={{base: "full", "3sm": "fit-content"}}>
            <Link to={configUrl}>
                <Button w="full" fontWeight="bold" px={10} variant="action">修改選項</Button>
            </Link>
        </Box>
    </Card>
}