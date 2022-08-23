import React from "react";

// Assets
import banner from "assets/img/common/FeatureBanner.png";

import Banner, {BannerButton} from "components/card/Banner";
import {Locale, useLocale} from "utils/Language";
import {config} from "config/config";
import {FaTripadvisor} from "react-icons/fa";

export default function BannerWrapper() {
    const locale = useLocale()

    return (
        <Banner
            image={banner}
            title={locale({
                zh: "在線管理所有功能",
                en: `Features Panel`
            })}
            description={locale({
                zh: `發掘、學習、以及客製化${config.name}強大的功能`,
                en: `Discover, Learn, And Customize the Powerful Features of ${config.name}`
            })}
        >
            {
                config.tutorialUrl && <BannerButton
                    leftIcon={<FaTripadvisor size={20} />}
                    url={config.tutorialUrl}
                >
                    <Locale zh="發現它們" en="Discover" />
                </BannerButton>
            }
        </Banner>
  );
}
