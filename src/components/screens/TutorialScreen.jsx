import React, { useState } from "react";
import { styles } from "../../styles/theme";
import { clamp } from "../../utils/gameUtils";

function TutorialMetricBar({ label, value }) {
  const safe = typeof value === "number" ? clamp(value, 0, 100) : 0;
  return (
    <div style={{ marginBottom: 4 }}>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "#e5e7eb" }}>
        <span>{label}</span>
        <span>{safe.toFixed(1)}</span>
      </div>
      <div style={styles.metricBarTrack}>
        <div style={{ ...styles.metricBarFill, width: `${safe}%` }} />
      </div>
    </div>
  );
}

export default function TutorialScreen({ onNext, isKids = false }) {
  const [demoMetrics, setDemoMetrics] = useState({
    security: 50, freedom: 50, public_trust: 50, resilience: 50, fatigue: 10,
  });

  const applyDemo = (type) => {
    setDemoMetrics((prev) => {
      let next = { ...prev };
      if (type === "security_first") {
        next.security = clamp(prev.security + 20);
        next.freedom = clamp(prev.freedom - 15);
        next.public_trust = clamp(prev.public_trust - 5);
        next.resilience = clamp(prev.resilience + 5);
        next.fatigue = clamp(prev.fatigue + 10);
      } else if (type === "freedom_first") {
        next.security = clamp(prev.security + 5);
        next.freedom = clamp(prev.freedom + 15);
        next.public_trust = clamp(prev.public_trust + 10);
        next.resilience = clamp(prev.resilience + 8);
        next.fatigue = clamp(prev.fatigue + 3);
      }
      return next;
    });
  };

  return (
    <>
      <h2 style={styles.phaseTitle}>{isKids ? "Kısa Eğitim" : "Kısa Eğitim (Deneme Tur)"}</h2>
      <p style={styles.storyText}>
        {isKids
          ? "Her turda üç adım var: Hikaye, Danışmanlar ve Karar. Sağdaki panelde ülkenin durumu değişir."
          : "Oyunda her turda üç aşama var: Kriz Hikayesi, Danışmanlar ve Aksiyon. Sağdaki panel metrikleri gösterir."}
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 10, marginTop: 8 }}>
        {/* Advisor Card Examples for Tutorial */}
        <div style={styles.advisorCard}>
          <div style={styles.advisorName}>Göstergeler</div>
          <div style={styles.advisorText}>Güvenlik, Özgürlük, Kamu Güveni... Hepsini dengede tutmalısın.</div>
        </div>
      </div>

      <div style={{ marginTop: 14, padding: 10, borderRadius: 10, border: "1px solid #374151", background: "#020617", display: "grid", gridTemplateColumns: "minmax(0,1.3fr) minmax(0,1.2fr)", gap: 10 }}>
        <div>
          <div style={{ marginBottom: 6, fontSize: 14, fontWeight: 600 }}>Deneme: İki farklı karar</div>
          <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
            <button style={styles.primaryButton} onClick={() => applyDemo("security_first")}>🛡️ Güvenlik odaklı</button>
            <button style={{ ...styles.primaryButton, background: "linear-gradient(to right, #22d3ee, #6366f1)" }} onClick={() => applyDemo("freedom_first")}>🗽 Özgürlük odaklı</button>
          </div>
        </div>
        <div>
          <TutorialMetricBar label="🛡️ Güvenlik" value={demoMetrics.security} />
          <TutorialMetricBar label="🗽 Özgürlük" value={demoMetrics.freedom} />
        </div>
      </div>

      <div style={styles.actionsRow}>
        <button style={styles.primaryButton} onClick={onNext}>Eğitimi bitir, oyuna başla</button>
      </div>
    </>
  );
}