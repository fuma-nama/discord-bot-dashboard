import {SelectField} from "../SelectField";
import {chakraComponents} from "chakra-react-select";
import {Icon} from "@chakra-ui/react";
import {BsChatRightTextFill, BsPeopleFill} from "react-icons/bs";
import {VscCircleFilled} from "react-icons/vsc";

const components = {
    Option: ({ children, ...props }) => (
        <chakraComponents.Option {...props}>
            {props.data.icon} {children}
        </chakraComponents.Option>
    ),
};

export default function IdSelectField({value, onChange, options, placeholder, multiple}) {

    const getIcon = (icon) => {
        switch (icon) {
            case 'channel': return BsChatRightTextFill
            case 'role': return BsPeopleFill
            default: return icon || VscCircleFilled
        }
    }

    return <SelectField
        options={options.map((option) => ({
            label: option.name,
            value: option.id,
            icon: (
                <Icon as={getIcon(option.icon)} mr={3} color={option.color} />
            )
        }))}
        placeholder={placeholder || "選擇一個項目"}
        value={value}
        onChange={onChange}
        isMulti={multiple}
        components={components}
    />
}