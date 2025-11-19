import React from "react";
import { styles } from "../../styles/theme";

export default function ReportScreen({
  metricsBefore,
  metricsAfter,
  results,
  onNext,
  isKids = false,
}) {
  const s = (v) => v.toFixed(1);
  
  // İngilizce key'leri Türkçe'ye çevirmek için harita
  const labels = {
    security: "Güvenlik",
    freedom: "Özgürlük",
    public_trust: "Kamu Güveni",
    resilience: "Dayanıklılık",
    fatigue: "Uyum Yorgunluğu"
  };

  return (
    <>
      <h2 style={styles.phaseTitle}>
        {isKids ? "Görev özeti" : "Kriz Sonu Raporu"}
      </h2>
      
      <div
        style={{
          borderRadius: 16,
          border: "1px solid #374151",
          padding: 20,
          background: "#020617",
          marginBottom: 20,
        }}
      >
        <h3 style={{ marginTop: 0, fontSize: 16, color: "#cbd5e1", marginBottom: 12 }}>
          Gösterge Değişimleri
        </h3>
        <table style={{ width: "100%", fontSize: 14, borderSpacing: 0, color: "#e2e8f0" }}>
          <thead>
            <tr>
              <th align="left" style={{paddingBottom: 8, color: "#94a3b8"}}>Gösterge</th>
              <th align="right" style={{paddingBottom: 8, color: "#94a3b8"}}>Başlangıç</th>
              <th align="right" style={{paddingBottom: 8, color: "#94a3b8"}}>Son</th>
            </tr>
          </thead>
          <tbody>
            {["security", "freedom", "public_trust", "resilience", "fatigue"].map(
              (key) => (
                <tr key={key}>
                  <td style={{padding: "8px 0", borderTop: "1px solid #1e293b"}}>{labels[key]}</td>
                  <td align="right" style={{padding: "8px 0", borderTop: "1px solid #1e293b", color: "#fbbf24"}}>{s(metricsBefore[key])}</td>
                  <td align="right" style={{padding: "8px 0", borderTop: "1px solid #1e293b", color: "#a3e635", fontWeight: "bold"}}>{s(metricsAfter[key])}</td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>

      <div style={{ marginBottom: 20 }}>
         <h3 style={{ fontSize: 16, color: "#cbd5e1", marginBottom: 8 }}>Alternatif Senaryo Analizi</h3>
         <p style={{...styles.storyText, fontStyle: "italic", color: "#94a3b8"}}>
            "{results.counter_factual}"
         </p>
      </div>

      <div style={styles.actionsRow}>
        <button style={styles.successButton} onClick={onNext}>
          {isKids ? "Sıradaki Görev" : "Sonraki Krize Geç"}
        </button>
      </div>
    </>
  );
}