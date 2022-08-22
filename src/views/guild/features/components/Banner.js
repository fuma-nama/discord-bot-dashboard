import React from "react";

// Chakra imports
import {Link, Text} from "@chakra-ui/react";

// Assets
import banner from "assets/img/common/FeatureBanner.png";

import Banner, {BannerButton} from "components/card/Banner";
import {Locale, useLocale} from "utils/Language";
import {config} from "config/config";

export default function BannerWrapper() {
    const locale = useLocale()

    // Chakra Color Mode
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
            <BannerButton>
                <Locale zh="發現它們" en="Discover" />
            </BannerButton>
            <Link>
                <Text color="white" fontSize="sm" fontWeight="500">
                    <Locale zh="觀看教程" en="Watch Tutorial" />
                </Text>
            </Link>
        </Banner>
  );
}
