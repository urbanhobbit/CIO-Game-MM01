import React, { useMemo } from "react";
import { styles } from "../../styles/theme";

export default function StoryScreen({ scenario, onNext, isKids = false }) {
  const [reportPart, missionPart] = useMemo(() => {
    const marker = "**Görev**:";
    const idx = scenario.story.indexOf(marker);
    if (idx === -1) return [scenario.story, ""];
    return [
      scenario.story.slice(0, idx),
      scenario.story.slice(idx + marker.length),
    ];
  }, [scenario.story]);

  return (
    <>
      <h2 style={styles.phaseTitle}>
        {isKids ? "Ne oluyor?" : "Kriz Durumu"}
      </h2>
      
      {/* Okunabilirlik için kutu içine alındı */}
      <div style={styles.storyBox}>
        <p style={styles.storyText}>{reportPart}</p>
      </div>

      {missionPart && (
        <div
          style={{
            marginTop: 16,
            padding: 20,
            borderRadius: 16,
            border: "1px solid #4b5563",
            background: "#020617",
          }}
        >
          <h3 style={{ margin: 0, fontSize: 17, color: "#f97316", marginBottom: 8 }}>
            {isKids ? "Görevin" : "Kritik Görev"}
          </h3>
          <p style={{ ...styles.storyText, marginBottom: 0 }}>{missionPart}</p>
        </div>
      )}
      
      <div style={styles.actionsRow}>
        <button style={styles.successButton} onClick={onNext}>
          Danışmanları Dinle
        </button>
      </div>
    </>
  );
}