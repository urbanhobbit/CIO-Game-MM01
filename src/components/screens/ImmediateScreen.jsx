import React from "react";
import { styles } from "../../styles/theme";

function ResultLine({ label, before, after, diff }) {
  return (
    <div style={styles.resultLine}>
      <span>{label}:</span>
      <span style={{ marginLeft: 6 }}>{before.toFixed(1)} → {after.toFixed(1)}</span>
      <span style={styles.diffText}>({diff})</span>
    </div>
  );
}

export default function ImmediateScreen({ scenario, results, metricsBefore, metricsAfter, onNext, isKids = false }) {
  const diff = (a, b) => (a - b).toFixed(1);
  const text = results.skipped
    ? (isKids ? "Hiçbir şey yapmadığın için kriz büyüdü." : "Kaynak yetersizliği nedeniyle müdahale edilemedi.")
    : scenario.immediate_text.replace("{}", results.actionName || "");

  return (
    <>
      <h2 style={styles.phaseTitle}>{isKids ? "Hemen neler oldu?" : "Anında Etkiler"}</h2>
      <p style={styles.storyText}>{text}</p>
      <div style={styles.resultGrid}>
        <ResultLine label="🛡️ Güvenlik" before={metricsBefore.security} after={metricsAfter.security} diff={diff(metricsAfter.security, metricsBefore.security)} />
        <ResultLine label="🗽 Özgürlük" before={metricsBefore.freedom} after={metricsAfter.freedom} diff={diff(metricsAfter.freedom, metricsBefore.freedom)} />
        {/* Diğer satırlar... */}
      </div>
      <div style={styles.actionsRow}>
        <button style={styles.primaryButton} onClick={onNext}>{isKids ? "Bir süre sonra..." : "Bir süre sonra..."}</button>
      </div>
    </>
  );
}