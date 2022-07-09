import React, {useState} from "react";
import {
    Button, Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    Stack,
    Text, useColorModeValue
} from "@chakra-ui/react";
import {OptionPanel} from "./OptionPanel";
import {SaveAlert} from "components/alert/SaveAlert";
import ErrorModal from "../modal/ErrorModal";

export function MultiConfigPanel({groups: defaultGroups, onSave: save}) {
    const [saving, setSaving] = useState(false);
    const [groups, setGroups] = useState(defaultGroups);
    const [changes, setChanges] = useState(new Map());
    const [error, setError] = useState(null);

    const onChange = (id, value) => {
        if (saving) return;

        setChanges(new Map(
            changes.set(id, value)
        ));
    };

    const afterSave = (changes) => {
        const updated = groups.map((group) => {
            const groupChanges = changes.get(group.id)

            if (groupChanges == null)
                return group
            else
                return {
                    ...group,
                    value: group.value.map(option => {
                        return {
                            ...option,
                            value: groupChanges.get(option.id)
                        }
                    }),
                };
        });

        setGroups(updated);
        setChanges(new Map());
    }

    const onSave = () => {
        setSaving(true);

        save(changes)
            .then(() => {
                afterSave(changes);
            })
            .catch((e) => {
                setError(e.message);
            })
            .finally(() => {
                setSaving(false);
            });
    };

    const onDiscard = () => {
        setSaving(false);
        setChanges(new Map())
    };

    return (
        <>
            <ErrorModal
                header="未能保存更改"
                error={error}
                onClose={() => setError(null)}
            />
            {groups.map(group =>
                <ConfigGroupItem
                    key={group.id}
                    saving={saving}
                    group={group}
                    changes={changes.get(group.id)}
                    onChange={onChange}
                />
            )}
            <SaveAlert
                visible={changes.size !== 0}
                saving={saving}
                onSave={onSave}
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
        options={group.value}
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
    const group = {
        id: "root",
        value: defaultOptions
    }

    const onSave = (changes) => {
        return save(changes["root"])
    }
    return <MultiConfigPanel groups={[group]} onSave={onSave}/>
}
