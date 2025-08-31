import { useState } from "react";
import TicketForm from "../components/TicketForm";
import QRPreview from "../components/QRPreview";
import { createTicket } from "../api/tickets";

export default function Home() {
  const [qr, setQr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (name: string, email: string) => {
    setLoading(true);
    setError(null);
    setQr(null);
    try {
      const data = await createTicket({ name, email });
      setQr(data.qr);
    } catch (err: any) {
      setError(err.message || "Request failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={{ maxWidth: 500, margin: "40px auto", fontFamily: "sans-serif" }}>
      <h1>Ticket Manager</h1>
      <TicketForm onSubmit={handleSubmit} loading={loading} />
      {error && <p style={{ color: "red" }}>{error}</p>}
      {qr && <QRPreview qr={qr} />}
    </main>
  );
}
