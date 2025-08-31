import { useState } from "react";
import { createTicket } from "../api/tickets";

export default function Home() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  const [qrCode, setQrCode] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await createTicket(formData);
      setQrCode(response.qr); // assumes backend returns { qr: string }
    } catch (err) {
      console.error("Ticket creation failed:", err);
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Create Ticket</h2>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem", maxWidth: "400px" }}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <button type="submit">Generate QR</button>
      </form>

      {qrCode && (
        <div style={{ marginTop: "2rem" }}>
          <h3>Your Ticket QR:</h3>
          <img src={qrCode} alt="Ticket QR" style={{ width: "200px" }} />
        </div>
      )}
    </div>
  );
}
