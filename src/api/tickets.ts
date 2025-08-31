export async function createTicket(payload: { name: string; email: string }) {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/tickets`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to create ticket");
  return res.json(); // { qr: "data:image/png;base64,..." }
}
