import {Button} from "@chakra-ui/react";
import {SmallAddIcon} from "@chakra-ui/icons";
import {Link, useParams} from "react-router-dom";
import React, {useContext} from "react";
import {GuildContext} from "contexts/guild/GuildContext";
import {Locale} from "utils/Language";

export default function CreateButton() {
    const { id: guild } = useContext(GuildContext);
    const {action} = useParams();

    return <Link to={`/guild/${guild}/actions/${action}/add`}>
        <Button
            _hover={{ bg: "brand.400" }}
            bg="brand.400"
            color="white"
            leftIcon={<SmallAddIcon />}
        >
            <Locale zh="創建新任務" en="New Task" />
        </Button>
    </Link>
}