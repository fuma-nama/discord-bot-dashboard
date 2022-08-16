import React, {useContext, useEffect, useMemo, useState} from "react";
import {
    Button,
    Heading,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    Skeleton,
    Stack,
    Text,
    useColorModeValue,
    useDisclosure,
    VStack,
} from "@chakra-ui/react";
import {FeaturesContext} from "contexts/FeaturesContext";
import Feature from "../../card/Feature";
import {useLocation} from "react-router-dom";
import SearchInput from "../../fields/impl/SearchInput";
import {GuildContext} from "contexts/guild/GuildContext";
import {useQuery} from "react-query";
import {getFeatures} from "api/yeecord";
import {Query} from "contexts/components/AsyncContext";
import {config} from "../../../config/config";
import {Action} from "../../../views/guild/action/components/Action";

export function SearchBar({...rest}) {
    const {isOpen, onOpen, onClose} = useDisclosure()

    const [search, setSearch] = useState("")
    const location = useLocation();
    useEffect(onClose, [location.pathname, onClose])

    const groupStyle = {
        w: {base: "100%", md: "200px"},
        ...rest
    }
    return (
        <>
            <SearchModal isOpen={isOpen} onClose={onClose} search={search}/>
            <SearchInput value={search} onChange={setSearch} groupStyle={groupStyle} onSearch={onOpen}/>
        </>
    );
}

function SearchList({search}) {
    const {enabled} = useContext(FeaturesContext)

    const {features, actions} = useMemo(
        () => ({
            features: Object.entries(config.features)
                .filter(([, feature]) => feature.name.includes(search)),
            actions: Object.entries(config.actions)
                .filter(([, action]) => action.name.includes(search))
        }),
        [search]
    )

    const empty = features.length === 0 || actions.length === 0

    return  <Stack gap="20px">
        {empty && <Text>No Result Found</Text>}
        <Heading size="md">Features</Heading>
        {features.map(([id, feature]) =>
            <Feature
                key={id}
                id={id}
                {...feature}
                enabled={enabled.includes(id)}
            />
        )}
        <Heading size="md">Actions</Heading>
        {actions.map(([id, action]) =>
            <Action
                key={id}
                action={{
                    id,
                    ...action
                }}
            />
        )}
    </Stack>
}

function SearchModal({isOpen, onClose, search }) {
    const modalBg = useColorModeValue("rgba(244, 247, 254)", "rgba(11,20,55)");

    return <Modal isOpen={isOpen} onClose={onClose} isCentered size="4xl" scrollBehavior="inside">
        <ModalContent bg={modalBg}>
            <ModalHeader>搜索功能: {search.length === 0? "全部" : `"${search}"`}</ModalHeader>
            <ModalCloseButton />

            <ModalBody>
                <DataProvider>
                    <SearchList search={search} />
                </DataProvider>
            </ModalBody>

            <ModalFooter>
                <Button variant="brand" mr={3} onClick={onClose}>
                    關閉
                </Button>
            </ModalFooter>
        </ModalContent>
    </Modal>
}

function DataProvider({children}) {
    const {id: serverId} = useContext(GuildContext)

    const features = useQuery(["features", serverId],
        () => getFeatures(serverId),
        { retry: 0 }
    )

    return (
        <Query
            query={features}
            placeholder={
                <VStack>
                    <Skeleton rounded="lg" height="100px" />
                    <Skeleton rounded="lg" height="100px" />
                </VStack>
        }>
            <FeaturesContext.Provider value={features.data}>
                {children}
            </FeaturesContext.Provider>
        </Query>
    );
}
