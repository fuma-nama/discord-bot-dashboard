import {
    Button,
    Modal as ModalBase,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    useColorModeValue,
    useToken
} from "@chakra-ui/react";
import {Locale, useLocale} from "utils/Language";

export default function Modal({header, children, isOpen, onClose, ...props}) {
    const locale = useLocale()
    const modalBg = useColorModeValue("secondaryGray.300", "navy.900");
    const [overlayBg] = useToken("colors", [modalBg])

    return <ModalBase isCentered isOpen={isOpen} onClose={onClose} {...props}>
        <ModalOverlay
            bg={`rgba(${overlayBg}, 0.4)`}
            backdropFilter='blur(10px)'
        />
        <ModalContent bg={modalBg} rounded="2xl" shadow="lg">
            <ModalHeader>{locale(header)}</ModalHeader>
            <ModalCloseButton/>
            <ModalBody>
                {children}
            </ModalBody>

            <ModalFooter>
                <Button onClick={onClose}>
                    <Locale zh="關閉" en="Close" />
                </Button>
            </ModalFooter>
        </ModalContent>
    </ModalBase>
}