import { useEffect } from 'react'
import { Html5QrcodeScanner } from 'html5-qrcode'

interface QRScannerProps {
  onScan: (data: string) => void
}

const QRScanner = ({ onScan }: QRScannerProps) => {
  useEffect(() => {
    const scanner = new Html5QrcodeScanner('qr-reader', {
      fps: 10,
      qrbox: 250,
    }, false) // ✅ Fix: add verbose argument here

    scanner.render(
      (decodedText) => {
        onScan(decodedText)
        scanner.clear()
      },
      (error) => {
        console.warn('QR scan error:', error)
      }
    )

    return () => {
      scanner.clear().catch(() => {})
    }
  }, [onScan])

  return <div id="qr-reader" style={{ width: '100%' }} />
}

export default QRScanner
