import { useEffect, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";

export default function Scan() {
  const [result, setResult] = useState("");

  useEffect(() => {
    const scanner = new Html5QrcodeScanner(
      "scanner", // element ID
      { fps: 10, qrbox: 250 }, // config
      false // verbose mode off
    );

    scanner.render(
      (decodedText: string) => {
        setResult(decodedText);
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
      {result && (
        <div style={{ marginTop: "2rem", background: "#3d3d3dff", padding: "1rem", borderRadius: "8px" }}>
          <h3>QR Result:</h3>
          <pre>{result}</pre>
        </div>
      )}
    </div>
  );
}
