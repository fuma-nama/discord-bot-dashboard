import {Box, Fade, Flex, Grid} from "@chakra-ui/react";
import React, {Fragment, useContext} from "react";
import {Outlet} from "react-router-dom"
import {LayoutContext, LayoutProvider} from "../../contexts/layouts/LayoutContext";
import Banner from "../../components/card/Banner";
import bannerImg from "assets/img/common/FeatureBanner.png";
import {useLocale} from "../../utils/Language";
import {usePageInfo} from "../../contexts/PageInfoContext";

export function FeaturesLayout() {
    return <LayoutProvider>
        <Box pt={{ base: "180px", md: "80px", xl: "80px" }}>
            <Content />
        </Box>
    </LayoutProvider>
}

function BannerWrapper({banner}) {
    if (banner == null) return <></>

    return <Fade in={true}>
        <Banner
            image={bannerImg}
            {...banner}
        >
            {banner.buttons.map((b, i) =>
                <Fragment key={i}>{b}</Fragment>)
            }
        </Banner>
    </Fade>
}

function Content() {
    const {banner, dataList} = useContext(LayoutContext)
    const locale = useLocale()

    usePageInfo(
        locale({zh: "功能控制面板", en: "Features"})
    )

    if (dataList) {

        return (
            <Grid
                mb="20px"
                gridTemplateColumns={{ xl: "repeat(3, 1fr)", "2xl": "1fr 0.46fr" }}
                gap={{ base: "20px", xl: "20px" }}
                display={{ base: "block", xl: "grid" }}
            >
                <Flex
                    flexDirection="column"
                    mb="10"
                    gridArea={{ xl: "1 / 1 / 2 / 3", "2xl": "1 / 1 / 2 / 2" }}
                >
                    <BannerWrapper banner={banner} />
                    <Outlet />
                </Flex>
                <Flex
                    flexDirection="column"
                    gridArea={{ xl: "1 / 3 / 2 / 4", "2xl": "1 / 2 / 2 / 3" }}
                >
                    {dataList}
                </Flex>
            </Grid>
        );
    } else {
        return <Flex
            flexDirection="column"
            mb="10"
        >
            <BannerWrapper banner={banner} />
            <Outlet />
        </Flex>
    }
}