export const StatusBadge = ({ status }: { status: string }) => {
  const base = "px-2 py-1 rounded text-xs font-semibold";
  const color =
    status === "valid" ? "bg-green-600 text-white" :
    status === "used" ? "bg-gray-400 text-white" :
    status === "invalid" ? "bg-red-600 text-white" :
    "bg-blue-600 text-white";

  return <span className={`${base} ${color}`}>{status}</span>;
};
