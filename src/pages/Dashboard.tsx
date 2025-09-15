// src/pages/Dashboard.tsx
import { useEffect, useState } from "react";
import { TicketRow } from "../components/TicketRow";
import { apiFetch } from "../utils/api";

interface Ticket {
  ticket_id: string;
  ticket_number?: string;
  name?: string;
  id_card_number?: string;
  date_of_birth?: string;
  phone_number?: string;
  event?: string;
  status: string;
}

export default function Dashboard() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [exportError, setExportError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTickets = async () => {
      setLoading(true);
      setError(null);
      try {
        // This will resolve to `${VITE_API_URL}/api/tickets/all`
        const data = await apiFetch("/tickets/all");
        setTickets(Array.isArray(data) ? data : []);
      } catch (err: any) {
        setError(err.message || "Failed to fetch tickets");
        setTickets([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, []);

  const handleExport = async () => {
    setExportError(null);
    try {
      // Make sure this endpoint exists in backend as `/api/export`
      const data = await apiFetch("/admin/export");
      const blob = new Blob([JSON.stringify(data, null, 2)], {
        type: "application/json",
      });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "tickets.json";
      link.click();
      URL.revokeObjectURL(url);
    } catch (err: any) {
      setExportError(err.message || "Export failed");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Ticket Dashboard</h1>

      {loading && <p>Loading tickets...</p>}
      {error && <p className="mb-4 text-red-600">{error}</p>}

      {!loading && !error && (
        <div className="overflow-x-auto">
          <button
            onClick={handleExport}
            className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Export Tickets
          </button>
          {exportError && (
            <p className="mb-4 text-red-600">{exportError}</p>
          )}

          <table className="min-w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="px-4 py-2">Ticket #</th>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">ID Card</th>
                <th className="px-4 py-2">DOB</th>
                <th className="px-4 py-2">Phone</th>
                <th className="px-4 py-2">Event</th>
                <th className="px-4 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {tickets.map((ticket) => (
                <TicketRow key={ticket.ticket_id} ticket={ticket} />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
