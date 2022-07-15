import {Box, Image, useColorModeValue} from "@chakra-ui/react";
import React from "react";
import Footer from "components/footer/FooterAdmin";
import CreditsBoard from "views/info/Credits";
import NavbarInfo from "components/navbar/NavbarInfo";
import {PageInfoProvider} from "contexts/PageInfoContext";
import Banner from "assets/img/info/credits/Banner.png"
import LightBanner from "assets/img/info/credits/LightBanner.jpg"

export default function Credits() {
    document.documentElement.dir = "ltr";
    const BannerImage = useColorModeValue(LightBanner, Banner)
    const opacity = useColorModeValue(0.8, 1)


    return (
        <PageInfoProvider>
            <Box w="full" position="absolute" maxH="80rem" top={0} left={0} overflowX="hidden">
                <Image w="full" minW="50rem" src={BannerImage} opacity={opacity}/>
            </Box>
            <Box
                height="100%"
                position="relative"
                overflow="auto"
                px={{md: "80px", xl: "120px"}}
                pt="50px"
            >
                <NavbarInfo/>
                <Box
                    minHeight="100vh"
                    maxWidth="100%"
                    mb="10rem"
                >
                    <CreditsBoard/>
                </Box>
                <Footer/>
            </Box>
        </PageInfoProvider>
    );
}