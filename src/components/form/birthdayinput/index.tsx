"use client"

import FormInput, { InputType } from "@/components/form/input"
import MonthDropdown from "./monthdropdown"
import { useEffect, useState } from "react"
import { ValidationError } from "@/types/forms";

const maxDaysInMonth = [
    31, // January
    29, // February
    31, // March
    30, // April
    31, // May
    30, // June
    31, // July
    31, // August
    30, // September
    31, // October
    30, // November
    31  // December
  ];

interface Props {
    onChange: (value: string | ValidationError) => void
    defaultValue?: string
}

const BirthdayInput: React.FC<Props> = ({onChange, defaultValue}) => {
    const [month, setMonth] = useState<string>(defaultValue?.split("/")[0] ?? "")
    const [day, setDay] = useState<string>(defaultValue?.split("/")[1] ?? "")
    const [year, setYear] = useState<string>(defaultValue?.split("/")[2] ?? "")

    useEffect(() => {
        if(!month) {
            onChange({
                message: "No month provided",
            })
            return
        }

        if(!day) {
            onChange({
                message: "No day provided",
            })
            return
        }

        if(!year) {
            onChange({
                message: "No year provided",
            })
            return
        }

        if(month && day && year) {
            if(parseInt(month) > 12 || parseInt(month) < 1) {
                onChange({
                    message: "Invalid month",
                })
                return
            }
            if(parseInt(day) > maxDaysInMonth[parseInt(month) - 1] || parseInt(day) < 1) {
                onChange({
                    message: "Invalid day",
                })
                return
            }

            if(year.length != 4) {
                onChange({
                    message: "Invalid year",
                })
                return
            }

            onChange(`${month.length < 2 ? "0" + month : month}/${day.length < 2 ? "0" + day : day}/${year}`)
        }
    }, [month, day, year])
    
    return (
        <div className="flex flex-col gap-2">
            <p className="text-sm">Birthday</p>
            <div className="flex flex-col">
                <div className="flex 2xl:flex-row flex-col gap-5">
                    <MonthDropdown
                        defaultValue={month}
                        onChange={(value: string) => {setMonth(value)}}
                    />
                    <div className="flex flex-row gap-2">
                        <FormInput
                            placeholder="Day"
                            onChange={(value: string) => {setDay(value)}}
                            type={InputType.NUMBER}
                            className="h-fit text-center"
                        />
                        <FormInput
                            placeholder="Year"
                            onChange={(value: string) => {setYear(value)}}
                            type={InputType.NUMBER}
                            className="h-fit text-center"
                        />
                    </div>

                </div>
            </div>
        </div>
    )
}

export default BirthdayInput