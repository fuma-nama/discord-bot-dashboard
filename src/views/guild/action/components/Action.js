import React, {Fragment} from "react";
import {
    Button,
    Flex,
    Grid,
    GridItem, Icon,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Text,
    useColorModeValue
} from "@chakra-ui/react";
import Card from "../../../../components/card/Card";
import {Link} from "react-router-dom";
import {cloneAction, deleteAction, runAction} from "../../../../api/yeecord";
import {useMutation, useQueryClient} from "react-query";
import ErrorModal from "../../../../components/modal/ErrorModal";
import {FaRegClone} from "react-icons/fa";
import ActionMenu from "../../../../components/menu/ActionMenu";

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

export function Action({description, status, createdAt, type, configUrl}) {
    const queryClient = useQueryClient()
    const {name, id} = type;
    const textColor = useColorModeValue("navy.700", "white");

    const runMutation = useMutation(
        () => runAction(id)
    )


    const deleteMutation = useMutation(
        () => deleteAction(id), {
            onSuccess: () => {
                queryClient.invalidateQueries(['actions'])
            },
        })
    const cloneMutation = useMutation(
        () => cloneAction(id), {
            onSuccess() {
                queryClient.invalidateQueries(['actions'])
            }
        }
    )

    const actions = [
        {
            name: "複製",
            icon: FaRegClone,
            onClick: cloneMutation.mutate
        }
    ]

    return (
        <>
            <ErrorModal header="未能運行此動作" error={runMutation.error} onClose={runMutation.reset}/>
            <ErrorModal header="未能刪除此動作" error={deleteMutation.error} onClose={deleteMutation.reset}/>
            <Card p="20px">
                <Flex flexDirection="column" justify="space-between" h="100%">
                    <Flex
                        direction="column"
                        mb="10"
                    >
                        <Text
                            color={textColor}
                            fontSize={{
                                base: "xl",
                                md: "lg",
                            }}
                            mb="5px"
                            fontWeight="bold"
                            me="14px"
                        >
                            {name}
                        </Text>
                        <ValueField options={[
                            ["狀態", status],
                            ["描述", description],
                            ["創建於", createdAt.toLocaleDateString()]
                        ]}/>
                    </Flex>
                    <ActionButtons
                        configUrl={configUrl}
                        onRun={runMutation.mutate}
                        onDelete={deleteMutation.mutate}
                        running={runMutation.isLoading}
                        deleting={deleteMutation.isLoading}
                    />
                </Flex>
                <ActionMenu
                    position="absolute"
                    right="10px"
                    top="10px"
                    actions={actions}
                />
            </Card>
        </>
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