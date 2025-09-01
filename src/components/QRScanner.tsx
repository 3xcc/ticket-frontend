import { useState, useEffect } from "react";
import TicketDetails from "./TicketDetails";
import { Html5QrcodeScanner } from "html5-qrcode";

export default function QRScanner() {
  const [scannedPayload, setScannedPayload] = useState<any>(null);

  useEffect(() => {
    const scanner = new Html5QrcodeScanner("qr-reader", { fps: 10, qrbox: 250 }, false);

    scanner.render(
      (decodedText: string) => {
        try {
          const parsed = JSON.parse(decodedText);
          setScannedPayload(parsed);
        } catch (err) {
          console.error("Invalid QR payload:", err);
        }
      },
      (errorMessage: string) => {
        console.warn("QR scan error:", errorMessage);
      }
    );

    return () => {
      scanner.clear().catch((err) => console.error("Failed to clear scanner", err));
    };
  }, []);

  return (
    <div>
      <div id="qr-reader" style={{ width: "100%" }} />
      {scannedPayload && <TicketDetails payload={scannedPayload} />}
    </div>
  );
}
