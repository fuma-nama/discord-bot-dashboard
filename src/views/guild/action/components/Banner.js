import React from "react";

// Chakra imports
import {Button} from "@chakra-ui/react";
import Banner from "components/card/Banner";

// Assets
import banner from "assets/img/common/ActionBanner.png";
import {Locale, useLocale} from "utils/Language";

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
            <Button
                variant="white"
                me="38px"
            >
                <Locale zh="觀看教程" en="Watch Tutorial" />
            </Button>
        </Banner>
    );
}
