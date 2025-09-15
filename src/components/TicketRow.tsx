// src/components/TicketRow.tsx
import { useState } from "react";
import { FallbackCell } from "./FallbackCell";
import { StatusBadge } from "./StatusBadge";
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

export const TicketRow = ({ ticket }: { ticket: Ticket }) => {
  const [error, setError] = useState<string | null>(null);

  const handleDelete = async () => {
    setError(null);
    try {
      await apiFetch(`/admin/tickets/${ticket.ticket_id}`, {
        method: "DELETE",
      });
      window.location.reload();
    } catch (err: any) {
      setError(err.message || "Delete failed");
    }
  };

  const handleEdit = async () => {
    setError(null);
    const updated = { name: "Updated Name" }; // Replace with form logic later
    try {
      await apiFetch(`/admin/tickets/${ticket.ticket_id}`, {
        method: "PUT",
        body: JSON.stringify(updated),
      });
      window.location.reload();
    } catch (err: any) {
      setError(err.message || "Edit failed");
    }
};

  return (
    <>
      <tr>
        <FallbackCell value={ticket.ticket_number} />
        <FallbackCell value={ticket.name} />
        <FallbackCell value={ticket.id_card_number} />
        <FallbackCell value={ticket.date_of_birth} />
        <FallbackCell value={ticket.phone_number} />
        <FallbackCell value={ticket.event} />
        <td>
          <StatusBadge status={ticket.status} />
        </td>
        <td className="px-4 py-2">
          <button
            onClick={handleEdit}
            className="text-blue-600 hover:underline text-sm mr-2"
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="text-red-600 hover:underline text-sm"
          >
            Delete
          </button>
        </td>
      </tr>
      {error && (
        <tr>
          <td colSpan={8} className="px-4 py-2 text-red-600 text-sm">
            {error}
          </td>
        </tr>
      )}
    </>
  );
};
