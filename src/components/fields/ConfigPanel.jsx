import React, {useState} from "react";
import {Box, Stack,} from "@chakra-ui/react";
import {OptionPanel} from "./OptionPanel";
import {SaveAlert} from "components/alert/SaveAlert";
import ErrorModal from "../modal/ErrorModal";
import {useMutation} from "react-query";

export function MultiConfigPanel({groups: defaultGroups, onSave: save}) {
    const [groups, setGroups] = useState(defaultGroups);
    const [changes, setChanges] = useState(new Map());
    const mutation = useMutation(() => save(changes), {
        onSuccess() {
            afterSave()
        }
    })

    const onChange = (id, value) => {
        if (mutation.isLoading) return;

        setChanges(new Map(
            changes.set(id, value)
        ));
    };

    const afterSave = () => {
        const updated = groups.map((group) => {
            const groupChanges = changes.get(group.id)

            if (groupChanges == null)
                return group

            return {
                ...group,
                options: group.options.map(option => {
                    return {
                        ...option,
                        value: groupChanges.has(option.id)?
                            groupChanges.get(option.id) :
                            option.value
                    }
                }),
            };
        });

        setGroups(updated);
        setChanges(new Map());
    }

    const onDiscard = () => {
        setChanges(new Map())
    };

    return (
        <>
            <ErrorModal
                header="未能保存更改"
                error={mutation.error}
                onClose={mutation.reset}
            />
            <Box mb={70}>
                {groups.map(group =>
                    <ConfigGroupItem
                        key={group.id}
                        saving={mutation.isLoading}
                        group={group}
                        changes={changes.get(group.id)}
                        onChange={onChange}
                    />
                )}
            </Box>
            <SaveAlert
                visible={changes.size !== 0}
                saving={mutation.isLoading}
                onSave={mutation.mutate}
                onDiscard={onDiscard}
            />
        </>
    );
}

function ConfigGroupItem({group, saving, changes, onChange: setChanges}) {
    const onChange = (id, value) => {
        if (saving)
            return;

        let temp = changes == null? new Map() : changes;

        setChanges(group.id, temp.set(id, value));
    };

    return <ConfigItemList
        options={group.options}
        changes={changes}
        onChange={onChange}
    />
}

function ConfigItemList({options, changes, onChange}) {
    return <Stack mt="10">
        {options.map((option) => (
            <OptionPanel
                option={option}
                value={
                    changes && changes.has(option.id) ? changes.get(option.id) : option.value
                }
                key={option.id}
                onChange={(v) => onChange(option.id, v)}
            />
        ))}
    </Stack>
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
                error={mutation.error}
                onClose={mutation.reset}
            />
            <Box mb={70}>
                <ConfigItemList
                    options={options}
                    changes={changes}
                    onChange={onChange}
                />
            </Box>
            <SaveAlert
                visible={changes.size !== 0}
                saving={mutation.isLoading}
                onSave={mutation.mutate}
                onDiscard={onDiscard}
            />
        </>
    );
}
