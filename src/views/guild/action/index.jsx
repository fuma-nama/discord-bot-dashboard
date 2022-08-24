import React, {useContext} from "react";

// Custom components
import ActionsList from "./components/ActionsList";
import {usePageInfo} from "contexts/PageInfoContext";
import {ActionsDataContext, ActionsDataProvider} from "../../../contexts/actions/ActionsDataContext";
import {DataList} from "components/card/data/DataCard";
import {config} from "config/config";
import {Locale, useLocale} from "utils/Language";
import {useLayoutUpdate} from "contexts/layouts/LayoutContext";
import {BannerButton} from "components/card/Banner";

import {BiPlay} from "react-icons/bi";

export default function ActionsBoard() {
    const locale = useLocale()

    useLayoutUpdate({
        banner: {
            title: locale({
                zh: "通過儀表板直接管理您的服務器",
                en: "Manage Your server Online"
            }),
            description: locale({
                zh: "讓您的服務器充滿活力，活躍起來!",
                en: "Grow your server up and Let it come alive!"
            }),
            buttons: [config.tutorialUrl && <TutorialButton />]
        },
        dataList: config.data.actions && <ActionsDataProvider>
            <ActionsData />
        </ActionsDataProvider>
    })

    usePageInfo(
        locale({zh: "動作面板", en: "Action Panel"})
    );

    return <ActionsList />
}

function TutorialButton() {
    return <BannerButton
        leftIcon={<BiPlay size={20} />}
        url={config.tutorialUrl}
    >
        <Locale zh="觀看教程" en="Watch Tutorial" />
    </BannerButton>
}

function ActionsData() {
    const data = useContext(ActionsDataContext)

    return <DataList items={config.data.actions(data)}/>
}