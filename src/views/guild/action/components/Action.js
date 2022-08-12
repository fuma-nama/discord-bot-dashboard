import React, {Fragment, useContext} from "react";
import {Box, Button, Flex, Grid, GridItem, HStack, Image, Text, useColorModeValue} from "@chakra-ui/react";
import Card from "components/card/Card";
import {Link} from "react-router-dom";
import {useMutation, useQueryClient} from "react-query";
import ErrorModal from "components/modal/ErrorModal";
import {FaRegClone} from "react-icons/fa";
import ActionMenu from "components/menu/ActionMenu";
import {GuildContext} from "contexts/guild/GuildContext";

function ValueField({options}) {
    return <Grid
        rowGap={2}
        columnGap={4}
        templateRows='repeat(2, 1fr)'
        templateColumns='fit-content(100px) 1fr'
    >{options.filter(pair => pair).map(([name, value], key) =>
        <Fragment key={key}>
            <GridItem fontWeight="bold">
                {name}
            </GridItem>
            <GridItem>
                {value ? value : "None"}
            </GridItem>
        </Fragment>)}
    </Grid>
}

/**
 * {
 *  id: "kill_kane",
 *  banner: "",
 *  name: "Kill Kane",
 *  description: "Kill Kane in a channel"
 * }
 */
export function Action({action}) {
    const textColor = useColorModeValue("navy.700", "white");
    const {id: serverId} = useContext(GuildContext)
    const actionId = action.id

    const configUrl = `/guild/${serverId}/action/${actionId}`
    return (
        <Card p="20px">
            <Flex direction="column" gap={3}>
                {action.banner?
                    <Image h="5rem" objectFit="cover" rounded="lg" bg="brand.500" src={action.banner}/> :
                    <Box h="5rem" rounded="lg" bg="brand.500" />
                }
                <Text
                    color={textColor}
                    fontSize={{
                        base: "xl",
                        md: "lg",
                    }}
                    fontWeight="bold"
                >
                    {action.name}
                </Text>
                <Text
                    color={textColor}
                    fontSize="md"
                    mb={5}
                >
                    {action.description}
                </Text>
                <HStack>
                    <Link to={configUrl}>
                        <Button px={10} variant="brand">Open</Button>
                    </Link>
                </HStack>
            </Flex>
        </Card>
    );
}

function ActionButtons({configUrl, onRun, onDelete, running, deleting}) {

    const disabled = running || deleting;

    const ActionButton = (props) => {
        return <Button
            {...props}
            fontSize="sm"
            borderRadius="70px"
            px="24px"
            py="5px"
            disabled={disabled}
        >
            {props.children}
        </Button>
    }

    return <Flex
        direction={{sm: "row", base: "column"}}
        gap={2}>
        <ActionButton isLoading={running} onClick={onRun}>運行動作</ActionButton>
        <Link to={configUrl}>
            <ActionButton w="full">
                修改動作
            </ActionButton>
        </Link>
        <ActionButton variant="brand" isLoading={deleting} onClick={onDelete}>刪除動作</ActionButton>
    </Flex>
}