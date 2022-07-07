import {useEffect, useState} from "react";
import {Text, Spinner, Center, Stack, Button, Skeleton, Flex} from "@chakra-ui/react";

export function AsyncContext({fetch, children, type = "loading"}) {
    const [value, setValue] = useState(null);
    const [error, setError] = useState(false);

    const fetchValue = () => {
        fetch()
            .then((result) => {
                setValue(result);
            })
            .catch(() => {
                setError(true);
            });
    };

    const onRetry = () => {
        setError(false);
        fetchValue();
    };

    useEffect(() => {
        if (value == null) {
            fetchValue();
        }
    }, [value]);

    const getPanel = () => {
        switch (type) {
            case "loading":
                return <LoadingPanel error={error} onRetry={onRetry}/>
            case "skeleton":
                return <SkeletonPanel error={error} onRetry={onRetry}/>
            default:
                return <></>;
        }
    }

    return value ? (
        children(value)
    ) : (
        getPanel()
    );
}

function SkeletonPanel({error, onRetry}) {
    const height = "100px";
    if (error) {
        return <ErrorPanel height={height} error={error} onRetry={onRetry}/>
    }

    return <Flex gap={4} direction="column">
        <Skeleton isLoaded={false} height={height} rounded="lg" />
        <Skeleton isLoaded={false} height={height} rounded="lg" />
    </Flex>
}

function ErrorPanel({error, onRetry, ...rest}) {
    return <Center {...rest}>
        <Stack direction="column" align="center">
            <Text>加載失敗</Text>
            <Button onClick={onRetry}>Retry</Button>
        </Stack>
    </Center>
}

function LoadingPanel({error, onRetry}) {
    if (error) {
        return <ErrorPanel height="100vh" error={error} onRetry={onRetry}/>
    }

    return (
        <Center height="100vh">
            <Stack direction="column" align="center">
                <Spinner size="lg"/>
                <Text>正在加載...</Text>
            </Stack>
        </Center>
    );
}
