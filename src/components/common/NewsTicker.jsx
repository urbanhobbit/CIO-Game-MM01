import React from "react";
import { styles } from "../../styles/theme";

export default function NewsTicker({ news, compact = false, isKids = false }) {
  return (
    <div style={compact ? styles.newsCompact : styles.newsBox}>
      <div style={{ fontSize: 12, color: "#a5b4fc", marginBottom: 4 }}>
        {isKids ? "Haber akışı" : "Haber Akışı"}
      </div>
      {news.map((n, i) => (
        <div key={i} style={{ fontSize: 12, marginBottom: 2 }}>
          • {n}
        </div>
      ))}
    </div>
  );
}