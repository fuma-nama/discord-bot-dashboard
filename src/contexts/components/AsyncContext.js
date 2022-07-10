import {Text, Spinner, Center, Stack, Button, Skeleton, Flex} from "@chakra-ui/react";

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

export function QueryHolderSkeleton({error, isLoading, refetch, height = "200px", children, direction = "column", ...rest}) {
    if (error) {
        return <ErrorPanel height={height} error={error} onRetry={refetch}/>
    }

    if (isLoading) {

        return <Flex gap={4} direction={direction} my="5" {...rest}>
            <Skeleton width="100%" isLoaded={false} height={height} rounded="lg" />
            <Skeleton width="100%" isLoaded={false} height={height} rounded="lg" />
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