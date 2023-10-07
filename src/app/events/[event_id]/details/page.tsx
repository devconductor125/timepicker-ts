"use client"
import FormInput, { InputType } from "@/components/form/input"
import 'react-modern-calendar-datepicker/lib/DatePicker.css';
import { Calendar, DayValue } from "react-modern-calendar-datepicker";
import { useEffect, useState } from "react";
import Navbar from "@/components/navbar";
import UpcomingEventCard from "@/components/upcomingeventcard";
import IconField from "@/components/marketplace/iconfield";
import Submit from "@/components/form/submit";

const months = [
    "January", "February", "March", "April", "May", "June", 
    "July", "August", "September", "October", "November", "December"
]

const Page = () => {
    const [selectedDay, setSelectedDay] = useState<DayValue>(null);
    const eventDays = [5, 7, 14]

    function getCalendarCellByDay(day: number): Element | null {
        const cells = document.querySelectorAll(`.-shown > .Calendar__weekRow > div`)

        for(let cell of cells) {
            const cellDay = parseInt(cell.innerHTML)

            if(cellDay == day) {
                return cell
            }
        }

        return null
    }

    function highlightEventDays(eventDays: number[]) {
        for(let day of eventDays) {
            const cell = getCalendarCellByDay(day)

            if(cell) {
                cell.classList.add("Calendar__event")
            }
        }
    }

    useEffect(() => {
        highlightEventDays(eventDays)
    }, [selectedDay])

    useEffect(() => {
        highlightEventDays(eventDays)
    }, [])

    return (
        <main className="flex flex-col h-screen gap-5">
            <Navbar/>
            <img src="https://visitmontgomery.com/wp-content/uploads/2018/05/Performance-Venue.jpg"/>
            <div className="flex flex-col px-10 pt-10 h-full">
                <div className="flex flex-row justify-between mb-10">
                    <p className="text-lg font-semibold">Sungazer</p>
                    <div className="px-4 py-1 bg-[#2A2A2A] rounded">
                        <p>$51</p>
                    </div>
                </div>
                <div className="grid grid-flow-row grid-cols-2">
                    <IconField
                        icon="/calendar.svg"
                        text="14 December, 2021"
                        subtext="Tuesday, 4:00pm - 9:00pm"
                    />
                    <IconField
                        icon="/location.svg"
                        text="Gala Convention Center"
                        subtext="36 Guild Street London, UK"
                    />
                    <IconField
                        icon="/ticket.svg"
                        text="70"
                        subtext="Total Tickets"
                    />
                    <IconField
                        icon="/ticket.svg"
                        text="14"
                        subtext="Tickets Remaining"
                    />
                </div>
                <p className="text-sm mt-5 mb-2">About Event</p>
                <p className="text-[2.5vw] text-secondary">Enjoy your favorite dishe and a lovely your friends and family and have a great time. Food from local food trucks will be available for purchase.Enjoy your favorite dishe and a lovely your friends and family and have a great time. Food from local food trucks will be available for purchase..Enjoy your favorite dishe and a lovely your friends and family and have a great time. Food from local food trucks will be available for purchase</p>
                <Submit
                    text="Buy Now"
                    className="mt-auto mb-10"
                    onClick={() => {}}
                />
            </div>
        </main>
    )
}



export default Page