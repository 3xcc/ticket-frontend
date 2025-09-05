// src/pages/Dashboard.tsx
import { useEffect, useState } from "react";

interface Ticket {
  ticket_id: string;
  name: string;
  id_card_number: string;
  date_of_birth: string;
  phone_number: string;
  event: string;
  status: string;
  timestamp: string | null;
}

export default function Dashboard() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/ticket/tickets/all`
        );
        if (!res.ok) {
          throw new Error(`Failed to fetch tickets: ${res.status}`);
        }
        const data: Ticket[] = await res.json();
        console.log("Tickets from API:", data);
        setTickets(data);
      } catch (err: any) {
        console.error(err);
        setError(err.message || "Error fetching tickets");
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, []);

  return (
    <div style={{ padding: "1rem" }}>
      <h1>Admin Dashboard</h1>

      {loading && <p>Loading tickets…</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && !error && (
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginTop: "1rem",
          }}
        >
          <thead>
            <tr>
              <th style={thStyle}>Name</th>
              <th style={thStyle}>ID Card Number</th>
              <th style={thStyle}>Date of Birth</th>
              <th style={thStyle}>Phone Number</th>
              <th style={thStyle}>Event</th>
              <th style={thStyle}>Status</th>
              <th style={thStyle}>Scanned At</th>
            </tr>
          </thead>
          <tbody>
            {tickets.length === 0 ? (
              <tr>
                <td colSpan={7} style={{ textAlign: "center", padding: "1rem" }}>
                  No tickets found
                </td>
              </tr>
            ) : (
              tickets.map((ticket) => (
                <tr key={ticket.ticket_id}>
                  <td style={tdStyle}>{ticket.name}</td>
                  <td style={tdStyle}>{ticket.id_card_number}</td>
                  <td style={tdStyle}>{ticket.date_of_birth}</td>
                  <td style={tdStyle}>{ticket.phone_number}</td>
                  <td style={tdStyle}>{ticket.event}</td>
                  <td style={tdStyle}>{ticket.status}</td>
                  <td style={tdStyle}>
                    {ticket.timestamp
                      ? new Date(ticket.timestamp).toLocaleString()
                      : "—"}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}

const thStyle: React.CSSProperties = {
  border: "1px solid #ccc",
  padding: "0.5rem",
  background: "#f5f5f5",
  textAlign: "left",
};

const tdStyle: React.CSSProperties = {
  border: "1px solid #ccc",
  padding: "0.5rem",
};