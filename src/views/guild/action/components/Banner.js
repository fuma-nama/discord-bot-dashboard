import React from "react";

import Banner, {BannerButton} from "components/card/Banner";
import {Locale, useLocale} from "utils/Language";
import {config} from "config/config";

// Assets
import banner from "assets/img/common/ActionBanner.png";
import {BiPlay} from "react-icons/bi";


export default function BannerWrapper() {
    const locale = useLocale()

    // Chakra Color Mode
    return (
        <Banner
            image={banner}
            title={locale({
                zh: "通過儀表板直接管理您的服務器",
                en: "Manage Your server Online"
            })}
            description={locale({
                zh: "讓您的服務器充滿活力，活躍起來!",
                en: "Grow your server up and Let it come alive!"
            })}
            clip={false}
        >
            {
                config.tutorialUrl && <BannerButton
                    leftIcon={<BiPlay size={20} />}
                    url={config.tutorialUrl}
                >
                    <Locale zh="觀看教程" en="Watch Tutorial" />
                </BannerButton>
            }
        </Banner>
    );
}
