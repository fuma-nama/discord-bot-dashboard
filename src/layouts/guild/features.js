import {Box, Flex, Grid} from "@chakra-ui/react";
import React, {useContext} from "react";
import {Outlet} from "react-router-dom"
import {FeaturesLayoutContext, FeaturesLayoutProvider} from "../../contexts/layouts/FeaturesLayoutContext";
import Banner from "../../components/card/Banner";
import bannerImg from "assets/img/common/FeatureBanner.png";

export function FeaturesLayout() {
    return <FeaturesLayoutProvider>
        <Box pt={{ base: "180px", md: "80px", xl: "80px" }}>
            <Content />
        </Box>
    </FeaturesLayoutProvider>
}

function BannerWrapper({banner}) {
    if (banner == null) return <></>

    return <Banner
        image={bannerImg}
        {...banner}
    >
        {banner.buttons}
    </Banner>
}

function Content() {
    const {banner, dataList} = useContext(FeaturesLayoutContext)

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