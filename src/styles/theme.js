// src/styles/theme.js

export const styles = {
  // ANA KUTU (Sıkılaştırıldı)
  wrapper: {
    width: "98vw",
    maxWidth: "1300px",
    height: "95vh",
    maxHeight: "800px", // Yükseklik sınırı
    backgroundColor: "#0f172a",
    borderRadius: "20px", // Köşeler biraz daha keskinleşti
    border: "1px solid #1e293b",
    boxShadow: "0 0 60px rgba(0, 0, 0, 0.3)", // Gölge koyulaştı
    padding: "20px", // Dış boşluk azaldı (32 -> 20)
    display: "flex",
    flexDirection: "column",
    gap: "12px", // Ana elemanlar arası boşluk azaldı (24 -> 12)
    boxSizing: "border-box",
    position: "relative",
    fontFamily: "'Inter', sans-serif",
    overflow: "hidden", // Dışarı taşmayı engelle
  },

  // HEADER (Daha İnce)
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: "12px", // (20 -> 12)
    borderBottom: "1px solid #1e293b",
    minHeight: "40px", // Yükseklik azaldı
    flexShrink: 0, // Header asla küçülmesin
  },
  headerLeft: { display: "flex", alignItems: "center", gap: "12px" },
  headerIcon: { fontSize: "24px" },
  headerTitle: { fontSize: "18px", fontWeight: "700", color: "#f8fafc", margin: 0 },
  headerSubtitle: { fontSize: "12px", color: "#94a3b8", marginTop: "2px" },
  headerBadge: {
    fontSize: "11px",
    padding: "4px 10px",
    borderRadius: "12px",
    border: "1px solid #3b82f6",
    color: "#e0f2fe",
    background: "rgba(59, 130, 246, 0.15)",
  },
  headerRestartButton: {
    fontSize: "11px",
    padding: "6px 16px",
    borderRadius: "12px",
    border: "1px solid #475569",
    background: "transparent",
    color: "#cbd5e1",
    cursor: "pointer",
    marginLeft: "10px",
  },

  // LAYOUT
  mainRow: {
    display: "grid",
    gridTemplateColumns: "2.2fr 1fr", // İçerik alanı biraz daha genişletildi
    gap: "20px", // (32 -> 20)
    height: "100%",
    overflow: "hidden", // Taşanları gizle (Scroll çıkmasın diye)
  },

  // SOL TARAF (İçerik)
  mainCard: {
    display: "flex",
    flexDirection: "column",
    gap: "8px", // İçerik arası boşluklar çok azaldı
    overflowY: "hidden", // Scroll kapalı, sığdıracağız
    justifyContent: "flex-start",
    height: "100%",
  },

  // SAĞ TARAF (Panel)
  sideCard: {
    backgroundColor: "#020617",
    borderRadius: "16px",
    border: "1px solid #1f2937",
    padding: "16px", // (24 -> 16)
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    height: "100%", // Paneli tam boy yap
    overflowY: "auto", // Sadece gerekirse panel kaydırılsın
  },
  sideTitle: {
    fontSize: "15px",
    fontWeight: "700",
    color: "#93c5fd",
    margin: "0 0 8px 0",
  },

  // METİNLER (Kompakt)
  phaseTitle: {
    fontSize: "18px", // (22 -> 18)
    fontWeight: "700",
    color: "#60a5fa",
    marginBottom: "4px",
    marginTop: 0,
  },
  storyText: {
    fontSize: "14px", // (16 -> 14)
    lineHeight: "1.4", // Satır aralığı sıkılaştı
    color: "#cbd5e1",
    marginBottom: "8px",
  },
  storyBox: {
    background: "#1e293b",
    padding: "16px",
    borderRadius: "12px",
    borderLeft: "4px solid #f97316",
    marginBottom: "12px",
  },

  // AKSİYON GRİD (Daha Sıkı)
  actionsGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr", // Sabit 2 sütun
    gap: "12px", // Kartlar birbirine yaklaştı
    marginTop: "4px",
  },
  actionCard: {
    background: "#111827",
    border: "1px solid #374151",
    borderRadius: "12px",
    padding: "16px", // (24 -> 16)
    textAlign: "left",
    cursor: "pointer",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    minHeight: "130px", // Yükseklik azaldı (160 -> 130)
    transition: "all 0.2s ease",
  },
  actionTitle: {
    fontSize: "15px",
    fontWeight: "700",
    color: "#ec4899",
    marginBottom: "4px",
  },
  actionTooltip: {
    fontSize: "12px", // (14 -> 12)
    color: "#94a3b8",
    lineHeight: "1.3",
    marginBottom: "0px",
    flexGrow: 1,
  },
  actionCosts: {
    marginTop: "8px",
    paddingTop: "8px",
    borderTop: "1px solid #1e293b",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between", // İkonları yay
    gap: "8px",
    fontSize: "12px",
    fontWeight: "600",
    color: "#94a3b8",
  },

  // METRİKLER & KAYNAKLAR
  resourceBox: {
    padding: "10px 16px", // (16 -> 10)
    borderRadius: "12px",
    border: "1px solid #334155",
    background: "#020617",
    marginBottom: "8px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "12px",
    color: "#e2e8f0",
    fontSize: "13px",
  },
  metricLabelRow: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: "12px",
    fontWeight: "600",
    color: "#e2e8f0",
    marginBottom: "2px",
  },
  metricBarTrack: {
    width: "100%",
    height: "6px", // (8 -> 6)
    borderRadius: "99px",
    background: "#374151",
    overflow: "hidden",
    marginBottom: "8px",
  },
  metricBarFill: {
    height: "100%",
    borderRadius: "99px",
    background: "#a3e635",
    transition: "width 0.4s ease",
  },

  // DİĞERLERİ
  advisorsGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginTop: "4px" },
  advisorCard: { borderRadius: "12px", border: "1px solid #334155", padding: "12px", background: "rgba(30, 41, 59, 0.5)", display: "flex", flexDirection: "column", gap: "6px" },
  advisorName: { fontSize: "14px", fontWeight: "700", color: "#38bdf8", marginBottom: "2px" },
  advisorText: { fontSize: "12px", color: "#e2e8f0", lineHeight: "1.4" },
  newsBox: { marginTop: "auto", border: "1px solid #1e293b", background: "#020617", padding: "10px", borderRadius: "8px", fontSize: "12px" },
  actionsRow: { marginTop: "12px", display: "flex", justifyContent: "center" },
  successButton: { padding: "10px 32px", background: "#22c55e", color: "#020617", border: "none", borderRadius: "99px", cursor: "pointer", fontWeight: "700", fontSize: "14px", transition: "transform 0.1s", boxShadow: "0 4px 12px rgba(34, 197, 94, 0.3)" },
  primaryButton: { padding: "10px 24px", background: "#2563eb", color: "white", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "600", fontSize: "13px" },
  chipRow: { display: "flex", gap: "8px", marginTop: "8px" },
};