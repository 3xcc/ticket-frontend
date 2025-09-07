// src/components/TicketRow.tsx
import axios from "axios";
import { FallbackCell } from "./FallbackCell";
import { StatusBadge } from "./StatusBadge";

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

export const TicketRow = ({ ticket }: { ticket: Ticket }) => {
  const handleDelete = async () => {
    try {
      await axios.delete(`https://ticket-backend-jdpp.onrender.com/tickets/${ticket.ticket_id}`);
      window.location.reload(); // or trigger a refetch
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  const handleEdit = async () => {
    const updated = { name: "Updated Name" }; // Replace with form logic later
    try {
      await axios.put(`https://ticket-backend-jdpp.onrender.com/tickets/${ticket.ticket_id}`, updated);
      window.location.reload();
    } catch (err) {
      console.error("Edit failed:", err);
    }
  };

  return (
    <tr>
      <FallbackCell value={ticket.ticket_number} />
      <FallbackCell value={ticket.name} />
      <FallbackCell value={ticket.id_card_number} />
      <FallbackCell value={ticket.date_of_birth} />
      <FallbackCell value={ticket.phone_number} />
      <FallbackCell value={ticket.event} />
      <td><StatusBadge status={ticket.status} /></td>
      <td className="px-4 py-2">
        <button onClick={handleEdit} className="text-blue-600 hover:underline text-sm mr-2">Edit</button>
        <button onClick={handleDelete} className="text-red-600 hover:underline text-sm">Delete</button>
      </td>
    </tr>
  );
};
