import {EmptyModal} from "./Modal";
import Settings from "../card/Settings";
import {ModalBody, ModalCloseButton, ModalHeader} from "@chakra-ui/react";

export function SettingsModal({isOpen, onClose}) {

    return <EmptyModal isOpen={isOpen} onClose={onClose}>
        <ModalHeader />
        <ModalCloseButton />
        <ModalBody>
            <Settings />
        </ModalBody>
    </EmptyModal>
}