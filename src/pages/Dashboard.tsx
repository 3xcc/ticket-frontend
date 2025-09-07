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
        const response = await axios.get("/tickets/all");
        setTickets(response.data);
      } catch (error) {
        console.error("Failed to fetch tickets:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Ticket Dashboard</h1>

      {loading ? (
        <p>Loading tickets...</p>
      ) : (
        <div className="overflow-x-auto">
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
