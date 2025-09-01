import QRScanner from "../components/QRScanner";

export default function ScanPage() {
  return (
    <div style={{ padding: "2rem", maxWidth: "600px", margin: "0 auto" }}>
      <h2 style={{ color: "#343434ff", marginBottom: "1rem" }}>Scan Ticket</h2>
      <QRScanner />
    </div>
  );
}
