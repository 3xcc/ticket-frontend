import { useState } from "react";

type Props = {
  onSubmit: (name: string, email: string) => Promise<void>; // make async for error handling
  loading: boolean;
};

export default function TicketForm({ onSubmit, loading }: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      await onSubmit(name, email);
      setSuccess("Ticket created successfully");
      setName("");
      setEmail("");
    } catch (err: any) {
      setError(err?.message || "Failed to create ticket");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "grid", gap: 12 }}>
      {error && <p style={{ color: "red", fontSize: 14 }}>{error}</p>}
      {success && <p style={{ color: "green", fontSize: 14 }}>{success}</p>}

      <input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <button disabled={loading}>
        {loading ? "Creating..." : "Create Ticket"}
      </button>
    </form>
  );
}
