import { useEffect, useState } from "react";

interface Ticket {
  ticket_id: string;
  ticket_number: string | null; // ✅ Added ticket_number
  name: string | null;
  id_card_number: string | null;
  date_of_birth: string | null;
  phone_number: string | null;
  event: string | null;
  status: string;
  timestamp: string | null;
}

export default function Dashboard() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(`${import.meta.env.VITE_API_URL}/tickets/all`);
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

  const handleEdit = async (ticket: Ticket) => {
    const newName = prompt("Enter new name", ticket.name || "");
    if (newName === null) return;
    await fetch(`${import.meta.env.VITE_API_URL}/tickets/${ticket.ticket_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": "your-secret-key"
      },
      body: JSON.stringify({ name: newName })
    });
    fetchTickets();
  };

  const handleDelete = async (ticketId: string) => {
    if (!confirm("Are you sure you want to delete this ticket?")) return;
    await fetch(`${import.meta.env.VITE_API_URL}/tickets/${ticketId}`, {
      method: "DELETE",
      headers: {
        "x-api-key": "your-secret-key"
      }
    });
    fetchTickets();
  };

  const handleDeleteAll = async () => {
    if (!confirm("Delete ALL tickets? This cannot be undone.")) return;
    await fetch(`${import.meta.env.VITE_API_URL}/tickets?confirm=true`, {
      method: "DELETE",
      headers: {
        "x-api-key": "your-secret-key"
      }
    });
    fetchTickets();
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h1>Admin Dashboard</h1>

      <button
        onClick={handleDeleteAll}
        style={{
          marginBottom: "1rem",
          color: "white",
          background: "red",
          padding: "0.5rem 1rem",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer"
        }}
      >
        Delete All Tickets
      </button>

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
              <th style={thStyle}>Ticket #</th> {/* ✅ New column */}
              <th style={thStyle}>Name</th>
              <th style={thStyle}>ID Card Number</th>
              <th style={thStyle}>Date of Birth</th>
              <th style={thStyle}>Phone Number</th>
              <th style={thStyle}>Event</th>
              <th style={thStyle}>Status</th>
              <th style={thStyle}>Scanned At</th>
              <th style={thStyle}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tickets.length === 0 ? (
              <tr>
                <td colSpan={9} style={{ textAlign: "center", padding: "1rem" }}>
                  No tickets found
                </td>
              </tr>
            ) : (
              tickets.map((ticket) => (
                <tr key={ticket.ticket_id}>
                  <td style={tdStyle}>{ticket.ticket_number ?? "—"}</td> {/* ✅ Display ticket_number */}
                  <td style={tdStyle}>{ticket.name ?? "—"}</td>
                  <td style={tdStyle}>{ticket.id_card_number ?? "—"}</td>
                  <td style={tdStyle}>{ticket.date_of_birth ?? "—"}</td>
                  <td style={tdStyle}>{ticket.phone_number ?? "—"}</td>
                  <td style={tdStyle}>{ticket.event ?? "—"}</td>
                  <td style={tdStyle}>{ticket.status}</td>
                  <td style={tdStyle}>
                    {ticket.timestamp
                      ? new Date(ticket.timestamp).toLocaleString()
                      : "—"}
                  </td>
                  <td style={tdStyle}>
                    <button
                      onClick={() => handleEdit(ticket)}
                      style={{ marginRight: "0.5rem" }}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(ticket.ticket_id)}
                      style={{ color: "red" }}
                    >
                      Delete
                    </button>
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
