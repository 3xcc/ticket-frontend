type Props = {
  qrCode: string;
};

export default function QRPreview({ qrCode }: Props) {
  return (
    <div style={{ marginTop: "2rem" }}>
      <h3>Your Ticket QR:</h3>
      <img src={qrCode} alt="Ticket QR" style={{ width: "200px" }} />
    </div>
  );
}