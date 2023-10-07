import IconField from "./marketplace/iconfield"

interface UpcomingEventCardProps {
    title: string
    location: string
    date: string
    imageUrl: string
    ticketId: string
}

const UpcomingEventCard: React.FC<UpcomingEventCardProps> = ({title, location, date, imageUrl, ticketId}) => {
    const month = new Date(date).toLocaleString('default', { month: 'short' })
    const day = new Date(date).getDate()
    const year = new Date(date).getFullYear()
    const time = new Date(date).toLocaleTimeString('default', { hour: '2-digit', minute: '2-digit' })

    const dateStr = `${month} ${day}, ${year} @ ${time}`

    return (
        <div onClick={()=>{window.location.href = `/ticket/${ticketId}`}} className="bg-[#2A2A2A] flex flex-col p-2 rounded-lg">
            <img className="rounded mb-2" src={imageUrl}/>
            <p className="text-xs">{dateStr}</p>
            <p>{title}</p>
            <IconField
                icon="/location.svg"
                text={location}
            />
        </div>
    )
}

export default UpcomingEventCard