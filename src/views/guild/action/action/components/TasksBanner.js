import React, {useContext} from "react";

import ActionBanner from "../../components/ActionBanner";
import {GuildContext} from "contexts/guild/GuildContext";
import {Button} from "@chakra-ui/react";
import {Link, useParams} from "react-router-dom";
import {SmallAddIcon} from "@chakra-ui/icons";
import {BiArrowBack} from "react-icons/bi";

export default function TasksBanner() {

  return (
      <ActionBanner>
        <BackButton />
        <CreateButton />
      </ActionBanner>
  );
}

function CreateButton() {
  const { id: guild } = useContext(GuildContext);
  const {action} = useParams();

  return <Link to={`/guild/${guild}/action/${action}/add`}>
    <Button
        _hover={{ bg: "brand.400" }}
        bg="brand.400"
        color="white"
        py="20px"
        minH="full"
        leftIcon={<SmallAddIcon />}
    >
      創建新任務
    </Button>
  </Link>
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
