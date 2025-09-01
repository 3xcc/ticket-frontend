type Props = {
  qrCode: string;
};

export default function QRPreview({ qrCode }: Props) {
  return (
    <div
      style={{
        marginTop: "2rem",
        padding: "1rem",
        backgroundColor: "#1a1a1a",
        borderRadius: "8px",
        textAlign: "center",
      }}
    >
      <h3 style={{ color: "#ffffff", marginBottom: "1rem" }}>Your Ticket QR</h3>
      <img
        src={qrCode}
        alt="Ticket QR"
        style={{
          width: "200px",
          height: "200px",
          objectFit: "contain",
          border: "1px solid #444",
          borderRadius: "4px",
        }}
      />
    </div>
  );
}
