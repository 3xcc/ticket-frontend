import { useState } from "react"
import { createTicket } from "../api/tickets"

function calculateAge(dob: string): number | null {
  const birthDate = new Date(dob)
  if (isNaN(birthDate.getTime())) return null

  const today = new Date()
  let age = today.getFullYear() - birthDate.getFullYear()
  const m = today.getMonth() - birthDate.getMonth()
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--
  }
  return age
}

export default function Home() {
  const [formData, setFormData] = useState({
    name: "",
    id_card_number: "",
    date_of_birth: "",
    phone_number: "",
    event: "", // ✅ Added event field
  })

  const [qrCode, setQrCode] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()
  try {
    const { name, id_card_number, date_of_birth, phone_number, event } = formData
    const payload = {
      name,
      id_card_number,
      date_of_birth,
      phone_number,
      event
    }
    const response = await createTicket(payload)
    setQrCode(response.qr)
  } catch (err) {
    console.error("Ticket creation failed:", err)
  }
  }

  const age = calculateAge(formData.date_of_birth)

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Create Ticket</h2>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          maxWidth: "400px",
        }}
      >
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="id_card_number"
          placeholder="ID Card Number"
          value={formData.id_card_number}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="date_of_birth"
          placeholder="Date of Birth"
          value={formData.date_of_birth}
          onChange={handleChange}
          required
        />
        {formData.date_of_birth && age !== null && (
          <div style={{ fontSize: "0.9rem", color: "#555" }}>
            DOB: {formData.date_of_birth} (Age: {age})
          </div>
        )}
        <input
          type="tel"
          name="phone_number"
          placeholder="Phone Number"
          value={formData.phone_number}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="event"
          placeholder="Event Name"
          value={formData.event}
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
  )
}