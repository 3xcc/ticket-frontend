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

export async function validateTicket(payload: string) {
  return apiFetch("/validate_ticket", {
    method: "POST",
    body: JSON.stringify({ payload })
  });
}
