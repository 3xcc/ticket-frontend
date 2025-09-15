import { apiFetch } from "../utils/api";

export async function createTicket(data: {
  name: string;
  id_card_number: string;
  date_of_birth: string;
  phone_number: string;
}) {
  return apiFetch("/tickets", {
    method: "POST",
    body: JSON.stringify(data)
  });
}

/**
 * Validate (scan) a ticket by ID.
 * Calls backend /api/scan/{ticketId} — requires scanner/admin role.
 */
export async function validateTicket(ticketId: string) {
  return apiFetch(`/scan/${ticketId}`, {
    method: "POST"
  });
}
