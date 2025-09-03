const API_BASE = import.meta.env.VITE_API_BASE?.replace(/\/$/, "") || ""

export async function createTicket(data: {
  name: string
  id_card_number: string
  date_of_birth: string
  phone_number: string
}) {
  const res = await fetch(`${API_BASE}/ticket/tickets`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })

  if (!res.ok) {
    const errorText = await res.text()
    throw new Error(`Ticket creation failed: ${res.status} ${errorText}`)
  }

  return res.json()
}

export async function validateTicket(payload: string) {
  const res = await fetch(`${API_BASE}/ticket/validate_ticket`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ payload }),
  })

  if (!res.ok) {
    const errorText = await res.text()
    throw new Error(`Validation failed: ${res.status} ${errorText}`)
  }

  return res.json()
}
