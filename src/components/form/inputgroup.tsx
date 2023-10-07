import FormInput, { InputType } from "./input"

interface Props {
    label: string,
    placeholder: string
    type: InputType
    defaultValue?: string
    onChange: (value: string) => void
}

const InputGroup: React.FC<Props> = ({label, placeholder, type, defaultValue, onChange}) => {
    return (
        <div className="flex flex-col gap-2">
            <p className="text-sm">{label}</p>
            <FormInput
                placeholder={placeholder}
                type={type}
                defaultValue={defaultValue}
                onChange={(value) => onChange(value)}
            />
        </div>
    )
}

export default InputGroup