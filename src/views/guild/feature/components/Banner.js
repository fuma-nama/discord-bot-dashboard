import React, {useContext} from "react";

// Chakra imports
import {Button} from "@chakra-ui/react";
import {FeatureDetailContext} from "contexts/FeatureDetailContext";
import Banner from "components/card/Banner";
// Assets
import banner from "assets/img/layout/NftBanner1.png";
import {GuildContext} from "contexts/guild/GuildContext";
import {BiArrowBack} from "react-icons/bi";
import {Link} from "react-router-dom";

export default function BannerWrapper() {
    const {name, description} = useContext(FeatureDetailContext);

    return (
        <Banner
            image={banner}
            title={name}
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
        me="38px"
        leftIcon={<BiArrowBack />}
      >
        返回控制面板
      </Button>
    </Link>
  );
}
