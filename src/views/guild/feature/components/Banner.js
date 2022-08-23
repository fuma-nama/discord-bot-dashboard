import React, {useContext} from "react";

// Chakra imports
import {Button} from "@chakra-ui/react";
import {useFeatureInfo} from "contexts/FeatureDetailContext";
import Banner from "components/card/Banner";
// Assets
import banner from "assets/img/common/FeatureBanner.png";
import {GuildContext} from "contexts/guild/GuildContext";
import {BiArrowBack} from "react-icons/bi";
import {Link} from "react-router-dom";
import {Locale} from "utils/Language";

export default function BannerWrapper({localeName}) {
    const {description} = useFeatureInfo()

    return (
        <Banner
            image={banner}
            title={localeName}
            description={description}
        >
            <BackButton/>
        </Banner>
    );
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
