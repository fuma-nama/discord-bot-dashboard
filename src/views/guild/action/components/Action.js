import React, {Fragment} from "react";
import {Button, Flex, Grid, GridItem, Text, useColorModeValue} from "@chakra-ui/react";
import Card from "../../../../components/card/Card";
import {Link} from "react-router-dom";

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
    const {name, id} = type;
    const textColor = useColorModeValue("navy.700", "white");

    return (
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
                        ["Status", status],
                        ["Detail", description],
                        ["Created At", createdAt.toLocaleDateString()]
                    ]}/>
                </Flex>
                <ActionButtons configUrl={configUrl}/>
            </Flex>
        </Card>
    );
}

function ActionButtons({configUrl}) {
    const ActionButton = (props) => {
        return <Button
            {...props}
            fontSize="sm"
            borderRadius="70px"
            px="24px"
            py="5px"
        >
            {props.children}
        </Button>
    }

    return <Flex
        direction={{sm: "row", base: "column"}}
        gap={2}>
        <ActionButton>運行動作</ActionButton>
        <ActionButton>
            <Link to={configUrl}>
                修改動作
            </Link>
        </ActionButton>
        <ActionButton variant="brand">刪除動作</ActionButton>
    </Flex>
}