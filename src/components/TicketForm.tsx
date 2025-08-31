import { useState } from "react";

type Props = {
  onSubmit: (name: string, email: string) => void;
  loading: boolean;
};

export default function TicketForm({ onSubmit, loading }: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(name, email);
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "grid", gap: 12 }}>
      <input
        placeholder="Name"
        value={name}
        onChange={e => setName(e.target.value)}
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
      />
      <button disabled={loading}>
        {loading ? "Creating..." : "Create Ticket"}
      </button>
    </form>
  );
}
