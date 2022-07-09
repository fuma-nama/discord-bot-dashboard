import {
    Button, Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    Text,
    useColorModeValue
} from "@chakra-ui/react";
import React from "react";

export default function ErrorModal({header, error, onClose}) {
    let modalBg = useColorModeValue("rgba(244, 247, 254)", "rgba(11,20,55)");

    return <Modal isCentered isOpen={error != null} onClose={onClose}>
        <ModalContent bg={modalBg} rounded="2xl">
            <ModalHeader>{header}</ModalHeader>
            <ModalCloseButton/>
            <ModalBody>
                <Text>{error}</Text>
            </ModalBody>

            <ModalFooter>
                <Button onClick={onClose}>關閉</Button>
            </ModalFooter>
        </ModalContent>
    </Modal>
}