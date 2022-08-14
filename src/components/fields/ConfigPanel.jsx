import React, {useState} from "react";
import {OptionPanel} from "./OptionPanel";
import {SaveAlert} from "components/alert/SaveAlert";
import ErrorModal from "../modal/ErrorModal";
import {useMutation} from "react-query";
import {SimpleGrid, SlideFade} from "@chakra-ui/react";

export function ConfigItemListAnimated({options, changes, onChange}) {
    return options.map((option) => (
        <SlideFade key={option.id} in={true}>
            <OptionPanel
                option={option}
                value={
                    changes && changes.has(option.id) ? changes.get(option.id) : option.value
                }
                onChange={(v) => onChange(option.id, v)}
            />
        </SlideFade>
    ))
}

export function ConfigItemList({options, changes, onChange}) {
    return options.map((option) => (
            <OptionPanel
                option={option}
                value={
                    changes && changes.has(option.id) ? changes.get(option.id) : option.value
                }
                key={option.id}
                onChange={(v) => onChange(option.id, v)}
            />
    ))
}

export function ConfigGrid(props) {
    return <SimpleGrid columns={{base: 1, lg: 2}} gap={5} mt={10}>
        <ConfigPanel {...props} />
    </SimpleGrid>
}

export function ConfigPanel({options, hasChanges = false, onDiscard, onSave: save, onSaved}) {
    const [changes, setChanges] = useState(new Map());
    const mutation = useMutation(save, {
        onSuccess(data) {
            setChanges(new Map());
            return onSaved && onSaved(data)
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
                header="未能保存更改"
                error={mutation.error && mutation.error.toString()}
                onClose={mutation.reset}
            />
            <ConfigItemListAnimated
                options={options}
                changes={changes}
                onChange={onChange}
            />
            <SaveAlert
                visible={hasChanges || changes.size !== 0}
                saving={mutation.isLoading}
                onSave={() => mutation.mutate(changes)}
                onDiscard={() => {
                    setChanges(new Map())

                    if (onDiscard != null) {
                        onDiscard()
                    }
                }}
            />
        </>
    );
}