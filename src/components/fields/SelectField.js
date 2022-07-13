import {Select as BaseSelect} from "chakra-react-select";
import {useColorModeValue} from "@chakra-ui/react";

export function SelectField(props) {
    const brandColor = useColorModeValue("secondaryGray.300", "brand.400");
    const bgColor = useColorModeValue("secondaryGray.300", "navy.900")

    return <BaseSelect
        chakraStyles={{
            dropdownIndicator: (provided) => ({
                ...provided,
               background: "brand",
            }),
            menuList: (provided) => ({
                ...provided,
                background: bgColor,
            })
        }}
        focusBorderColor={brandColor}
        selectedOptionStyle="check"
        {...props}
    />
}
