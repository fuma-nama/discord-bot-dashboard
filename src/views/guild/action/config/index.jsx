import React, {useContext} from "react";

import {Box, Flex} from "@chakra-ui/react";

import {usePageInfo} from "contexts/PageInfoContext";
import { MultiConfigPanel} from "components/fields/ConfigPanel";
import {modifyAction, modifyActionInfo} from "api/yeecord";
import {ActionDetailContext, ActionDetailProvider} from "contexts/actions/ActionDetailContext";
import {useParams} from "react-router-dom";
import ActionBanner from "./components/ActionBanner";

export default function ActionPanel() {
    return (
        <ActionDetailProvider>
            <Box pt={{base: "180px", md: "80px", xl: "80px"}}>
                <Flex
                    flexDirection="column"
                    mb="10"
                    gridArea={{xl: "1 / 1 / 2 / 3", "2xl": "1 / 1 / 2 / 2"}}
                >
                    <ActionBanner />
                    <ActionConfigPanel/>
                </Flex>
            </Box>
        </ActionDetailProvider>
    );
}

function ActionConfigPanel() {
    const {action: actionId} = useParams();
    const {action, options} = useContext(ActionDetailContext);
    usePageInfo(action.type.name)

    const onSave = async (changes) => {
        const info = changes.get("info")
        const description = info["description"]

        if (action.description !== description) {
            await modifyActionInfo(actionId, description)
        }

        await modifyAction(actionId, changes.get("options"))
    }

    const groups = [
        {
            id: "info",
            value: [
                {
                    id: "description",
                    name: "動作描述",
                    description: "這個動作的描述，用於告訴用戶這個動作實際上是做什麼的",
                    type: "long_string",
                    value: action.description,
                }
            ]
        },
        {
            id: "options",
            value: options
        }
    ]

    return (<MultiConfigPanel groups={groups} onSave={onSave}/>)
}
