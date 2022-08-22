import {useColorModeValue, useToken} from "@chakra-ui/react";
import hexToRgba from "hex-to-rgba";

export function useAlertBg() {
    const [secondaryGray300, navy800] = useToken("colors", ["secondaryGray.300", "navy.900"])

    return useColorModeValue(
        hexToRgba(secondaryGray300, 0.5),
        hexToRgba(navy800, 0.5)
    );
}