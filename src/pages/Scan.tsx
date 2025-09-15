import { useState } from 'react'
import QRScanner from '../components/QRScanner'
import TicketDetails from '../components/TicketDetails'
import { validateTicket } from '../api/tickets'

type Ticket = {
  name: string
  id_card_number: string
  date_of_birth: string
  phone_number: string
  ticket_id: string
  qr: string
  status: string
  event: string
  timestamp: string
}

export default function Scan() {
  const [ticket, setTicket] = useState<Ticket | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleScan = async (qrPayload: string) => {
    if (!qrPayload) {
      setError("No QR data detected")
      return
    }

    const ticketId = qrPayload.trim()
    console.log("Scanned ticket ID:", ticketId)

    setLoading(true)
    setError(null)
    setTicket(null)

    try {
      const data = await validateTicket(ticketId)
      console.log("Validation response:", data)
      setTicket(data)
    } catch (err: any) {
      console.error("Validation error:", err)
      // Show backend-provided message if available
      setError(err?.message || "Invalid or expired ticket")
    } finally {
      setLoading(false)
    }
  }

  const handleReset = () => {
    setTicket(null)
    setError(null)
  }

  return (
    <div className="scan-page" style={{ padding: '2rem' }}>
      <h2>Scan Ticket</h2>
      <QRScanner onScan={handleScan} />

      {loading && <p style={{ color: '#888' }}>Validating…</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {ticket && (
        <>
          <TicketDetails data={ticket} />
          <button onClick={handleReset} style={{ marginTop: '1rem' }}>
            Reset
          </button>
        </>
      )}
    </div>
  )
}
