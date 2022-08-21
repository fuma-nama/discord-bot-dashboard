// Chakra Imports
import {
    Avatar,
    HStack,
    IconButton,
    Menu,
    MenuButton,
    useColorMode,
    useColorModeValue,
    useDisclosure,
} from "@chakra-ui/react";
import UserOptionMenu from "components/menu/UserOptionMenu";
// Custom Components
import {SearchBar} from "components/navbar/searchBar/SearchBar";
import {SidebarResponsive} from "components/sidebar/Sidebar";
import React, {useContext} from "react";
// Assets
import {IoMdMoon, IoMdSunny} from "react-icons/io";
import {UserDataContext} from "contexts/UserDataContext";
import {PageInfoContext} from "contexts/PageInfoContext";
import {FiSettings} from "react-icons/fi";
//api
import {avatarToUrl} from "api/discord/DiscordApi";
import {SettingsModal} from "../modal/SettingsModal";
import {Notifications} from "../menu/Notifications";

function Toggle(props) {
    const navbarIcon = useColorModeValue("gray.400", "white");

    return <IconButton
        w="fit-content"
        minW={0}
        color={navbarIcon}
        variant="no-hover"
        {...props}
    />
}

export default function HeaderLinks() {
    const {colorMode, toggleColorMode} = useColorMode();
    const {routes} = useContext(PageInfoContext);

    return (
        <>
            <SearchBar
                mb={{base: "10px", md: "unset"}}
                me="10px"
                borderRadius="30px"
            />
            <SidebarResponsive routes={routes}/>
            <HStack spacing={4}>
                <Notifications />
                <Toggle
                    onClick={toggleColorMode}
                    icon={colorMode === "light" ? <IoMdMoon /> : <IoMdSunny />}
                    aria-label="Dark Mode"
                />
                <SettingsMenu />
                <UserMenu/>
            </HStack>
        </>
    );
}

function SettingsMenu() {
    const navbarIcon = useColorModeValue("gray.400", "white");
    const {isOpen, onClose, onOpen} = useDisclosure()

    return <>
        <Toggle
            color={navbarIcon}
            aria-label="Settings"
            onClick={onOpen}
            icon={<FiSettings />}
        />
        <SettingsModal isOpen={isOpen} onClose={onClose} />
    </>
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