"use client"

import { useEffect, useState } from "react"
import { Calendar, DayValue } from "react-modern-calendar-datepicker"
import 'react-modern-calendar-datepicker/lib/DatePicker.css';
import TimePicker from "./timepicker";

export enum InputType {
  TEXT = "text",
  SEARCH = "search",
  PASSWORD = "password",
  NUMBER = "number",
  PRICE = "price",
  LONGTEXT = "longtext",
  DATEPICKER = "datepicker",
  TIMEPICKER = "timepicker"
}

interface Props {
  placeholder: string
  type: InputType
  defaultValue?: string
  className?: string
  onChange: (value: string) => void
}

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
]

const FormInput: React.FC<Props> = ({ placeholder, type, defaultValue, className, onChange }) => {
  const [showCalendar, setShowCalendar] = useState<boolean>(false)
  const [showCalendarComponent, setShowCalendarComponent] = useState<boolean>(false)
  const [selectedDay, setSelectedDay] = useState<DayValue>()
  const [hasLoaded, setHasLoaded] = useState<boolean>(false)

  useEffect(() => {
    if (hasLoaded && type == InputType.DATEPICKER) {
      setTimeout(() => {
        setShowCalendar(false)
      }, 200)

      const date = new Date(months[selectedDay!.month - 1] + " " + selectedDay!.day + ", " + selectedDay!.year)
      onChange(date.getUTCMilliseconds().toString())
    } else if (type == InputType.DATEPICKER) {
      setHasLoaded(true)
    }
  }, [selectedDay])

  //We want to hide the calendar component itself after the animation completes. When showing the calendar component we want to show it before the animation begins
  useEffect(() => {
    if (showCalendar) {
      setShowCalendarComponent(true)
    } else {
      setTimeout(() => {
        setShowCalendarComponent(false)
      }, 500)
    }
  }, [showCalendar])

  return (
    <div className="relative">
      {type == InputType.TIMEPICKER && (
        <TimePicker
          placeholder={placeholder}
          defaultValue={defaultValue}
          onChange={(value) => onChange(value)}
        />
      )}

      {type == InputType.DATEPICKER && (
        <div onClick={() => { setShowCalendar(!showCalendar) }} className={`relative flex flex-row justify-between bg-[#2A2A2A] p-2 rounded ${showCalendar && "border border-white"}`}>
          <p className={`${typeof (selectedDay) == 'undefined' ? "text-secondary" : "text-white"}`}>{typeof (selectedDay) == 'undefined' ? placeholder : (months[selectedDay!.month - 1] + " " + selectedDay!.day + ", " + selectedDay!.year)}</p>
          <img src="/chevron.svg" className={`transition-all ${showCalendar ? "-rotate-90" : "rotate-90"}`} />

          <div onClick={(e) => { e.stopPropagation() }} className={`absolute -bottom-5 left-0 z-50 transition-all duration-500 overflow-hidden ${showCalendar ? "translate-y-full" : "translate-y-[200vh]"}`}>
            <div className={`${showCalendarComponent ? "visible" : "hidden"}`}>
              <Calendar
                value={selectedDay}
                onChange={setSelectedDay}
              />
            </div>
          </div>
        </div>
      )}

      {(type == InputType.PRICE && type! + InputType.DATEPICKER) && (
        <p className="absolute top-1/2 left-2 -translate-y-1/2 text-2xl font-semibold">$</p>
      )}

      {(type != InputType.DATEPICKER && type != InputType.TIMEPICKER) && (
        type == InputType.LONGTEXT ? (
          <textarea
            className={`bg-[#2A2A2A] rounded w-full p-2 text-white outline-none placeholder-[#7F8489] focus:border focus:border-1 focus:border-white ${className}`}
            placeholder={placeholder}
            defaultValue={defaultValue}
            onChange={(e) => onChange(e.target.value)}
          />
        ) : (
          <input
            className={`bg-[#2A2A2A] rounded w-full ${(type == InputType.SEARCH || type == InputType.PRICE) && "pl-8"} p-2 text-white outline-none placeholder-[#7F8489] focus:border focus:border-1 focus:border-white ${className}`}
            placeholder={placeholder}
            type={type}
            defaultValue={defaultValue}
            onChange={(e) => onChange(e.target.value)}
          />
        )
      )}

      {type == InputType.SEARCH && (
        <img src="/search.svg" className="absolute left-2 top-1/2 -translate-y-1/2 w-5 h-5" />
      )}
    </div>
  )
}

export default FormInput