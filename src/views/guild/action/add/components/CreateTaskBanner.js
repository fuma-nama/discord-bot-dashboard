import React, {useContext} from "react";

// Chakra imports
import {Button} from "@chakra-ui/react";
// Assets
import {GuildContext} from "contexts/guild/GuildContext";
import {BiArrowBack} from "react-icons/bi";

import {Link, useParams} from "react-router-dom";
import ActionBanner from "../../components/ActionBanner";

export default function CreateTaskBanner() {

  return (
      <ActionBanner>
        <BackButton />
      </ActionBanner>
  )
}

function BackButton() {
  const {action} = useParams()
  const {id: guild} = useContext(GuildContext)

  const actionUrl = `/guild/${guild}/action/${action}`

  return (
    <Link to={actionUrl}>
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
        返回動作
      </Button>
    </Link>
  );
}
