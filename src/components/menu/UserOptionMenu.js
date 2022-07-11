// Chakra Imports
import {
    Flex,
    MenuItem,
    MenuList,
    Text,
    useColorModeValue,
} from "@chakra-ui/react";
import {useContext} from "react";
import {AccountContext, logout} from "../../contexts/AccountContext";
import {UserDataContext} from "contexts/UserDataContext";
import {Link} from "react-router-dom";

export default function UserOptionMenu() {
    let menuBg = useColorModeValue("white", "navy.800");
    const textColor = useColorModeValue("secondaryGray.900", "white");
    const shadow = useColorModeValue(
        "14px 17px 40px 4px rgba(112, 144, 176, 0.18)",
        "14px 17px 40px 4px rgba(112, 144, 176, 0.06)"
    );
    const borderColor = useColorModeValue("#E6ECFA", "rgba(135, 140, 189, 0.3)");

    const accountCtx = useContext(AccountContext);
    const infoCtx = useContext(UserDataContext);

    return (
        <MenuList
            boxShadow={shadow}
            p="0px"
            mt="10px"
            borderRadius="20px"
            bg={menuBg}
            border="none"
        >
            <Flex w="100%" mb="0px">
                <Text
                    ps="20px"
                    pt="16px"
                    pb="10px"
                    w="100%"
                    borderBottom="1px solid"
                    borderColor={borderColor}
                    fontSize="sm"
                    fontWeight="700"
                    color={textColor}
                >
                    👋&nbsp; 歡迎, {infoCtx.user.username}
                </Text>
            </Flex>
            <Flex flexDirection="column" p="10px">
                <Link to="/admin">
                    <MenuItem borderRadius="8px" px="14px">
                        個人信息
                    </MenuItem>
                </Link>
                <MenuItem
                    color="red.400"
                    borderRadius="8px"
                    px="14px"
                    onClick={() => logout(accountCtx)}
                >
                    <Text fontSize="sm">登出</Text>
                </MenuItem>
            </Flex>
        </MenuList>
    );
}
