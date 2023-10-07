interface TicketFieldProps {
    label: string
    value: string
}
  
const TicketField: React.FC<TicketFieldProps> = ({label, value}) => {
    return (
      <div className="flex flex-col">
        <p className="text-xs text-secondary">{label}</p>
        <p className="text-sm">{value}</p>
      </div>
    )
}

interface DataGridProps {
    eventCode: string
    dateOfEvent: string
    birthday: string
    sex: string
}

const DataGrid: React.FC<DataGridProps> = ({eventCode, dateOfEvent, birthday, sex}) => {
    return (
        <div className="grid grid-flow-row grid-cols-2 gap-x-10 gap-y-5">
            <TicketField
                label="Event Code"
                value={eventCode}
            />
            <TicketField
                label="Date of event"
                value={dateOfEvent}
            />
            <TicketField
                label="Birthday"
                value={birthday}
            />
            <TicketField
                label="Sex"
                value={sex}
            />
        </div>
    )
}

export default DataGrid