import {FormControl, FormHelperText, FormLabel, Switch, Text} from "@chakra-ui/react";
import Card from "components/card/Card.js";
import {SelectField} from "components/fields/SelectField";
import {InputField} from "./impl/InputField";
import MessageBuildCard from "./complex/MessageBuildCard";
import ColorField from "./impl/ColorField";
import {createContext, useContext, useMemo} from "react";
import ArrayField from "./complex/ArrayField";
import TextArea from "./TextArea";
import IdSelectField from "./impl/IdSelectField";
import ImageField from "./impl/ImageField";
import EmojiField from "./impl/EmojiField";
import PairField from "./complex/PairField";
import {OptionTypes} from "../../variables/type";

export function OptionPanel({value, onChange, option}) {
    const input = useInput(value, onChange, option)

    const inline = option.type === OptionTypes.Boolean

    return (
        <Card flexDirection={inline ? "row-reverse" : "column"} gap={5}>
            <FormControl isRequired={option.required} h="full">
                <FormLabel fontSize="xl" fontWeight="bold">{option.name}</FormLabel>
                {option.description &&
                    <Text mb={5}>{option.description}</Text>
                }
                {input}
                {option.helper &&
                    <FormHelperText>
                        {option.helper}
                    </FormHelperText>
                }
            </FormControl>
        </Card>
    );
}

export function useInput(value, onChange, option) {
    let field = useMemo(
        () => getInput(value, onChange, option),
        [onChange, option, value]
    )
    const handlers = useContext(OptionHandlerContext)

    if (field != null) {
        return field
    }
    const handler = handlers && handlers[option.type]

    if (handler) {
        return handler({value, onChange, option})
    }
}

export function getInput(value, onChange, option) {

    switch (option.type) {
        case OptionTypes.Message_Create:
            return (
                <MessageBuildCard value={value} onChange={onChange} />
            );
        case OptionTypes.Array:
            return (
                <ArrayField element={option.element} value={value} onChange={onChange} />
            )
        case OptionTypes.Color:
            return <ColorField
                value={value}
                onChange={onChange}
            />
        case OptionTypes.Boolean:
            return (
                <Switch
                    colorScheme="brandScheme"
                    size="md"
                    isChecked={value}
                    variant="main"
                    onChange={({target}) => onChange(target.checked)}
                />
            );
        case OptionTypes.MultiLine_Text:
            return (
                <TextArea
                    value={value}
                    onChange={e => onChange(e.target.value)}
                />
            )
        case OptionTypes.Number:
        case OptionTypes.Text:
            const isText = option.type === OptionTypes.Text;

            return (
                <InputField
                    type={isText ? "text" : "number"}
                    value={value}
                    placeholder={isText ? "請輸入文字" : "請輸入數字"}
                    onChange={({target}) =>
                        onChange(isText ? target.value : target.valueAsNumber)
                    }
                />
            );
        case OptionTypes.Enum:
            return (
                <SelectField
                    options={option.choices.map((choice) => ({
                        label: choice,
                        value: choice,
                    }))}
                    placeholder="選擇一個項目"
                    value={value}
                    onChange={onChange}
                    isMulti={option.multiple}
                />
            );
        case OptionTypes.Advanced_Enum:
            return (
                <IdSelectField
                    value={value}
                    onChange={onChange}
                    placeholder={option.placeholder}
                    options={option.choices}
                    multiple={option.multiple}
                />
            )
        case OptionTypes.Image:
            return (
                <ImageField value={value} onChange={onChange}/>
            )
        case OptionTypes.Emoji:
            return (
                <EmojiField value={value} onChange={onChange}/>
            )
        case OptionTypes.Pair:
            return (
                <PairField element={option.element} value={value} onChange={onChange}/>
            )
        default:
            return null;
    }
}

export function OptionField({value, onChange, option}) {
    return useInput(value, onChange, option)
}

export const OptionHandlerContext = createContext({})