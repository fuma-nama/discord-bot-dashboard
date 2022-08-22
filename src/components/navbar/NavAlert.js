import React from "react";
import {Box, Breadcrumb, BreadcrumbItem, Flex, Text, useColorModeValue} from "@chakra-ui/react";
import {useAlertBg, useCardBg, useDetailColor, useTextColor} from "../../utils/colors";

export default function NavAlert({rootText, childText, children, clip = true}) {
    // Here are all the props that may change depending on navbar's type or state.(secondary, variant, scrolled)
    let mainText = useTextColor();
    let secondaryText = useDetailColor();
    let navbarPosition = "fixed";
    let navbarFilter = "none";
    let navbarBackdrop = "blur(20px)";
    let navbarShadow = "none";
    const navbarBg = useAlertBg()
    let navbarBorder = "transparent";
    const menuBg = useCardBg();
    const shadow = useColorModeValue(
        "14px 17px 40px 4px rgba(112, 144, 176, 0.18)",
        "14px 17px 40px 4px rgba(112, 144, 176, 0.1)"
    );
    const margin = "5vw"
    const clipMargin = {base: "12px", md: "30px", lg: "30px", xl: "30px"}

    return (
        <Box
            zIndex={10}
            position={navbarPosition}
            boxShadow={navbarShadow}
            bg={navbarBg}
            borderColor={navbarBorder}
            filter={navbarFilter}
            backdropFilter={navbarBackdrop}
            backgroundPosition="center"
            backgroundSize="cover"
            borderRadius="16px"
            borderWidth="1.5px"
            borderStyle="solid"
            transitionDelay="0s, 0s, 0s, 0s"
            transitionDuration=" 0.25s, 0.25s, 0.25s, 0s"
            transition-property="box-shadow, background-color, filter, border"
            transitionTimingFunction="linear, linear, linear, linear"
            alignItems={{xl: "center"}}
            minH="75px"
            justifyContent={{xl: "center"}}
            lineHeight="25.6px"
            mx="auto"
            pb="8px"
            px={{
                sm: "15px",
                md: "10px",
            }}
            ps={{
                xl: "12px",
            }}
            pt="8px"
            left={clip ? "unset" : margin}
            right={clip ? clipMargin : margin}
            top={{base: "12px", md: "16px", xl: "18px"}}
            w={clip && {
                base: "calc(100vw - 6%)",
                md: "calc(100vw - 8%)",
                lg: "calc(100vw - 6%)",
                xl: "calc(100vw - 350px)",
                "2xl": "calc(100vw - 365px)",
            }}
        >
            <Flex
                w="100%"
                flexDirection={{
                    base: "column",
                    md: "row",
                }}
                alignItems={{xl: "center"}}
            >
                <Box mb={{sm: "8px", md: "0px"}}>
                    <Breadcrumb>
                        <BreadcrumbItem color={secondaryText} fontSize="sm" mb="5px">
                            <Text color={secondaryText}>{rootText}</Text>
                        </BreadcrumbItem>
                        {
                            Array.isArray(childText)?
                                childText.map((text, key) =>
                                    <BreadcrumbItem key={key} color={secondaryText} fontSize="sm">
                                        <Text color={secondaryText}>{text}</Text>
                                    </BreadcrumbItem>
                                ) :
                                <BreadcrumbItem color={secondaryText} fontSize="sm">
                                    <Text color={secondaryText}>{childText}</Text>
                                </BreadcrumbItem>
                        }
                    </Breadcrumb>
                    <Text
                        color={mainText}
                        fontWeight="bold"
                        fontSize="34px"
                    >
                        {Array.isArray(childText)? childText[childText.length - 1] : childText}
                    </Text>
                </Box>
                <Flex
                    ms="auto"
                    w={{sm: "100%", md: "auto"}}
                    alignItems="center"
                    flexDirection="row"
                    bg={menuBg}
                    p="10px"
                    borderRadius="30px"
                    boxShadow={shadow}
                >
                    {children}
                </Flex>
            </Flex>
        </Box>
    );
}