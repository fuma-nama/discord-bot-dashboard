import React from "react";

// Chakra imports
import {Button} from "@chakra-ui/react";
import Banner from "components/card/Banner";

// Assets
import banner from "assets/img/common/ActionBanner.jpg";

export default function BannerWrapper() {
    // Chakra Color Mode
    return (
        <Banner
            image={banner}
            title="通過儀表板直接管理您的服務器"
            description="給你的服務器更多的Yee力，讓你的社區活躍起來!"
            clip={false}
        >
            <Button
                variant="white"
                me="38px"
            >
                觀看教程
            </Button>
        </Banner>
    );
}
