export async function createTicket(data: {
  name: string;
  id_card_number: string;
  date_of_birth: string;
  phone_number: string;
}) {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/ticket`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Failed to create ticket");
  }

  return await res.json(); // expects { qr: string }
}

export async function validateTicket(payload: string) {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/validate_ticket`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ payload }),
  });

  if (!res.ok) {
    throw new Error("Ticket validation failed");
  }

  return await res.json(); // expects { name, event, status, timestamp? }
}
