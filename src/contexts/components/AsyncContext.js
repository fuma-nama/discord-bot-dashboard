import {Text, Spinner, Center, Stack, Button, Skeleton, Flex} from "@chakra-ui/react";

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
                    <Text>正在加載...</Text>
                </Stack>
            </Center>
        );
    }

    return (nullable || query.data != null) && children
}

export function QueryHolderSkeleton({query, height = "200px", children, direction = "column", nullable}) {
    const {error, isLoading, refetch} = query

    if (error) {
        return <ErrorPanel height={height} error={error} onRetry={refetch}/>
    }

    if (isLoading) {

        return <Flex gap={4} direction={direction} my="5">
            <Skeleton width="100%" isLoaded={false} height={height} rounded="lg" />
            <Skeleton width="100%" isLoaded={false} height={height} rounded="lg" />
        </Flex>
    }

    return (nullable || query.data != null) && children
}

function ErrorPanel({error, onRetry, ...rest}) {
    return <Center {...rest}>
        <Stack direction="column" align="center">
            <Text>加載失敗</Text>
            <Button onClick={onRetry}>再試一次</Button>
        </Stack>
    </Center>
}