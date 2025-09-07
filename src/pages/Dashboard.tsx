import { useEffect, useState } from "react";
import axios from "axios";
import { TicketRow } from "../components/TicketRow";

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

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await axios.get("https://ticket-backend-jdpp.onrender.com/tickets/all");
        console.log("Fetched tickets:", response.data);
        const data = Array.isArray(response.data) ? response.data : [];
        setTickets(data);
      } catch (error) {
        console.error("Failed to fetch tickets:", error);
        setTickets([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, []);

  const handleExport = async () => {
    try {
      const res = await axios.get("https://ticket-backend-jdpp.onrender.com/tickets/export");
      const blob = new Blob([JSON.stringify(res.data, null, 2)], {
        type: "application/json",
      });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "tickets.json";
      link.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Export failed:", err);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Ticket Dashboard</h1>

      {loading ? (
        <p>Loading tickets...</p>
      ) : (
        <div className="overflow-x-auto">
          <button
            onClick={handleExport}
            className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Export Tickets
          </button>

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
