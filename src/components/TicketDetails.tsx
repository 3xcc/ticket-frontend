import dayjs from "dayjs";

interface TicketPayload {
  name: string;
  id_card_number: string;
  date_of_birth: string;
  phone_number: string;
}

export default function TicketDetails({ payload }: { payload: TicketPayload }) {
  const dob = dayjs(payload.date_of_birth);
  const age = dayjs().diff(dob, "year");

  return (
    <div
      style={{
        marginTop: "2rem",
        padding: "1rem",
        backgroundColor: "#1a1a1a",
        borderRadius: "8px",
      }}
    >
      <h3 style={{ color: "#ffffff", marginBottom: "1rem" }}>Ticket Details</h3>
      <p style={{ color: "#cccccc" }}>Name: {payload.name}</p>
      <p style={{ color: "#cccccc" }}>ID Card Number: {payload.id_card_number}</p>
      <p style={{ color: "#cccccc" }}>
        Date of Birth: {payload.date_of_birth} (Age: {age})
      </p>
      <p style={{ color: "#cccccc" }}>Phone Number: {payload.phone_number}</p>
    </div>
  );
}
