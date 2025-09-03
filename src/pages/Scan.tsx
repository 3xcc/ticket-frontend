import { useState } from 'react'
import QRScanner from '../components/QRScanner'
import TicketDetails from '../components/TicketDetails'
import { validateTicket } from '../api/tickets'

type Ticket = {
  name: string
  event: string
  status: string
  timestamp?: string
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

    console.log("Scanned QR payload:", qrPayload)
    setLoading(true)
    setError(null)
    setTicket(null)

    try {
      const data = await validateTicket(qrPayload)
      console.log("Validation response:", data)
      setTicket(data)
    } catch (e) {
      console.error("Validation error:", e)
      setError('Invalid or expired ticket')
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
