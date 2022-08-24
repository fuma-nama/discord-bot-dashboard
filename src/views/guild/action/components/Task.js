import {Link, useParams} from "react-router-dom";
import {useMutation, useQueryClient} from "react-query";
import {deleteTask} from "api/internal";
import Card from "components/card/Card";
import {Box, Button, Flex, HStack, Text, VStack} from "@chakra-ui/react";
import React from "react";
import {Locale} from "utils/Language";

function useDeleteMutation(guild, action, task) {
    const client = useQueryClient()

    return useMutation(
        () => deleteTask(guild, action, task),
        {
            onSuccess() {
                return client.setQueryData(
                    ["action_detail", action],
                    data => ({
                        ...data,
                        tasks: data.tasks.filter(t => t.id !== task)
                    })
                )
            }
        }
    )
}

export function Task({task}) {
    const {id: guild, action} = useParams()

    const deleteMutation = useDeleteMutation(guild, action, task.id)

    const configUrl = `/guild/${guild}/actions/${action}/task/${task.id}`
    const createdAt = new Date(Date.parse(task.createdAt))

    return <Card p={5} gap={5}>
        <Flex direction="row" gap={5}>
            <VStack align="start">
                <Text fontSize="lg" fontWeight="bold">{task.name}</Text>
                <HStack>
                    <Text minW="fit-content" fontWeight="bold">
                        <Locale zh="創建於: " en="Created At: " />
                    </Text>
                    <Text>{createdAt.toLocaleString()}</Text>
                </HStack>
            </VStack>

            <Button
                ml="auto"
                variant="danger"
                onClick={deleteMutation.mutate}
                isLoading={deleteMutation.isLoading}>
                <Locale zh="刪除" en="Delete" />
            </Button>
        </Flex>
        <Box w={{base: "full", "3sm": "fit-content"}}>
            <Link to={configUrl}>
                <Button w="full" px={10} variant="action">
                    <Locale zh="修改選項" en="Modify Options" />
                </Button>
            </Link>
        </Box>
    </Card>
}