import React, {useContext, useEffect, useMemo, useState} from "react";
import {
    Button,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    Stack,
    Text,
    useColorModeValue,
    useDisclosure,
} from "@chakra-ui/react";
import {FeaturesContext, FeaturesProvider} from "../../../contexts/FeaturesContext";
import Feature from "../../card/Feature";
import {useLocation} from "react-router-dom";
import SearchInput from "../../fields/impl/SearchInput";

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
    const {features} = useContext(FeaturesContext)

    const filtered = useMemo(
        () => features.filter(feature => feature.name.includes(search)),
        [features, search]
    )

    return  <Stack gap="20px">
        {filtered.length === 0 && <Text>No Result Found</Text>}
        {filtered.map((feature) => {
            return (
                <Feature
                    key={feature.id}
                    {...feature}
                />
            );
        })}
    </Stack>
}

function SearchModal({isOpen, onClose, search }) {
    const modalBg = useColorModeValue("rgba(244, 247, 254)", "rgba(11,20,55)");

    return <Modal isOpen={isOpen} onClose={onClose} isCentered size="4xl" scrollBehavior="inside">
        <ModalContent bg={modalBg}>
            <ModalHeader>搜索功能: {search.length === 0? "全部" : `"${search}"`}</ModalHeader>
            <ModalCloseButton />

            <ModalBody>
                <FeaturesProvider>
                    <SearchList search={search} />
                </FeaturesProvider>
            </ModalBody>

            <ModalFooter>
                <Button variant="brand" mr={3} onClick={onClose}>
                    關閉
                </Button>
            </ModalFooter>
        </ModalContent>
    </Modal>
}
