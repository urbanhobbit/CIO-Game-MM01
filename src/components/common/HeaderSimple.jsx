import React from "react";
import { styles } from "../../styles/theme";

export default function HeaderSimple({ isKids = false, onRestart }) {
  return (
    <div style={styles.header}>
      <div style={styles.headerLeft}>
        <span style={styles.headerIcon}>🛡️</span>
        <div>
          <div style={styles.headerTitle}>
            {isKids ? "Kriz Oyunu: Ülkeni Koru" : "CIO Kriz Yönetimi Oyunu"}
          </div>
          <div style={styles.headerSubtitle}>
            {isKids
              ? "Güvenlik ile özgürlük arasında adil bir denge kur."
              : "Bilgi düzensizlikleri ve haklar arasında denge kur."}
          </div>
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <div style={styles.headerBadge}>
          {isKids ? "Çocuk Modu" : "Tam Sürüm (React)"}
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