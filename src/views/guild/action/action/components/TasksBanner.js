import React, {useContext} from "react";

import ActionBanner from "../../components/ActionBanner";
import {GuildContext} from "contexts/guild/GuildContext";
import {Button} from "@chakra-ui/react";
import {Link} from "react-router-dom";
import {BiArrowBack} from "react-icons/bi";
import CreateButton from "./CreateButton";

export default function TasksBanner() {

  return (
      <ActionBanner>
        <BackButton />
        <CreateButton />
      </ActionBanner>
  );
}

function BackButton() {
  const { id: serverId } = useContext(GuildContext);

  return (
    <Link to={`/guild/${serverId}/actions`}>
      <Button
        bg="white"
        color="black"
        _hover={{ bg: "whiteAlpha.900" }}
        _active={{ bg: "white" }}
        _focus={{ bg: "white" }}
        fontWeight="500"
        fontSize="14px"
        py="20px"
        minH="full"
        leftIcon={<BiArrowBack />}
      >
        返回動作面板
      </Button>
    </Link>
  );
}
