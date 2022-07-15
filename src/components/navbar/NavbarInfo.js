import NavAlert from "./NavAlert";
import React, {useContext} from "react";
import {PageInfoContext} from "contexts/PageInfoContext";
import {Button, Icon, IconButton, useColorMode, useColorModeValue} from "@chakra-ui/react";
import {IoMdMoon, IoMdSunny} from "react-icons/io";
import {useNavigate} from "react-router-dom";
import {BiArrowBack} from "react-icons/bi";

export default function NavbarInfo() {
    const navigate = useNavigate()
    const {colorMode, toggleColorMode} = useColorMode()
    const {info} = useContext(PageInfoContext)

    const navbarIcon = useColorModeValue("gray.400", "white");

    return <NavAlert rootText="信息頁面" childText={info.name} clip={false}>
        <Button
            leftIcon={<BiArrowBack/>}
            onClick={() => navigate(-1)}>
            返回另一個頁面
        </Button>
        <IconButton
            ml="auto"
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
    </NavAlert>
}