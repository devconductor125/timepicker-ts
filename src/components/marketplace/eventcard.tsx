import IconField from "./iconfield"

interface EventCardProps {
    title: string
    location: string
    tags: string[]
    date: number
    imageUrl: string
    eventId: string
}

const EventCard: React.FC<EventCardProps> = ({title, location, tags, date, imageUrl, eventId}) => {
    const month = new Date(date).toLocaleString('default', { month: 'short' })
    const day = new Date(date).getDate()
    const year = new Date(date).getFullYear()
    const time = new Date(date).toLocaleTimeString('default', { hour: '2-digit', minute: '2-digit' })

    const dateStr = `${month} ${day}, ${year} @ ${time}`

    return (
        <div onClick={()=>{window.location.href = `/events/${eventId}/details`}} className="bg-[#2A2A2A] rounded w-full flex flex-row h-32">
            <div className="h-full p-3">
                <img src={imageUrl} className="object-cover rounded h-full aspect-square" />
            </div>
            <div className="flex flex-col gap-2 p-2 my-auto">
                <p>{title}</p>
                <div className="flex flex-row gap-1 text-xs">
                    {tags.map((tag, index) => {
                        return (
                            <p className="rounded-full px-2 py-1 bg-white text-black" key={index}>{tag}</p>
                        )
                    })}
                </div>
                <IconField
                    icon="/location.svg"
                    text={location}
                />
                <IconField
                    icon="/calendar.svg"
                    text={dateStr}
                />
            </div>
        </div>
    )
}



export default EventCard