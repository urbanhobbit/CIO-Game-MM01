import React from "react";

export default function Chip({ label, active, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        padding: "4px 10px",
        borderRadius: 999,
        border: active ? "1px solid #f97316" : "1px solid #4b5563",
        background: active ? "#0f172a" : "#020617",
        color: "#e5e7eb",
        fontSize: 12,
        cursor: "pointer",
      }}
    >
      {label}
    </button>
  );
}