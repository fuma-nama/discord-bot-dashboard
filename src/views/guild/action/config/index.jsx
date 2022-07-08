import React, {useContext} from "react";

import {Box, Flex,} from "@chakra-ui/react";

import {usePageInfo} from "contexts/PageInfoContext";
import {ConfigPanel} from "components/fields/ConfigPanel";
import {modifyAction} from "api/yeecord";
import {ActionDetailContext, ActionDetailProvider} from "contexts/actions/ActionDetailContext";
import {useParams} from "react-router-dom";

export default function ActionPanel() {
    return (
        <ActionDetailProvider>
            <Box pt={{base: "180px", md: "80px", xl: "80px"}}>
                <Flex
                    flexDirection="column"
                    mb="10"
                    gridArea={{xl: "1 / 1 / 2 / 3", "2xl": "1 / 1 / 2 / 2"}}
                >
                    <ActionConfigPanel/>
                </Flex>
            </Box>
        </ActionDetailProvider>
    );
}

function ActionConfigPanel() {
    const {action: actionId} = useParams();
    const {action, options} = useContext(ActionDetailContext);
    usePageInfo(action.description || action.type.name)

    const onSave = (changes) => modifyAction(actionId, changes)

    return (
        <ConfigPanel options={options} onSave={onSave}/>
    );
}
