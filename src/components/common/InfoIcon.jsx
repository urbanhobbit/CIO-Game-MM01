import React from "react";

function Tooltip({ text }) {
  return (
    <div
      style={{
        position: "absolute",
        top: "100%",
        left: 0,
        marginTop: 4,
        background: "#1e293b",
        color: "#e2e8f0",
        padding: "6px 10px",
        borderRadius: 6,
        fontSize: 12,
        maxWidth: 220,
        boxShadow: "0 2px 6px rgba(0,0,0,0.4)",
        zIndex: 50,
      }}
    >
      {text}
    </div>
  );
}

export default function InfoIcon({ id, hoverKey, setHoverKey, text }) {
  return (
    <span
      style={{ position: "relative", display: "inline-block", marginLeft: 6 }}
      onMouseEnter={() => setHoverKey(id)}
      onMouseLeave={() => setHoverKey(null)}
    >
      <span style={{ cursor: "pointer", fontSize: 11, color: "#93c5fd" }}>
        ⓘ
      </span>
      {hoverKey === id && <Tooltip text={text} />}
    </span>
  );
}