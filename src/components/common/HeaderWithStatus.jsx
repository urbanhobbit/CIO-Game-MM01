import React from "react";
import { styles } from "../../styles/theme";

export default function HeaderWithStatus({
  scenario,
  index,
  total,
  isKids = false,
  onRestart,
}) {
  return (
    <div style={styles.header}>
      <div style={styles.headerLeft}>
        <span style={styles.headerIcon}>{scenario.icon || "🧩"}</span>
        
        {/* DEĞİŞİKLİK BURADA: Yan yana (flex) hizalama */}
        <div style={{ display: "flex", alignItems: "baseline", gap: "12px" }}>
          <div style={styles.headerTitle}>{scenario.title}</div>
          <div style={{ ...styles.headerSubtitle, marginTop: 0 }}>
            <span style={{ opacity: 0.4, marginRight: 6 }}>|</span>
            {isKids
              ? `Görev ${index + 1} / ${total || "?"}`
              : `Kriz ${index + 1} / ${total || "?"}`}
          </div>
        </div>

      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <div style={styles.headerBadge}>
          {isKids ? "Çocuk Modu" : "CIO Kriz Yönetimi"}
        </div>
        {onRestart && (
          <button
            type="button"
            onClick={onRestart}
            style={styles.headerRestartButton}
          >
            Baştan Başla
          </button>
        )}
      </div>
    </div>
  );
}