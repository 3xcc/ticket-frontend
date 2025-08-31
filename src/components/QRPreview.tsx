type Props = {
  qr: string;
};

export default function QRPreview({ qr }: Props) {
  return (
    <div style={{ marginTop: 20 }}>
      <h2>Your QR Code</h2>
      <img src={qr} alt="Ticket QR" />
    </div>
  );
}
