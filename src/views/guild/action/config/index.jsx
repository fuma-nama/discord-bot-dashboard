import React, {useContext} from "react";

import {Box, Button, Flex, SimpleGrid, Text, VStack} from "@chakra-ui/react";

import {usePageInfo} from "contexts/PageInfoContext";
import {ActionDetailContext, ActionDetailProvider} from "contexts/actions/ActionDetailContext";
import ActionBanner from "./components/ActionBanner";
import Card from "components/card/Card";

export default function ActionTasks() {
    return (
        <ActionDetailProvider>
            <Box pt={{base: "180px", md: "80px", xl: "80px"}}>
                <Flex
                    flexDirection="column"
                    mb="10"
                    gridArea={{xl: "1 / 1 / 2 / 3", "2xl": "1 / 1 / 2 / 2"}}
                >
                    <ActionBanner />
                    <TasksPanel />
                </Flex>
            </Box>
        </ActionDetailProvider>
    );
}

function TasksPanel() {
    const {name, tasks} = useContext(ActionDetailContext)
    usePageInfo(["動作", name])

    return <VStack gap={5} p={10}>
        <Text fontSize={24} fontWeight="bold">運行中</Text>
        <SimpleGrid columns={{base: 1, lg: 2}} gap={5}>
            {
                tasks.map(task =>
                    <Card p={5} gap={5}>
                        <Text fontSize="lg" fontWeight="bold">{task.status}</Text>
                        <Button>Config</Button>
                    </Card>
                )
            }
        </SimpleGrid>
    </VStack>
}

/*
function ActionConfigPanel() {
    const {action: actionId} = useParams();
    const {action, options} = useContext(TasksContext);
    usePageInfo(action.type.name)

    const onSave = async (changes) => {
        const info = changes.get("info")

        if (info != null) {
            const description = info["description"]

            await modifyActionInfo(actionId, description)
        }

        await updateTask(actionId, changes.get("options"))
    }

    const groups = [
        {
            id: "info",
            options: [
                {
                    id: "description",
                    name: "動作描述",
                    description: "這個動作的描述，用於告訴用戶這個動作實際上是做什麼的",
                    type: "long_string",
                    value: action.description,
                }
            ]
        },
        {
            id: "options",
            options
        }
    ]

    return (<MultiConfigPanel groups={groups} onSave={onSave}/>)
}
 */