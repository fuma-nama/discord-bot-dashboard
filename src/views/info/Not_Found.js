import {Box, Center, Heading, Image, Text} from "@chakra-ui/react";
import not_found from "assets/img/info/not_found_404.svg"

export default function NotFound() {
    return <Center h="100vh" position="relative">
        <Box position="relative">
            <Image width={400} src={not_found} alt="Not Found" />
            <Heading>404 Not Found</Heading>
            <Text fontSize={20}>我們找不到您請求的資源</Text>
        </Box>
    </Center>
}