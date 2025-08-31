import { useEffect, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";

type TicketPayload = {
  ticket_id: string;
  name: string;
  email: string;
};

export default function Scan() {
  const [rawResult, setRawResult] = useState("");
  const [parsed, setParsed] = useState<TicketPayload | null>(null);

  useEffect(() => {
    const scanner = new Html5QrcodeScanner(
      "scanner",
      { fps: 10, qrbox: 250 },
      false
    );

    scanner.render(
      (decodedText: string) => {
        setRawResult(decodedText);
        try {
          const parsedData = JSON.parse(decodedText);
          setParsed(parsedData);
        } catch (err) {
          console.error("Failed to parse QR payload:", err);
          setParsed(null);
        }
        scanner.clear().catch((err) => console.error("Failed to clear scanner", err));
      },
      (errorMessage: string) => {
        console.warn("Scan error:", errorMessage);
      }
    );

    return () => {
      scanner.clear().catch((err) => console.error("Cleanup failed", err));
    };
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Scan Ticket</h2>
      <div id="scanner" style={{ width: "100%", maxWidth: "400px", margin: "auto" }} />

      {rawResult && (
        <div style={{ marginTop: "2rem" }}>
          <h3>Raw QR Result:</h3>
          <pre>{rawResult}</pre>
        </div>
      )}

      {parsed && (
        <div style={{ marginTop: "2rem", background: "#f0f0f0", padding: "1rem", borderRadius: "8px" }}>
          <h3>Parsed Ticket Info:</h3>
          <p><strong>Ticket ID:</strong> {parsed.ticket_id}</p>
          <p><strong>Name:</strong> {parsed.name}</p>
          <p><strong>Email:</strong> {parsed.email}</p>
        </div>
      )}
    </div>
  );
}
