// src/components/StatusBadge.tsx
export const StatusBadge = ({ status }: { status: string }) => {
  const color =
    status === "valid" ? "green" :
    status === "used" ? "gray" :
    status === "invalid" ? "red" : "blue";

  return (
    <span
      className={`px-2 py-1 rounded text-white text-xs font-semibold bg-${color}-600`}
    >
      {status}
    </span>
  );
};