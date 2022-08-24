import React, {useState} from "react";
import {OptionPanel} from "./OptionPanel";
import {SaveAlert} from "components/alert/SaveAlert";
import ErrorModal from "../modal/ErrorModal";
import {useMutation} from "react-query";
import {Flex, SimpleGrid, Skeleton, SlideFade} from "@chakra-ui/react";

export function ConfigItemListAnimated({options, changes, onChange}) {
    return options.map((option) => (
        <SlideFade key={option.id} in={true}>
            <Flex w="full" h="full">
                <OptionPanel
                    option={option}
                    value={
                        changes && changes.has(option.id) ? changes.get(option.id) : option.value
                    }
                    onChange={(v) => onChange(option.id, v)}
                />
            </Flex>
        </SlideFade>
    ))
}

export function ConfigGridSkeleton() {
    return <SimpleGrid columns={{base: 1, lg: 2}} gap={5} mt={10}>
        <Skeleton height="20rem" rounded="lg" />
        <Skeleton height="20rem" rounded="lg" />
        <Skeleton height="20rem" rounded="lg" />
        <Skeleton height="20rem" rounded="lg" />
    </SimpleGrid>
}

export function ConfigGrid(props) {
    return <SimpleGrid columns={{base: 1, lg: 2}} gap={5} mt={10}>
        <ConfigPanel {...props} />
    </SimpleGrid>
}

export function MultiConfigPanel({groups, onSave: save, onSaved}) {
    function getInitial() {
        return groups.map(() => new Map())
    }

    const [changes, setChanges] = useState(getInitial())

    const mutation = useMutation(save, {
        onSuccess(data) {
            setChanges(getInitial())
            return onSaved && onSaved(data)
        }
    })

    const onChange = (i, id, value) => {
        if (mutation.isLoading) return;

        const clone = [...changes]
        clone[i].set(id, value)

        setChanges(clone)
    }

    return (
        <>
            <ErrorModal
                header="未能保存更改"
                error={mutation.error && mutation.error.toString()}
                onClose={mutation.reset}
            />
            {
                groups.map((options, i) =>
                    <ConfigItemListAnimated
                        key={i}
                        options={options}
                        changes={changes[i]}
                        onChange={(id, value) => onChange(i, id, value)}
                    />
                )
            }
            <SaveAlert
                visible={changes.some(item => item.size > 0)}
                saving={mutation.isLoading}
                onSave={() => mutation.mutate(changes)}
                onDiscard={() => setChanges(getInitial())}
            />
        </>
    );
}

export function ConfigPanel({options, onDiscard, onSave: save, onSaved}) {
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
                visible={changes.size !== 0}
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