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
import hexToRgba from "hex-to-rgba";

export function EmptyModal({children, isOpen, onClose, ...props}) {
    const modalBg = useColorModeValue("secondaryGray.300", "navy.900");
    const [overlayBg] = useToken("colors", [modalBg])

    return <ModalBase isCentered isOpen={isOpen} onClose={onClose} {...props}>
        <ModalOverlay
            bg={hexToRgba(overlayBg, 0.4)}
            backdropFilter='blur(10px)'
        />
        <ModalContent bg={modalBg} rounded="2xl" shadow="lg">
            {children}
        </ModalContent>
    </ModalBase>
}

export default function Modal({header, children, isOpen, onClose, ...props}) {
    const locale = useLocale()

    return <EmptyModal isOpen={isOpen} onClose={onClose} {...props}>
        <ModalHeader>{locale(header)}</ModalHeader>
        <ModalCloseButton/>
        <ModalBody>
            {children}
        </ModalBody>

        <ModalFooter>
            <Button onClick={onClose}>
                <Locale zh="關閉" en="Close"/>
            </Button>
        </ModalFooter>
    </EmptyModal>
}