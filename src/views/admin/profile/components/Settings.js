// Chakra imports
import {Button, Stack, Text, useColorMode, useColorModeValue} from "@chakra-ui/react";
import Card from "components/card/Card.js";
// Custom components
import SwitchField from "components/fields/SwitchField";
import {useLogout} from "../../../../api/yeecord";
import {useContext} from "react";
import {Link} from "react-router-dom";
//Context
import {SettingsContext} from "contexts/SettingsContext";

export default function Settings(props) {
    const {...rest} = props;
    const {colorMode, setColorMode} = useColorMode();
    const {setSettings, devMode, fixedWidth} = useContext(SettingsContext)

    const logout = useLogout()

    // Chakra Color Mode
    const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
    return (
        <Card mb="20px" {...rest}>
            <Text
                w="100%"
                color={textColorPrimary}
                fontWeight="bold"
                fontSize="2xl"
                mb="30px"
            >
                設置
            </Text>
            <SwitchField
                reversed={true}
                fontSize="sm"
                mb="20px"
                id="1"
                label="固定屏幕最小寬度"
                isChecked={fixedWidth}
                onChange={e =>
                    setSettings({
                        fixedWidth: e.target.checked
                    })
                }
            />
            <SwitchField
                reversed={true}
                fontSize="sm"
                mb="20px"
                id="2"
                label="開發者模式"
                isChecked={devMode}
                onChange={e =>
                    setSettings({
                        devMode: e.target.checked
                    })
                }
            />
            <SwitchField
                reversed={true}
                fontSize="sm"
                mb="20px"
                id="3"
                label="黑暗主題"
                isChecked={colorMode === "dark"}
                onChange={({target}) => {
                    setColorMode(target.checked ? "dark" : "light");
                }}
            />
            <Stack mt="auto" gap={3}>

                {devMode && <Link to="/info/dino">
                    <Button
                        w="full"
                        size="lg"
                    >
                        Dino
                    </Button>
                </Link>
                }
                <Button
                    size="lg"
                    variant="brand"
                    isLoading={logout.isLoading}
                    onClick={logout.mutate}
                >
                    登出帳號
                </Button>
            </Stack>
        </Card>
    );
}
