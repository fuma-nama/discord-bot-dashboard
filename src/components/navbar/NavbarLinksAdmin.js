// Chakra Imports
import {
    Avatar,
    Flex,
    Icon,
    IconButton,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Text,
    useColorMode,
    useColorModeValue,
    useDisclosure,
} from "@chakra-ui/react";
import UserOptionMenu from "components/menu/UserOptionMenu";
// Custom Components
import {NotificationItem} from "components/menu/NotificationItem";
import {SearchBar} from "components/navbar/searchBar/SearchBar";
import {SidebarResponsive} from "components/sidebar/Sidebar";
import PropTypes from "prop-types";
import React, {useContext} from "react";
// Assets
import {MdNotificationsNone} from "react-icons/md";
import {IoMdMoon, IoMdSunny} from "react-icons/io";
import {UserDataContext} from "contexts/UserDataContext";
import {PageInfoContext} from "contexts/PageInfoContext";
import {useQuery} from "react-query";
import {getNotifications} from "api/yeecord";
import {GuildContext} from "contexts/guild/GuildContext";
import {QueryHolderSkeleton} from "contexts/components/AsyncContext";
//api
import {avatarToUrl} from "api/discord/DiscordApi";

export default function HeaderLinks() {
    const {colorMode, toggleColorMode} = useColorMode();
    const {routes} = useContext(PageInfoContext);

    // Chakra Color Mode
    const navbarIcon = useColorModeValue("gray.400", "white");

    return (
        <>
            <SearchBar
                mb={{base: "10px", md: "unset"}}
                me="10px"
                borderRadius="30px"
            />
            <SidebarResponsive routes={routes}/>
            <Notifications/>
            <IconButton
                variant="no-hover"
                onClick={toggleColorMode}
                icon={<Icon
                    me="10px"
                    h="18px"
                    w="18px"
                    color={navbarIcon}
                    as={colorMode === "light" ? IoMdMoon : IoMdSunny}
                />}
            />
            <UserMenu/>
        </>
    );
}

function UserMenu() {
    const {username, avatar, id} = useContext(UserDataContext);

    return (
        <Menu>
            <MenuButton p="0px">
                <Avatar
                    _hover={{cursor: "pointer"}}
                    color="white"
                    name={username}
                    src={avatarToUrl(id, avatar)}
                    bg="#11047A"
                    size="sm"
                    w="40px"
                    h="40px"
                />
            </MenuButton>
            <UserOptionMenu/>
        </Menu>
    );
}

function Notifications() {
    const navbarIcon = useColorModeValue("gray.400", "white");
    const textColor = useColorModeValue("secondaryGray.900", "white");
    let menuBg = useColorModeValue("white", "navy.800");
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
                mt="6px"
                as={MdNotificationsNone}
                color={navbarIcon}
                w="18px"
                h="18px"
                me="10px"
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
                通知
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

HeaderLinks.propTypes = {
    variant: PropTypes.string,
    fixed: PropTypes.bool,
    secondary: PropTypes.bool,
    onOpen: PropTypes.func,
};
