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
import {getFeatures} from "api/internal";
import {Query} from "contexts/components/AsyncContext";
import {config} from "../../../config/config";
import {Action} from "../../card/Action";
import {Locale, useLocale} from "../../../utils/Language";

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
    const locale = useLocale()

    function filter(map) {
        return Object.entries(map)
            .filter(([, feature]) =>
                locale(feature.name).includes(search)
            )
    }

    const {features, actions} = useMemo(
        () => ({
            features: filter(config.features),
            actions: filter(config.actions)
        }),
        [search]
    )

    const empty = features.length === 0 || actions.length === 0

    return  <Stack gap="20px">
        {empty?
            <Text>
                <Locale zh="沒有找到結果" en="No Result Found" />
            </Text>
            :
            <Content features={features} actions={actions} />
        }

    </Stack>
}

function Content({features, actions}) {
    const {enabled} = useContext(FeaturesContext)

    return <>
        <Heading size="md">
            <Locale zh="功能" en="Features" />
        </Heading>
        {features.map(([id, feature]) =>
            <Feature
                key={id}
                id={id}
                {...feature}
                enabled={enabled.includes(id)}
            />
        )}
        <Heading size="md">
            <Locale zh="動作" en="Actions" />
        </Heading>
        {actions.map(([id, action]) =>
            <Action
                key={id}
                action={{
                    id,
                    ...action
                }}
            />
        )}
    </>
}

function SearchModal({isOpen, onClose, search }) {
    const modalBg = useColorModeValue("rgba(244, 247, 254)", "rgba(11,20,55)");
    const all = search.length === 0

    return <Modal isOpen={isOpen} onClose={onClose} isCentered size="4xl" scrollBehavior="inside">
        <ModalContent bg={modalBg}>
            <ModalHeader>
                <Locale zh="搜索功能: " en="Search For: " />
                {all? <Locale zh="全部" en="All" /> : search}
            </ModalHeader>
            <ModalCloseButton />

            <ModalBody>
                <DataProvider>
                    <SearchList search={search} />
                </DataProvider>
            </ModalBody>

            <ModalFooter>
                <Button variant="brand" mr={3} onClick={onClose}>
                    <Locale zh="關閉" en="Close" />
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
