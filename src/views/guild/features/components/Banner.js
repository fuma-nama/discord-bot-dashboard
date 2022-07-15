import React from "react";

// Chakra imports
import {Link, Text} from "@chakra-ui/react";

// Assets
import banner from "assets/img/layout/NftBanner1.png";
import Banner, {BannerButton} from "components/card/Banner";

export default function BannerWrapper() {
    // Chakra Color Mode
    return (
        <Banner
            image={banner}
            title="發掘、學習、以及客製化Yeecord強大的功能"
            description="進入這個 YEE 世界。立即發現最新功能或開始使用 定制你自己的！"
        >
            <BannerButton>
                發現它們
            </BannerButton>
            <Link>
                <Text color="white" fontSize="sm" fontWeight="500">
                    觀看教程
                </Text>
            </Link>
        </Banner>
  );
}
