// src/components/TicketRow.tsx
import { FallbackCell } from "./FallbackCell";
import { StatusBadge } from "./StatusBadge";

export const TicketRow = ({ ticket }: { ticket: any }) => (
  <tr>
    <FallbackCell value={ticket.ticket_number} />
    <FallbackCell value={ticket.name} />
    <FallbackCell value={ticket.id_card_number} />
    <FallbackCell value={ticket.date_of_birth} />
    <FallbackCell value={ticket.phone_number} />
    <FallbackCell value={ticket.event} />
    <td><StatusBadge status={ticket.status} /></td>
  </tr>
);
