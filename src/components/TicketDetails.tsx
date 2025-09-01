interface TicketDetailsProps {
  data: {
    name: string
    event: string
    status: string
    timestamp?: string
  }
}

const TicketDetails = ({ data }: TicketDetailsProps) => {
  return (
    <div className="ticket-details">
      <h3>Ticket Info</h3>
      <p><strong>Name:</strong> {data.name}</p>
      <p><strong>Event:</strong> {data.event}</p>
      <p><strong>Status:</strong> {data.status}</p>
      {data.timestamp && <p><strong>Checked In:</strong> {data.timestamp}</p>}
    </div>
  )
}

export default TicketDetails
