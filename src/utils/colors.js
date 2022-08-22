import {useColorModeValue, useToken} from "@chakra-ui/react";
import hexToRgba from "hex-to-rgba";

export function useAlertBg() {
    const [secondaryGray300, navy800] = useToken("colors", ["secondaryGray.300", "navy.900"])

    return useColorModeValue(
        hexToRgba(secondaryGray300, 0.5),
        hexToRgba(navy800, 0.5)
    );
}

export function useBrandBg() {
    return useColorModeValue("brand.500", "brand.400");
}

export function useTextColor() {
    return useColorModeValue("navy.700", "white");
}

export function useDetailColor() {
    return useColorModeValue("secondaryGray.900", "secondaryGray.600");
}

export function useNoteColor() {
    return useColorModeValue("secondaryGray.700", "secondaryGray.600");
}

export function useSuccessBg() {
    return useColorModeValue("green.300", "green.500");
}

export function useIconColor() {
    return useColorModeValue("brand.500", "white");
}

export function useCardBg() {
    return useColorModeValue("white", "navy.800");
}