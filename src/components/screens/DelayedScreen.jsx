import React from "react";
import { styles } from "../../styles/theme";

export default function DelayedScreen({ scenario, results, isKids = false, onNext }) {
  const text = results.skipped
    ? (isKids ? "Zaman geçtikçe durum kötüleşti." : "Eylemsizliğin uzun vadeli sonuçları ağır oldu.")
    : scenario.delayed_text;

  return (
    <>
      <h2 style={styles.phaseTitle}>{isKids ? "Bir süre sonra..." : "Gecikmeli Etkiler"}</h2>
      <p style={styles.storyText}>{text}</p>
      <div style={styles.actionsRow}>
        <button style={styles.primaryButton} onClick={onNext}>{isKids ? "Raporu gör" : "Kriz raporunu gör"}</button>
      </div>
    </>
  );
}