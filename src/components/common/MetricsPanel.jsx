import React from "react";
import { styles } from "../../styles/theme";
import { clamp } from "../../utils/gameUtils";

export default function MetricsPanel({ metrics, budget, hr, isKids = false }) {
  const rows = [
    ["💰 Bütçe", budget, 100],
    ["👥 İnsan Kaynağı", hr, 50],
    ["🛡️ Güvenlik", metrics.security, 100],
    ["🗽 Özgürlük", metrics.freedom, 100],
    ["🤝 Kamu Güveni", metrics.public_trust, 100],
    ["💪 Dayanıklılık", metrics.resilience, 100],
    ["😩 Uyum Yorgunluğu", metrics.fatigue, 100],
  ];
  
  return (
    <div style={{ marginTop: 10 }}>
      <h3 style={styles.sideTitle}>
        {isKids ? "Ülke durumu" : "Gösterge Paneli"}
      </h3>
      {rows.map(([label, value, max]) => {
        const ratio = clamp(value / max, 0, 1);
        return (
          <div key={label} style={{ marginBottom: 6 }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12 }}>
              <span>{label}</span>
              <span>{value.toFixed(1)}</span>
            </div>
            <div style={styles.metricBarTrack}>
              <div style={{ ...styles.metricBarFill, width: `${ratio * 100}%` }} />
            </div>
          </div>
        );
      })}
      <p style={{ ...styles.storyText, fontSize: 11, marginTop: 6 }}>
        {isKids
          ? "Uyum yorgunluğu 50’yi geçerse insanlar ‘Yeter artık!’ demeye başlar."
          : "Uyum yorgunluğu 50’yi geçtiğinde meşruiyet krizi riski artar."}
      </p>
    </div>
  );
}