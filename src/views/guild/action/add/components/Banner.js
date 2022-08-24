import React, {useContext} from "react";

// Chakra imports
import {Button} from "@chakra-ui/react";
// Assets
import {GuildContext} from "contexts/guild/GuildContext";
import {BiArrowBack} from "react-icons/bi";

import {Link, useParams} from "react-router-dom";
import {useActionBanner} from "../../components/ActionBanner";
import {Locale} from "../../../../../utils/Language";

export function useBanner() {
    useActionBanner([<BackButton />])
}

function BackButton() {
  const {action} = useParams()
  const {id: guild} = useContext(GuildContext)

  const actionUrl = `/guild/${guild}/actions/${action}`

  return (
    <Link to={actionUrl}>
      <Button
          variant="white"
        leftIcon={<BiArrowBack />}
      >
          <Locale zh="返回動作" en="Back" />
      </Button>
    </Link>
  );
}
