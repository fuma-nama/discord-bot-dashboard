import React, {useState} from "react";
import { Stack } from "@chakra-ui/react";
import {OptionPanel} from "./OptionPanel";
import {SaveAlert} from "components/alert/SaveAlert";
import ErrorModal from "../modal/ErrorModal";
import {useMutation} from "react-query";

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

export function ConfigPanel({options: defaultOptions, onSave: save}) {
    const [options, setOptions] = useState(defaultOptions);
    const [changes, setChanges] = useState(new Map());
    const mutation = useMutation(save, {
        onSuccess() {
            afterSave()
        }
    })

    const onChange = (id, value) => {
        if (mutation.isLoading) return;

        setChanges(new Map(
            changes.set(id, value)
        ))
    };

    const afterSave = () => {
        const updated = options.map((option) => {
            return {
                ...option,
                value: changes.has(option.id)?
                    changes.get(option.id) :
                    option.value
            };
        });

        setOptions(updated);
        setChanges(new Map());
    }

    const onDiscard = () => {
        setChanges(new Map())
    };

    return (
        <>
            <ErrorModal
                header="未能保存更改"
                error={mutation.error && mutation.error.toString()}
                onClose={mutation.reset}
            />
            <Stack mt="10" mb={70}>
                <ConfigItemList
                    options={options}
                    changes={changes}
                    onChange={onChange}
                />
            </Stack>
            <SaveAlert
                visible={changes.size !== 0}
                saving={mutation.isLoading}
                onSave={() => mutation.mutate(changes)}
                onDiscard={onDiscard}
            />
        </>
    );
}