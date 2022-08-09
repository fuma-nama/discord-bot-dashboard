import {SelectField} from "../SelectField";
import { chakraComponents } from "chakra-react-select";
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

export default function IdSelectField({value, onChange, options, multiple, element}) {
    const getText = () => {

        switch (element && element.type) {
            case 'channel': return "頻道";
            case 'role': return "角色";
            default: return "項目";
        }
    }

    const getIcon = () => {
        switch (element && element.type) {
            case 'channel': return BsChatRightTextFill
            case 'role': return BsPeopleFill
            default: return VscCircleFilled
        }
    }

    const icon = getIcon()

    return <SelectField
        options={options.map((option) => ({
            label: option.name,
            value: option.id,
            icon: (
                <Icon as={icon} mr={3} color={option.color} />
            )
        }))}
        placeholder={`選擇一個${getText()}`}
        value={value}
        onChange={onChange}
        isMulti={multiple}
        components={components}
    />
}