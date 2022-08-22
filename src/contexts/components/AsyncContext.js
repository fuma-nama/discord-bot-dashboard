import {Button, Center, Skeleton, Spinner, Stack, Text} from "@chakra-ui/react";
import React from "react";
import {Locale} from "../../utils/Language";

export function QueryHolder({query, children, nullable}) {
    const {error, isLoading, refetch} = query;

    if (error) {
        return <ErrorPanel height="100vh" error={error} onRetry={refetch}/>
    }

    if (isLoading) {

        return (
            <Center height="100vh">
                <Stack direction="column" align="center">
                    <Spinner size="lg"/>
                    <Text>
                        <Locale zh="正在加載..." en="Loading..." />
                    </Text>
                </Stack>
            </Center>
        );
    }

    if (nullable || query.data != null) {
        return parseChildren(children)
    }

    return <></>
}

export function Query({query, children, placeholder, height = "200px"}) {
    const {error, isLoading, refetch} = query

    if (error) {
        return <ErrorPanel height={height} error={error} onRetry={refetch}/>
    }

    if (isLoading) {
        return placeholder
    }

    if (query.data != null) {
        return parseChildren(children)
    }

    return <></>
}

export function QueryHolderSkeleton({query, height = "200px", children, count = 1, nullable = false}) {
    const {error, isLoading, refetch} = query

    if (error) {
        return <ErrorPanel height={height} error={error} onRetry={refetch}/>
    }

    if (isLoading) {

        return [...Array(count)].map((_, i) =>
            <Skeleton key={i} isLoaded={false} height={height} rounded="lg" />
        )
    }

    if (nullable || query.data != null) {
        return parseChildren(children)
    }

    return <></>
}

function parseChildren(children) {
    return typeof children === 'function'?
        children() : children
}

export function ErrorPanel({error, onRetry, ...rest}) {
    return <Center {...rest}>
        <Stack direction="column" align="center">
            <Text>
                <Locale zh="加載失敗" en="Failed to load" />
            </Text>
            <Button onClick={onRetry}>
                <Locale zh="再試一次" en="Try Again" />
            </Button>
        </Stack>
    </Center>
}