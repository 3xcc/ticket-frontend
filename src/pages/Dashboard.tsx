import { useEffect, useState } from "react"

type Ticket = {
  name: string
  id_card_number: string
  date_of_birth: string
  phone_number: string
  ticket_id: string
  event: string
  status: string
  timestamp: string
}

export default function Dashboard() {
  const [tickets, setTickets] = useState<Ticket[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/ticket/tickets/all`)
        const data = await res.json()
        setTickets(data)
      } catch (err) {
        console.error("Failed to fetch tickets:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchTickets()
  }, [])

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Admin Dashboard</h2>
      {loading ? (
        <p>Loading tickets…</p>
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "1rem" }}>
          <thead>
            <tr>
              <th>Name</th>
              <th>ID</th>
              <th>Phone</th>
              <th>Event</th>
              <th>Status</th>
              <th>Scanned At</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((ticket) => (
              <tr key={ticket.ticket_id}>
                <td>{ticket.name}</td>
                <td>{ticket.id_card_number}</td>
                <td>{ticket.date_of_birth}</td>
                <td>{ticket.phone_number}</td>
                <td>{ticket.event}</td>
                <td>{ticket.status}</td>
                <td>{ticket.timestamp ? new Date(ticket.timestamp).toLocaleString() : "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}
