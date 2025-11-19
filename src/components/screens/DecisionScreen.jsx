import React, { useState } from "react";
import { styles } from "../../styles/theme";
import Chip from "../common/Chip";
import InfoIcon from "../common/InfoIcon";

const cleanTooltip = (text) => {
  if (!text) return "";
  return text.split("Maliyet:")[0].trim();
};

export default function DecisionScreen({
  scenario,
  budget,
  hr,
  onSkip,
  onApply,
  isKids = false,
}) {
  const [selectedId, setSelectedId] = useState(null);
  const [scope, setScope] = useState("targeted");
  const [duration, setDuration] = useState("short");
  const [safeguards, setSafeguards] = useState(new Set());
  const [hoverKey, setHoverKey] = useState(null);

  const affordable = scenario.action_cards.filter(
    (c) => budget >= c.cost && hr >= c.hr_cost
  );

  const toggleSafeguard = (key) => {
    setSafeguards((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  const handleApply = () => {
    const action = scenario.action_cards.find((c) => c.id === selectedId);
    if (!action) return;
    onApply({
      action,
      scope,
      duration,
      safeguards: Array.from(safeguards),
    });
  };

  return (
    <>
      {/* Üst Bilgi */}
      <div style={{ marginBottom: 10 }}>
        <h2 style={styles.phaseTitle}>
          {isKids ? "Karar zamanı" : "Karar Paneli"}
        </h2>
        <p style={styles.storyText}>
          {isKids
            ? "Şimdi bir karar kartı seçip ayarlarını yapacaksın."
            : "Bütçe ve kaynakları gözeterek en uygun politikayı belirle."}
        </p>
      </div>

      {/* Kaynak Kutusu (Daha ince) */}
      <div style={{ ...styles.resourceBox, padding: "12px 16px", marginBottom: "12px" }}>
        <span style={{ color: "#94a3b8", fontSize: "13px" }}>Mevcut Kaynaklar:</span>
        <div style={{ display: "flex", gap: "16px" }}>
          <span style={{ color: "#fbbf24", fontWeight: "700" }}>{budget.toFixed(0)} 💰</span>
          <span style={{ color: "#a78bfa", fontWeight: "700" }}>{hr.toFixed(0)} 👥</span>
        </div>
      </div>

      {affordable.length === 0 ? (
        <div>
          <p style={styles.storyText}>Kaynak yetersiz. Turu pas geçmek zorundasın.</p>
          <button style={styles.primaryButton} onClick={onSkip}>Turu atla</button>
        </div>
      ) : (
        <>
          {/* Grid Yapısı */}
          <div style={styles.actionsGrid}>
            {scenario.action_cards.map((card) => {
              const canPlay = budget >= card.cost && hr >= card.hr_cost;
              const isSelected = selectedId === card.id;

              return (
                <div
                  key={card.id}
                  onClick={() => canPlay && setSelectedId(card.id)}
                  style={{
                    ...styles.actionCard,
                    border: isSelected ? "2px solid #e879f9" : styles.actionCard.border,
                    background: isSelected ? "rgba(49, 46, 129, 0.3)" : styles.actionCard.background,
                    opacity: canPlay ? 1 : 0.5,
                    cursor: canPlay ? "pointer" : "not-allowed",
                    // Kart içeriğini yaymak için flex column
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between" 
                  }}
                >
                  <div>
                    <div style={styles.actionTitle}>{card.name}</div>
                    <div style={styles.actionTooltip}>{cleanTooltip(card.tooltip)}</div>
                  </div>

                  {/* --- YATAY MALİYETLER (Burayı Düzelttik) --- */}
                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between", // Sağa sola yay
                    marginTop: "12px",
                    paddingTop: "12px",
                    borderTop: "1px solid #1e293b"
                  }}>
                    {/* Maliyet */}
                    <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                       <span style={{ fontSize: "14px" }}>💰</span> 
                       <span style={{ color: "#e2e8f0", fontWeight: "600", fontSize: "13px" }}>{card.cost}</span>
                    </div>
                    
                    {/* İnsan Kaynağı */}
                    <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                       <span style={{ fontSize: "14px" }}>👥</span> 
                       <span style={{ color: "#e2e8f0", fontWeight: "600", fontSize: "13px" }}>{card.hr_cost}</span>
                    </div>

                    {/* Hız (Badge Görünümlü) */}
                    <div style={{ 
                        background: "rgba(244, 114, 182, 0.1)", 
                        padding: "2px 8px", 
                        borderRadius: "6px",
                        border: "1px solid rgba(244, 114, 182, 0.3)"
                    }}>
                       <span style={{ color: "#f472b6", fontSize: "11px", fontWeight: "bold", textTransform: "uppercase" }}>
                         ⚡ {card.speed}
                       </span>
                    </div>
                  </div>
                  {/* --- YATAY BİTİŞ --- */}

                </div>
              );
            })}
          </div>

          {/* Ayarlar Paneli */}
          {selectedId && (
            <div style={{ marginTop: 16, padding: 16, background: "#0b101b", borderRadius: 16, border: "1px solid #1e293b", animation: "fadeIn 0.3s" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                <h3 style={{ margin: 0, fontSize: "15px", color: "#93c5fd" }}>Politika Ayarları</h3>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(150px,1fr))", gap: 16 }}>
                <div>
                  <div style={{ marginBottom: 6, fontSize: 12, color: "#94a3b8", display: "flex", alignItems: "center" }}>
                    Kapsam <InfoIcon id="scope" hoverKey={hoverKey} setHoverKey={setHoverKey} text="Kapsam..." />
                  </div>
                  <div style={styles.chipRow}>
                    <Chip label="Hedefli" active={scope === "targeted"} onClick={() => setScope("targeted")} />
                    <Chip label="Genel" active={scope === "general"} onClick={() => setScope("general")} />
                  </div>
                </div>
                <div>
                  <div style={{ marginBottom: 6, fontSize: 12, color: "#94a3b8", display: "flex", alignItems: "center" }}>
                    Süre <InfoIcon id="dur" hoverKey={hoverKey} setHoverKey={setHoverKey} text="Süre..." />
                  </div>
                  <div style={styles.chipRow}>
                    <Chip label="Kısa" active={duration === "short"} onClick={() => setDuration("short")} />
                    <Chip label="Uzun" active={duration === "long"} onClick={() => setDuration("long")} />
                  </div>
                </div>
                <div>
                  <div style={{ marginBottom: 6, fontSize: 12, color: "#94a3b8", display: "flex", alignItems: "center" }}>
                    Güvenceler <InfoIcon id="safe" hoverKey={hoverKey} setHoverKey={setHoverKey} text="Güvenceler..." />
                  </div>
                  <div style={styles.chipRow}>
                    <Chip label="Şeffaflık" active={safeguards.has("transparency")} onClick={() => toggleSafeguard("transparency")} />
                    <Chip label="İtiraz" active={safeguards.has("appeal")} onClick={() => toggleSafeguard("appeal")} />
                  </div>
                </div>
              </div>

              <div style={styles.actionsRow}>
                <button style={styles.successButton} onClick={handleApply}>Uygula</button>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
}