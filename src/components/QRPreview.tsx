type Props = {
  qr: string;
};

export default function QRPreview({ qr }: { qr: string }) {
  return (
    <div style={{ marginTop: 20 }}>
      <h3>Your Ticket QR:</h3>
      <img src={qr} alt="Ticket QR" style={{ width: "100%" }} />
    </div>
  );
}

