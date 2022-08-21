import React, {useContext, useMemo} from "react";

import {Box} from "@chakra-ui/react";

import {usePageInfo} from "contexts/PageInfoContext";
import {SettingsContext, SettingsProvider} from "../../../contexts/guild/GuildSettingsContext";
import {GuildContext} from "contexts/guild/GuildContext";
import {ConfigGrid} from "components/fields/ConfigPanel";
import {updateSettingsOptions} from "api/internal";
import {config} from "config/config";
import {useQueryClient} from "react-query";
import {useLocale} from "utils/Language";

export default function SettingsPanel() {
    const locale = useLocale()
    usePageInfo(
        locale({zh: "服務器設置", en: "Server Settings"})
    )

    return (
        <SettingsProvider>
            <Box pt={{base: "180px", md: "80px", xl: "80px"}}>
                <SettingsConfigPanel />
            </Box>
    </SettingsProvider>
  );
}

function SettingsConfigPanel() {
    const settings = useContext(SettingsContext);
    const {id: serverId} = useContext(GuildContext);
    const client = useQueryClient()

    const onSave = (changes) => updateSettingsOptions(serverId, changes)

    const onSaved = data => client.setQueryData(["settings", serverId], {
        ...settings,
        values: data
    })

    const options = useMemo(
        () => config.settings(settings.values),
        [settings.values]
    )

    return (
        <ConfigGrid options={options} onSave={onSave} onSaved={onSaved} />
    )
}