import {
    Flex,
    Icon,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Text,
    useColorModeValue,
    useDisclosure
} from "@chakra-ui/react";
import {MdOutlineMoreHoriz} from "react-icons/md";
import React from "react";

export default function ActionMenu({actions, ...rest}) {
    const textColor = useColorModeValue("secondaryGray.500", "white");
    const textHover = useColorModeValue(
        {color: "secondaryGray.900", bg: "unset"},
        {color: "secondaryGray.500", bg: "unset"}
    );
    const iconColor = useColorModeValue("brand.500", "white");
    const bgList = useColorModeValue("white", "whiteAlpha.100");
    const bgShadow = useColorModeValue(
        "14px 17px 40px 4px rgba(112, 144, 176, 0.08)",
        "unset"
    );
    const bgButton = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
    const bgHover = useColorModeValue(
        {bg: "secondaryGray.400"},
        {bg: "whiteAlpha.50"}
    );
    const bgFocus = useColorModeValue(
        {bg: "secondaryGray.300"},
        {bg: "whiteAlpha.100"}
    );

    // Ellipsis modals
    const {
        isOpen,
        onOpen,
        onClose,
    } = useDisclosure();

    return (
        <Menu isOpen={isOpen} onClose={onClose}>
            <MenuButton
                {...rest}
                align='center'
                justifyContent='center'
                bg={bgButton}
                _hover={bgHover}
                _focus={bgFocus}
                _active={bgFocus}
                w='37px'
                h='37px'
                lineHeight='100%'
                onClick={onOpen}
                borderRadius='10px'>
                <Icon as={MdOutlineMoreHoriz} color={iconColor} w='24px' h='24px'/>
            </MenuButton>
            <MenuList
                w='150px'
                minW='unset'
                maxW='150px !important'
                border='transparent'
                backdropFilter='blur(63px)'
                bg={bgList}
                boxShadow={bgShadow}
                borderRadius='20px'
                p='15px'>{
                actions.map(action => (
                    <MenuItem
                        key={action.name}
                        onClick={action.onClick}
                        transition='0.2s linear'
                        color={textColor}
                        _hover={textHover}
                        p='0px'
                        borderRadius='8px'
                        _active={{
                            bg: "transparent",
                        }}
                        _focus={{
                            bg: "transparent",
                        }}
                        mb='10px'>
                        <Flex align='center'>
                            <Icon as={action.icon} h='16px' w='16px' me='8px'/>
                            <Text fontSize='sm' fontWeight='400'>
                                {action.name}
                            </Text>
                        </Flex>
                    </MenuItem>
                ))
            }
            </MenuList>
        </Menu>
    );
}