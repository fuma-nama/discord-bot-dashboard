import React, {useContext} from "react";

import {GuildContext} from "contexts/guild/GuildContext";
import {Button} from "@chakra-ui/react";
import {Link} from "react-router-dom";
import {BiArrowBack} from "react-icons/bi";
import CreateButton from "./CreateButton";
import {Locale} from "utils/Language";
import {useActionBanner} from "../../components/ActionBanner";

export function useBanner() {
    useActionBanner([<BackButton />, <CreateButton />])
}

function BackButton() {
    const { id: serverId } = useContext(GuildContext);

    return (
        <Link to={`/guild/${serverId}/actions`}>
            <Button
                variant="white"
                leftIcon={<BiArrowBack />}
            >
                <Locale zh="返回動作面板" en="Back" />
            </Button>
        </Link>
    );
}