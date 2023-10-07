"use client"
import { InputType } from "@/components/form/input"
import 'react-modern-calendar-datepicker/lib/DatePicker.css';
import { DayValue } from "react-modern-calendar-datepicker";
import { useEffect, useState } from "react";
import Navbar from "@/components/navbar";
import Submit from "@/components/form/submit";
import InputGroup from "@/components/form/inputgroup";

const Page = () => {
  const [selectedDay, setSelectedDay] = useState<DayValue>(null);

  function getCalendarCellByDay(day: number): Element | null {
    const cells = document.querySelectorAll(`.-shown > .Calendar__weekRow > div`)

    for (let cell of cells) {
      const cellDay = parseInt(cell.innerHTML)

      if (cellDay == day) {
        return cell
      }
    }

    return null
  }

  useEffect(() => {

    document.addEventListener('touchmove', function (e) {
      let button = e.target as HTMLElement;
      const classNames = button.className;
      console.log(classNames)
      if (classNames.indexOf("timepicker-container") > 0 || classNames.indexOf("timepicker-selector") > 0) {
        e.preventDefault();
      }
    }, { passive: false });
  }, [])

  return (
    <main className="flex flex-col h-screen gap-5 mx-10">
      <Navbar />
      <p className="text-center mt-16">Create Event</p>
      <InputGroup
        label={"Select Date"}
        placeholder={"April 15, 2023"}
        type={InputType.DATEPICKER}
        onChange={() => { }}
      />
      <InputGroup
        label={"Start Time"}
        placeholder={"8:00 AM"}
        type={InputType.TIMEPICKER}
        onChange={() => { }}
      />
      <InputGroup
        label={"Location"}
        placeholder={"The Fillmore, Silver Spring"}
        type={InputType.TEXT}
        onChange={() => { }}
      />
      <InputGroup
        label={"Event Name"}
        placeholder={"Sungazer Live at The Fillmore"}
        type={InputType.TEXT}
        onChange={() => { }}
      />
      <InputGroup
        label={"Ticket Price"}
        placeholder={"50"}
        type={InputType.PRICE}
        onChange={() => { }}
      />
      <InputGroup
        label={"Available Tickets"}
        placeholder={"120"}
        type={InputType.NUMBER}
        onChange={() => { }}
      />
      <InputGroup
        label={"Description"}
        placeholder=""
        type={InputType.LONGTEXT}
        onChange={() => { }}
      />

      <Submit
        text="Create Event"
        onClick={() => { }}
        className="mx-auto w-full"
      />
    </main>
  )
}



export default Page