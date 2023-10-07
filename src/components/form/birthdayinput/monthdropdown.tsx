import Dropdown from "@/components/form/dropdown"
import { LabelValue } from "@/types/forms"

const options = [
    {label: "January", value: "january"},
    {label: "February", value: "february"},
    {label: "March", value: "march"},
    {label: "April", value: "april"},
    {label: "May", value: "may"},
    {label: "June", value: "june"},
    {label: "July", value: "july"},
    {label: "August", value: "august"},
    {label: "September", value: "september"},
    {label: "October", value: "october"},
    {label: "November", value: "november"},
    {label: "December", value: "december"}
]

function monthToNumber(month: string): string {
    return (options.indexOf(
        options.find(
            a => a.value == month
        )!
    ) + 1).toString()
}

function numberToMonthValue(number: number): string | undefined {
    return options[number - 1].value
}

interface Props {
    defaultValue?: string
    onChange: (value: string) => void
}

const MonthDropdown: React.FC<Props> = ({defaultValue, onChange}) => {
    return (
        <Dropdown 
            options={options} 
            onChange={(value: LabelValue) => {
                onChange(monthToNumber(value.value))
            }} //Converts month to a number and sends that to the onchange function
            defaultValue={defaultValue && numberToMonthValue(parseInt(defaultValue))}
            placeholder={"Month"}
        />
    )
}

export default MonthDropdown