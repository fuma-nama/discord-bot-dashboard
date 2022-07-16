import Game from "./Game";
import {Box, Button} from "@chakra-ui/react";
import {Link} from "react-router-dom";

export default function Index() {
    return <Box bg="white" w="full" h="100vh" overflow="hidden">
        <Game/>
        <Box position="absolute" bottom={0} w="full" zIndex="tooltip" p={4}>

            <Link to="/admin">
                <Button w="full" variant="brand">To Admin Dashboard</Button>
            </Link>
        </Box>
    </Box>
}