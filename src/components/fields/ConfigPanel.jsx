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

export function ConfigPanel({options: defaultOptions, onSave: save}) {
    const [saving, setSaving] = useState(false);
    const [options, setOptions] = useState(defaultOptions);
    const [changes, setChanges] = useState(new Map());
    const [error, setError] = useState(null);

    const onChange = (id, value) => {
        if (saving) return;
        setChanges(new Map(changes.set(id, value)));
    };

    const afterSave = (changes) => {
        const updated = options.map((option) => {
            return {
                ...option,
                value: changes.has(option.id) ? changes.get(option.id) : option.value,
            };
        });

        setOptions(updated);
        setChanges(new Map());
    }

    const onSave = () => {
        const target = new Map(changes);
        setSaving(true);

        save(target)
            .then(() => {
                afterSave(target);
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
            <SaveErrorModal error={error} setError={setError} />
            <Stack mt="10">
                {options.map((option) => (
                    <OptionPanel
                        option={option}
                        value={
                            changes.has(option.id) ? changes.get(option.id) : option.value
                        }
                        key={option.id}
                        onChange={(v) => onChange(option.id, v)}
                    />
                ))}
            </Stack>
            <SaveAlert
                saving={saving}
                changes={changes}
                onSave={onSave}
                onDiscard={onDiscard}
            />
        </>
    );
}

function SaveErrorModal({error, setError}) {
    let modalBg = useColorModeValue("rgba(244, 247, 254)", "rgba(11,20,55)");

    return <Modal isCentered isOpen={error != null} onClose={() => setError(null)}>
        <ModalContent bg={modalBg} rounded="2xl">
            <ModalHeader>未能保存更改</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                <Text>{error}</Text>
            </ModalBody>

            <ModalFooter>
                <Button onClick={() => setError(null)}>關閉</Button>
            </ModalFooter>
        </ModalContent>
    </Modal>
}