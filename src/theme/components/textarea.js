import {mode} from "@chakra-ui/theme-tools";

export const textareaStyles = {
    components: {
        Textarea: {
            baseStyle: {
                    fontWeight: 400,
                    borderRadius: "8px",
            },

            variants: {
                main: (props) => ({
                    bg: mode("transparent", "navy.800")(props),
                    border: "1px solid",
                    color: mode("secondaryGray.900", "white")(props),
                    borderColor: mode("secondaryGray.100", "whiteAlpha.100")(props),
                    borderRadius: "16px",
                    fontSize: "sm",
                    p: "20px",
                    _placeholder: {color: "secondaryGray.600"},
                }),
                auth: () => ({
                    bg: "white",
                    border: "1px solid",
                    borderColor: "secondaryGray.100",
                    borderRadius: "16px",
                    _placeholder: {color: "secondaryGray.600"},
                }),
                authSecondary: () => ({
                    bg: "white",
                    border: "1px solid",

                    borderColor: "secondaryGray.100",
                    borderRadius: "16px",
                    _placeholder: {color: "secondaryGray.600"},
                }),
                search: (props) => ({
                    border: "none",
                    py: "11px",
                    borderRadius: "inherit",
                    _placeholder: {color: "secondaryGray.600"},
                }),
            },
        },
    },
};
