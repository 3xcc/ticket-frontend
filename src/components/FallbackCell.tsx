// src/components/FallbackCell.tsx
export const FallbackCell = ({ value }: { value: string | null | undefined }) => (
  <td>{value ?? "—"}</td>
);