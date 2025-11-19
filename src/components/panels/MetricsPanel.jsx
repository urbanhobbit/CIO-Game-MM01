import React from "react";
import { styles } from "../../styles/theme";
import { clamp } from "../../utils/gameUtils";

export default function MetricsPanel({ metrics, budget, hr, isKids = false }) {
  // İkonları görseldeki sıraya göre ekledim
  const items = [
    { label: "💰 Bütçe", value: budget, max: 150 }, // Örnek max değer
    { label: "👥 İnsan Kaynağı", value: hr, max: 100 },
    { label: "🛡️ Güvenlik", value: metrics.security, max: 100 },
    { label: "🗽 Özgürlük", value: metrics.freedom, max: 100 },
    { label: "🤝 Kamu Güveni", value: metrics.public_trust, max: 100 },
    { label: "💪 Dayanıklılık", value: metrics.resilience, max: 100 },
    { label: "😩 Uyum Yorgunluğu", value: metrics.fatigue, max: 100 },
  ];

  return (
    <div style={{ marginTop: 0 }}>
      <h3 style={styles.sideTitle}>
        {isKids ? "Ülke Durumu" : "Gösterge Paneli"}
      </h3>

      {items.map((item, idx) => {
        const ratio = clamp(item.value / item.max, 0, 1) * 100;
        return (
          <div key={idx} style={{ marginBottom: 12 }}>
            <div style={styles.metricLabelRow}>
              <span>{item.label}</span>
              <span>{item.value.toFixed(1)}</span>
            </div>
            <div style={styles.metricBarTrack}>
              <div 
                style={{ 
                  ...styles.metricBarFill, 
                  width: `${ratio}%`,
                  // Yorgunluk artarsa rengi kırmızıya çalsın (Opsiyonel detay)
                  backgroundColor: item.label.includes("Yorgunluk") && ratio > 50 ? "#f87171" : styles.metricBarFill.background
                }} 
              />
            </div>
          </div>
        );
      })}
      
      <p style={{ fontSize: 11, color: "#94a3b8", marginTop: 12, lineHeight: 1.4 }}>
        {isKids 
          ? "Göstergeleri dengede tutmaya çalış." 
          : "Uyum yorgunluğu 50'yi geçtiğinde meşruiyet krizi riski artar. Güvenlik kazanımlarını korumak için kamu güveni ve özgürlükleri de gözetmek gerekir."}
      </p>
    </div>
  );
}