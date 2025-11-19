import React, { useMemo } from "react";
import { styles } from "../../styles/theme";
import { LineChart, Line, XAxis, YAxis, Tooltip as RechartsTooltip, Legend, ResponsiveContainer } from "recharts";

export default function EndScreen({ metrics, budget, hr, history, onRestart, isKids = false }) {
  const score = ((metrics.security + metrics.freedom + metrics.public_trust) / 3).toFixed(1);
  const timelineData = useMemo(() => {
    const data = history.map((m, idx) => ({ step: idx === 0 ? "Başlangıç" : `Kriz ${idx}`, ...m }));
    data.push({ step: "Son", ...metrics });
    return data;
  }, [history, metrics]);

  return (
    <div style={styles.endMain}>
      <h2 style={styles.phaseTitle}>{isKids ? "Oyun Bitti" : "Oyun Sonu"}</h2>
      <p style={styles.storyText}>Liderlik Skoru: <strong>{score} / 100</strong></p>
      
      <div style={{ width: "100%", height: 220, marginTop: 12 }}>
        <ResponsiveContainer>
          <LineChart data={timelineData}>
            <XAxis dataKey="step" fontSize={11} />
            <YAxis domain={[0, 100]} fontSize={11} />
            <RechartsTooltip />
            <Legend />
            <Line type="monotone" dataKey="security" stroke="#22c55e" dot={false} />
            <Line type="monotone" dataKey="freedom" stroke="#f97316" dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div style={styles.actionsRow}>
        <button style={styles.primaryButton} onClick={onRestart}>Yeniden Oyna</button>
      </div>
    </div>
  );
}