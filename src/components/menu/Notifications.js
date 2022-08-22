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
import React, {useContext} from "react";
import {GuildContext} from "../../contexts/guild/GuildContext";
import {useQuery} from "react-query";
import {getNotifications} from "../../api/internal";
import {MdNotificationsNone} from "react-icons/md";
import {Locale} from "../../utils/Language";
import {QueryHolderSkeleton} from "../../contexts/components/AsyncContext";
import {NotificationItem} from "./NotificationItem";
import {useCardBg, useTextColor} from "../../utils/colors";

export function Notifications() {
    const navbarIcon = useColorModeValue("gray.400", "white");
    const textColor = useTextColor();
    const menuBg = useCardBg()
    const shadow = useColorModeValue(
        "14px 17px 40px 4px rgba(112, 144, 176, 0.18)",
        "14px 17px 40px 4px rgba(112, 144, 176, 0.06)"
    );
    const {isOpen, onOpen, onClose} = useDisclosure()

    const {id: serverId} = useContext(GuildContext)
    const query = useQuery(
        ["notifications", serverId],
        () => getNotifications(serverId),
        {
            enabled: isOpen
        },
    )

    return <Menu isOpen={isOpen} onClose={onClose}>
        <MenuButton p="0px" onClick={onOpen}>
            <Icon
                as={MdNotificationsNone}
                color={navbarIcon}
            />
        </MenuButton>
        <MenuList
            boxShadow={shadow}
            p="20px"
            borderRadius="20px"
            bg={menuBg}
            border="none"
            mt="22px"
            me={{base: "30px", md: "unset"}}
            minW={{base: "80vw", md: "400px", xl: "450px"}}
            maxW={{base: "360px", md: "unset"}}
        >
            <Text w="100%" mb="20px" fontSize="md" fontWeight="600" color={textColor}>
                <Locale zh="通知" en="Notifications" />
            </Text>
            <Flex direction="column" gap={3}>
                <QueryHolderSkeleton query={query} height="100px" count={2}>{() =>
                    query.data.map((item, key) => (
                        <MenuItem key={key} borderRadius="8px" p={0}>
                            <NotificationItem {...item} />
                        </MenuItem>
                    ))}
                </QueryHolderSkeleton>
            </Flex>
        </MenuList>
    </Menu>
}