// Chakra imports
import {Button, Stack, Text, useColorMode} from "@chakra-ui/react";
import Card from "components/card/Card.js";
// Custom components
import SwitchField from "components/fields/impl/SwitchField";
import {useLogout} from "../../api/internal";
import {useContext} from "react";
//Context
import {SettingsContext} from "contexts/SettingsContext";
import {SelectField} from "components/fields/SelectField";
import {Languages, Locale, useLocale} from "utils/Language";
import {useTextColor} from "../../utils/colors";

export default function Settings({...rest}) {
    const {colorMode, setColorMode} = useColorMode();
    const {updateSettings, devMode, fixedWidth, language} = useContext(SettingsContext)
    const locale = useLocale()
    const logout = useLogout()

    // Chakra Color Mode
    const textColorPrimary = useTextColor()

    const Switch = ({label, isChecked, onChange, ...props}) => {
        return <SwitchField
            reversed={true}
            fontSize="sm"
            mb="20px"
            label={locale(label)}
            isChecked={isChecked}
            onChange={e => onChange(e.target.checked)}
            {...props}
        />
    }

    return (
        <Card mb="20px" {...rest}>
            <Text
                w="100%"
                color={textColorPrimary}
                fontWeight="bold"
                fontSize="2xl"
                mb="30px">
                <Locale zh="用戶設置" en="Settings" />
            </Text>
            <Switch
                label={{zh: "固定屏幕最小寬度", en: "Fixed Screen Min-Width"}}
                isChecked={fixedWidth}
                onChange={v =>
                    updateSettings({
                        fixedWidth: v
                    })
                }
            />
            <Switch
                label={{zh: "開發者模式", en: "Developer Mode"}}
                isChecked={devMode}
                onChange={e =>
                    updateSettings({
                        devMode: e
                    })
                }
            />
            <Switch
                label={{zh: "黑暗主題", en: "Dark Mode"}}
                isChecked={colorMode === "dark"}
                onChange={v => {
                    setColorMode(v ? "dark" : "light");
                }}
            />
            <SelectField value={language} options={Languages} onChange={lang =>
                updateSettings({
                    language: lang
                })
            }/>
            <Stack mt="auto" gap={3}>
                <Button
                    mt={10}
                    size="lg"
                    variant="brand"
                    isLoading={logout.isLoading}
                    onClick={logout.mutate}
                >
                    <Locale en="Sign out" zh="登出帳號" />
                </Button>
            </Stack>
        </Card>
    );
}
