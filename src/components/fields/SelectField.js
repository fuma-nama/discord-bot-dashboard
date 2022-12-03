import { Select as BaseSelect } from "chakra-react-select";
import { useColorModeValue } from "@chakra-ui/react";

export function SelectField({ value, onChange, options, ...props }) {
  const selected =
    value != null &&
    Array.isArray(options) &&
    options.find(
      (option) =>
        option.value === value ||
        (Array.isArray(value) && value.includes(option.value))
    );

  const brandColor = useColorModeValue("secondaryGray.300", "brand.400");
  const bgColor = useColorModeValue("secondaryGray.300", "navy.900");

  return (
    <BaseSelect
      menuPortalTarget={document.body}
      styles={{
        menuPortal: (provided) => ({ ...provided, zIndex: 100 }),
      }}
      chakraStyles={{
        dropdownIndicator: (provided) => ({
          ...provided,
          background: "brand",
        }),
        menuList: (provided) => ({
          ...provided,
          background: bgColor,
          zIndex: 11,
        }),
      }}
      focusBorderColor={brandColor}
      selectedOptionStyle="check"
      {...props}
      value={selected}
      onChange={(e) =>
        onChange != null &&
        onChange(Array.isArray(e) ? e.map((option) => option.value) : e.value)
      }
      options={options}
    />
  );
}
