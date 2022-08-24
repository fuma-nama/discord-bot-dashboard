import React, {useContext, useMemo} from "react";

// Chakra imports
import {Button, SimpleGrid, Stack, Text,} from "@chakra-ui/react";

// Custom components
import {usePageInfo} from "contexts/PageInfoContext";
import {useActionInfo} from "contexts/actions/ActionDetailContext";
import {ConfigGridSkeleton, MultiConfigPanel} from "components/fields/ConfigPanel";
import {Link, useParams} from "react-router-dom";
import {updateTask} from "api/internal";
import {GuildContext} from "contexts/guild/GuildContext";
import {useActionBanner} from "../components/ActionBanner";
import {BiArrowBack} from "react-icons/bi";
import {useTaskDetailQuery} from "../../../../contexts/actions/TaskDetailContext";
import {useQueryClient} from "react-query";
import {usePageState} from "../../../../utils/State";
import {Locale, useLocale} from "../../../../utils/Language";

export default function TaskBoard() {
    const {name: action} = useActionInfo()
    const locale = useLocale()
    useActionBanner([<BackButton />])

    usePageInfo(
        [{zh: "動作", en: "Action"}, action].map(locale)
    )

    return <Stack mt={10} gap={5}>
        <Text fontSize={25} fontWeight="bold">
            <Locale zh="修改任務" en="Modify Task" />
        </Text>

        <TaskConfigPanel />
    </Stack>
}

function TaskConfigPanel() {
    const query = useTaskDetailQuery()

    return query.isLoading? <ConfigGridSkeleton/> : <Config detail={query.data} />
}

export function Config({detail}) {
    const {id: guild, action, task} = useParams()

    const {name, values} = detail
    const client = useQueryClient()

    const onSaved = data => {
        return client.setQueryData(["task_detail", guild, action, task], data)
    }

    return (
        <SimpleGrid columns={{base: 1, lg: 2}} gap={5}>
            <ConfigPanel
                savedName={name}
                values={values}
                onSaved={onSaved}
            />
        </SimpleGrid>
    );
}

function ConfigPanel({savedName, onSaved, values}) {
    const {id: guild, action, task} = useParams();
    const info = useActionInfo()
    const state = usePageState()

    const options = useMemo(
        () => info.options(values, state),
        [values]
    )

    const onSave = ([nameChanges, changes]) => {
        return updateTask(guild, action, task, nameChanges.get("name"), changes)
    }

    const nameOption = {
        id: "name",
        type: "string",
        name: <Locale zh="任務名稱" en="Task Name" />,
        value: savedName,
        required: true
    }

    return (
        <MultiConfigPanel
            groups={[
                [nameOption], options
            ]}
            onSave={onSave}
            onSaved={onSaved}
        />
    );
}

function BackButton() {
    const {action} = useParams()
    const {id: guild} = useContext(GuildContext)

    const actionUrl = `/guild/${guild}/actions/${action}`

    return (
        <Link to={actionUrl}>
            <Button
                variant="white"
                leftIcon={<BiArrowBack />}
            >
                <Locale zh="返回動作" en="Back" />
            </Button>
        </Link>
    );
}