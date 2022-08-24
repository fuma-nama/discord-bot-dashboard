import React, {useContext} from "react";

// Chakra imports
import {Button} from "@chakra-ui/react";
import {useFeatureInfo} from "contexts/FeatureDetailContext";

// Assets
import {GuildContext} from "contexts/guild/GuildContext";
import {BiArrowBack} from "react-icons/bi";
import {Link} from "react-router-dom";
import {Locale} from "utils/Language";
import {useLayoutUpdate} from "contexts/layouts/LayoutContext";

export default function useBanner(localeName) {
    const {description} = useFeatureInfo()

    useLayoutUpdate({
        banner: {
            title: localeName,
            description,
            buttons: [<BackButton />]
        }
    })
}

function BackButton() {
  const { id: serverId } = useContext(GuildContext);

  return (
    <Link to={`/guild/${serverId}/features`}>
      <Button
          variant="white"
        leftIcon={<BiArrowBack />}
      >
          <Locale zh="返回控制面板" en="Back to Control Panel" />
      </Button>
    </Link>
  );
}
