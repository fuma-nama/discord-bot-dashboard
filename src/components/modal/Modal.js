import {
    Button,
    Modal as ModalBase,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    useColorModeValue
} from "@chakra-ui/react";
import {Locale, useLocale} from "utils/Language";

export default function Modal({header, children: body, isOpen, onClose}) {
    const locale = useLocale()
    let modalBg = useColorModeValue("rgba(244, 247, 254)", "rgba(11,20,55)");

    return <ModalBase isCentered isOpen={isOpen} onClose={onClose}>
        <ModalContent bg={modalBg} rounded="2xl">
            <ModalHeader>{locale(header)}</ModalHeader>
            <ModalCloseButton/>
            <ModalBody>
                {body}
            </ModalBody>

            <ModalFooter>
                <Button onClick={onClose}>
                    <Locale zh="關閉" en="Close" />
                </Button>
            </ModalFooter>
        </ModalContent>
    </ModalBase>
}