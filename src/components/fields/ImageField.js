import {InputField} from "./InputField";

export default function ImageField({value, onChange}) {
    return <>
        <InputField
            value={value}
            onChange={(e) => onChange(e.target.value)}
        />
    </>
}