type Ticket = {
  name: string
  event: string
  status: string
  timestamp?: string
}

export default function TicketDetails({ data }: { data: Ticket }) {
  return (
    <div className="ticket-details" style={{ marginTop: "1rem", padding: "1rem", border: "1px solid #ccc", borderRadius: "8px" }}>
      <h3>Ticket Details</h3>
      <p><strong>Name:</strong> {data.name}</p>
      <p><strong>Event:</strong> {data.event}</p>
      <p><strong>Status:</strong> {data.status}</p>
      {data.timestamp && (
  <p><strong>Scanned At:</strong> {new Date(data.timestamp).toLocaleString()}</p>
)}
    </div>
  )
}
