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

export default function ScanPage() {
  const [ticket, setTicket] = useState<Ticket | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleScan = async (qrPayload: string) => {
    if (!qrPayload) return
    setLoading(true)
    setError(null)
    setTicket(null)
    try {
      const data = await validateTicket(qrPayload)
      setTicket(data)
    } catch (e) {
      setError('Invalid or expired ticket')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="scan-page">
      <h2>Scan Ticket</h2>
      <QRScanner onScan={handleScan} />
      {loading && <p>Validating…</p>}
      {ticket && <TicketDetails data={ticket} />}
      {error && <p className="error">{error}</p>}
    </div>
  )
}
