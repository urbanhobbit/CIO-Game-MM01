import React from "react";
import { styles } from "../../styles/theme";
import Chip from "../common/Chip";

export default function StartScreen({
  allScenarioIds,
  selectedIds,
  setSelectedIds,
  onStart,
  onStartTutorial,
  mode,
  setMode,
  isKids,
  scenariosData,
}) {
  const toggleId = (id) => {
    const next = new Set(selectedIds);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelectedIds(next);
  };

  return (
    <div style={styles.mainCard}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
        <span style={{ fontSize: 12, color: "#9ca3af" }}>Profil seç:</span>
        <Chip label="Yetişkin" active={mode === "adult"} onClick={() => setMode("adult")} />
        <Chip label="Çocuk (10–12)" active={mode === "kids"} onClick={() => setMode("kids")} />
      </div>

      <h2 style={styles.phaseTitle}>
        {isKids ? "Hoş Geldin, karar verici!" : "Hoş Geldin!"}
      </h2>
      <p style={styles.storyText}>
        {isKids
          ? "Bu oyunda hayali bir ülkede kriz zamanlarında karar veren ekibin parçasısın..."
          : "Bu oyunda bir ada ülkesinin kriz anlarında bilgi ve politika kararlarını veren ekibin parçasısın..."}
      </p>
      
      <div style={{ marginTop: 12 }}>
        <h3 style={styles.sideTitle}>
          {isKids ? "Bu oyunda karşılaşacağın görevler" : "Bu oyunda oynanacak krizler"}
        </h3>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {allScenarioIds.map((id) => (
            <label
              key={id}
              style={{
                borderRadius: 999,
                border: selectedIds.has(id) ? "1px solid #38bdf8" : "1px solid #374151",
                padding: "4px 10px",
                fontSize: 13,
                cursor: "pointer",
                background: selectedIds.has(id) ? "#0f172a" : "#020617",
              }}
            >
              <input
                type="checkbox"
                checked={selectedIds.has(id)}
                onChange={() => toggleId(id)}
                style={{ marginRight: 6 }}
              />
              {scenariosData[id].icon} {scenariosData[id].title}
            </label>
          ))}
        </div>
      </div>

      <div style={{ ...styles.actionsRow, gap: 8 }}>
        <button style={styles.primaryButton} onClick={onStartTutorial}>
          🎓 Eğitimle Başla
        </button>
        <button
          style={{ ...styles.primaryButton, background: "linear-gradient(to right,#64748b,#0f172a)", color: "#e5e7eb" }}
          onClick={onStart}
        >
          ⚡ Doğrudan Oyuna Başla
        </button>
      </div>
    </div>
  );
}