import {Text, Spinner, Center, Stack, Button, Skeleton, Flex} from "@chakra-ui/react";
import { useQuery } from 'react-query'

export function AsyncContext({id, fetch, children}) {
    const { isLoading, error, data, refetch } = useQuery(id, fetch)

    if (error) {
        return <ErrorPanel height="100vh" error={error} onRetry={refetch}/>
    }

    if (isLoading) {

        return (
            <Center height="100vh">
                <Stack direction="column" align="center">
                    <Spinner size="lg"/>
                    <Text>正在加載...</Text>
                </Stack>
            </Center>
        );
    }

    return children(data)
}

export function AsyncContextSkeleton({id, fetch, children}) {
    const { isLoading, error, data, refetch } = useQuery(id, fetch)
    const height = "100px";

    if (error) {
        return <ErrorPanel height={height} error={error} onRetry={refetch}/>
    }

    if (isLoading) {

        return <Flex gap={4} direction="column">
            <Skeleton isLoaded={false} height={height} rounded="lg" />
            <Skeleton isLoaded={false} height={height} rounded="lg" />
        </Flex>
    }

    return children(data)
}

export function QueryHolder({error, isLoading, refetch, children}) {
    if (error) {
        return <ErrorPanel height="100vh" error={error} onRetry={refetch}/>
    }

    if (isLoading) {

        return (
            <Center height="100vh">
                <Stack direction="column" align="center">
                    <Spinner size="lg"/>
                    <Text>正在加載...</Text>
                </Stack>
            </Center>
        );
    }

    return children
}

export function QueryHolderSkeleton({error, isLoading, refetch, children}) {
    const height = "100px";

    if (error) {
        return <ErrorPanel height={height} error={error} onRetry={refetch}/>
    }

    if (isLoading) {

        return <Flex gap={4} direction="column">
            <Skeleton isLoaded={false} height={height} rounded="lg" />
            <Skeleton isLoaded={false} height={height} rounded="lg" />
        </Flex>
    }

    return children
}

function ErrorPanel({error, onRetry, ...rest}) {
    return <Center {...rest}>
        <Stack direction="column" align="center">
            <Text>加載失敗</Text>
            <Button onClick={onRetry}>Retry</Button>
        </Stack>
    </Center>
}