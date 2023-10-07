"use client"
import FormInput, { InputType } from "@/components/form/input"
import 'react-modern-calendar-datepicker/lib/DatePicker.css';
import { Calendar, DayValue } from "react-modern-calendar-datepicker";
import { useEffect, useState } from "react";
import Navbar from "@/components/navbar";
import UpcomingEventCard from "@/components/upcomingeventcard";

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
        <main className="flex flex-col min-h-screen px-10 pt-10 gap-5">
            <Navbar/>
            <p className="font-semibold text-center mb-5">Your Tickets</p>
            <FormInput
                placeholder="Search"
                type={InputType.SEARCH}
                onChange={(value: string) => {}}
            />
            <Calendar
                value={selectedDay}
                shouldHighlightWeekends
                calendarClassName="responsive-calendar"
                onChange={setSelectedDay}
            />
            {selectedDay && (
                <p>Showing events for {months[selectedDay.month - 1]} {selectedDay.day}, {selectedDay.year}</p>
            )}
            <div className="flex flex-col gap-5 mb-20">
                <UpcomingEventCard
                    title="Sungazer"
                    location="Gala Convention Center"
                    date={new Date().toISOString()}
                    imageUrl="https://visitmontgomery.com/wp-content/uploads/2018/05/Performance-Venue.jpg"
                    ticketId="12345"
                />
                <UpcomingEventCard
                    title="Sungazer"
                    location="Gala Convention Center"
                    date={new Date().toISOString()}
                    imageUrl="https://visitmontgomery.com/wp-content/uploads/2018/05/Performance-Venue.jpg"
                    ticketId="12345"
                />
                <UpcomingEventCard
                    title="Sungazer"
                    location="Gala Convention Center"
                    date={new Date().toISOString()}
                    imageUrl="https://visitmontgomery.com/wp-content/uploads/2018/05/Performance-Venue.jpg"
                    ticketId="12345"
                />
                <UpcomingEventCard
                    title="Sungazer"
                    location="Gala Convention Center"
                    date={new Date().toISOString()}
                    imageUrl="https://visitmontgomery.com/wp-content/uploads/2018/05/Performance-Venue.jpg"
                    ticketId="12345"
                />
                <UpcomingEventCard
                    title="Sungazer"
                    location="Gala Convention Center"
                    date={new Date().toISOString()}
                    imageUrl="https://visitmontgomery.com/wp-content/uploads/2018/05/Performance-Venue.jpg"
                    ticketId="12345"
                />
                <UpcomingEventCard
                    title="Sungazer"
                    location="Gala Convention Center"
                    date={new Date().toISOString()}
                    imageUrl="https://visitmontgomery.com/wp-content/uploads/2018/05/Performance-Venue.jpg"
                    ticketId="12345"
                />
            </div>
        </main>
    )
}



export default Page