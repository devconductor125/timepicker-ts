"use client"

import { LabelValue } from "@/types/forms"
import { useEffect, useRef, useState } from "react"

interface DropdownProps {
    options: LabelValue[]
    defaultValue?: string
    placeholder: string
    onChange: (value: LabelValue) => void
}

const Dropdown: React.FC<DropdownProps> = ({options, defaultValue, placeholder, onChange}) => {
    const [isExpanded, setIsExpanded] = useState<boolean>(false)
    const [selectedOption, setSelectedOption] = useState<LabelValue | null | undefined>(options.find(a => a.value == defaultValue))
    const divRef = useRef(null)

    useEffect(() => {
        if(selectedOption) onChange(selectedOption)
    }, [selectedOption])

    useEffect(() => {
        function handleClickOutside(event: any) {
            if (divRef.current && !(divRef.current as unknown as any).contains(event.target)) {
                setIsExpanded(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
    })

    //Delays closing by 200ms so user can see which item they selected
    function closeDropdown() {
        if(isExpanded) {
            setTimeout(() => {
                setIsExpanded(false)
            }, 200)
        } else {
            setIsExpanded(true)
        }
    }
    
    return (
        <div ref={divRef} onClick={closeDropdown} className={`${isExpanded ? "" : "2xl:hover:scale-105"} mx-1 2xl:hover:shadow-md shadow-none transition-all rounded-3xl p-3 text-sm bg-white/0 border border-farloe-light-gray text-farloe-light-gray cursor-pointer h-fit relative`}>
            <div className={`flex flex-row gap-5 justify-between`}>
                <p className={`${selectedOption ? "text-white" : ""}`}>{selectedOption?.label ?? placeholder}</p>
                <img className={`${isExpanded ? "rotate-180" : ""} transition-all invert`} src="/downicon.svg"/>
            </div>
            
            <div className={`flex flex-col text-center rounded text-white gap-2 text-md transition-all duration-500 pr-5 ${isExpanded ? "min-h-fit max-h-44 mt-2 overflow-y-scroll" : "min-h-0 max-h-0 overflow-y-hidden"}`}>
                {options.map((option: LabelValue, index) => {
                    return (
                        <p key={index} onClick={()=>{setSelectedOption(option)}} className={`rounded-md p-2 transition-all ${selectedOption == option && "bg-white text-black"}`}>{option.label}</p>
                    )
                })}
            </div>
        </div>
    )
}

export default Dropdown