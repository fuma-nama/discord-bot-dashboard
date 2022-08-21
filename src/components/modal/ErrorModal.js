import {
    Button,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    Text,
    useColorModeValue
} from "@chakra-ui/react";
import React from "react";
import {Locale, useLocale} from "../../utils/Language";

export default function ErrorModal({header, error, onClose}) {
    const locale = useLocale()
    let modalBg = useColorModeValue("rgba(244, 247, 254)", "rgba(11,20,55)");

    return <Modal isCentered isOpen={error != null} onClose={onClose}>
        <ModalContent bg={modalBg} rounded="2xl">
            <ModalHeader>{locale(header)}</ModalHeader>
            <ModalCloseButton/>
            <ModalBody>
                <Text>{error}</Text>
            </ModalBody>

            <ModalFooter>
                <Button onClick={onClose}>
                    <Locale zh="關閉" en="Close" />
                </Button>
            </ModalFooter>
        </ModalContent>
    </Modal>
}