import React, {useMemo, useState} from "react";

// Chakra imports
import {SimpleGrid, Stack, Text,} from "@chakra-ui/react";

// Custom components
import {usePageInfo} from "contexts/PageInfoContext";
import {config} from "config/config";
import {useBanner} from "./components/Banner";
import {useActionInfo} from "contexts/actions/ActionDetailContext";
import {useMutation, useQueryClient} from "react-query";
import ErrorModal from "components/modal/ErrorModal";
import {SubmitAlert} from "components/alert/SaveAlert";
import {ConfigItemListAnimated} from "components/fields/ConfigPanel";
import {useNavigate, useParams} from "react-router-dom";
import {addTask} from "api/internal";
import NameInput from "../components/NameInput";
import {usePageState} from "utils/State";
import {Locale, useLocale} from "utils/Language";

export default function SubmitTaskBoard() {
    useBanner()

    return <SubmitTask />
}

function SubmitTask() {
    const {name} = useActionInfo()
    const locale = useLocale()

    usePageInfo([
        {zh: "動作", en: "Action"},
        name,
        {zh: "新任務", en: "New Task"}
    ].map(locale))

    return <Stack mt={10} gap={5}>
        <Text fontSize={25} fontWeight="bold">
            <Locale zh="創建新任務" en="New Task" />
        </Text>

        <SimpleGrid columns={{base: 1, lg: 2}} gap={5}>
            <ConfigPanel />
        </SimpleGrid>
    </Stack>
}

function ConfigPanel() {
    const {id: guild, action} = useParams()
    const navigate = useNavigate()
    const client = useQueryClient()
    const state = usePageState()

    const options = useMemo(
        () => config.actions[action].options(null, state),
        []
    )

    const [name, setName] = useState("New Task")
    const [changes, setChanges] = useState(new Map());

    const mutation = useMutation(
        () => addTask(guild, action, name, changes), {
            onSuccess(data) {
                client.setQueryData(
                    ["task_detail", guild, action, data.id.toString()],
                    data
                )

                navigate(`/guild/${guild}/actions/${action}/task/${data.id}`)
            }
        })

    const onChange = (id, value) => {
        if (mutation.isLoading) return;

        setChanges(new Map(
            changes.set(id, value)
        ))
    };

    return (
        <>
            <ErrorModal
                header={{zh: "未能創建任務", en: "Failed to Create Task"}}
                error={mutation.error && mutation.error.toString()}
                onClose={mutation.reset}
            />
            <NameInput value={name} onChange={setName} />
            <ConfigItemListAnimated
                options={options}
                changes={changes}
                onChange={onChange}
            />
            <SubmitAlert
                visible={name.length !== 0}
                loading={mutation.isLoading}
                onSubmit={mutation.mutate}
            />
        </>
    );
}