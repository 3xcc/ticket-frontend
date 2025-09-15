// src/pages/Home.tsx
import { useState } from "react";
import { createTicket } from "../api/tickets";

export default function Home() {
  const [payload, setPayload] = useState({
    name: "",
    id_card_number: "",
    date_of_birth: "",
    phone_number: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    try {
      await createTicket(payload);
      setSuccess("Ticket created successfully");
      setPayload({
        name: "",
        id_card_number: "",
        date_of_birth: "",
        phone_number: ""
      });
    } catch (err: any) {
      setError(err?.message || "Failed to create ticket");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">Home</h1>

      {error && <p className="mb-4 text-red-600">{error}</p>}
      {success && <p className="mb-4 text-green-600">{success}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Name"
          value={payload.name}
          onChange={(e) => setPayload({ ...payload, name: e.target.value })}
          className="border p-2 w-full rounded"
          required
        />
        <input
          type="text"
          placeholder="ID Card Number"
          value={payload.id_card_number}
          onChange={(e) =>
            setPayload({ ...payload, id_card_number: e.target.value })
          }
          className="border p-2 w-full rounded"
          required
        />
        <input
          type="date"
          value={payload.date_of_birth}
          onChange={(e) =>
            setPayload({ ...payload, date_of_birth: e.target.value })
          }
          className="border p-2 w-full rounded"
        />
        <input
          type="tel"
          placeholder="Phone Number"
          value={payload.phone_number}
          onChange={(e) =>
            setPayload({ ...payload, phone_number: e.target.value })
          }
          className="border p-2 w-full rounded"
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Creating..." : "Create Ticket"}
        </button>
      </form>
    </div>
  );
}
