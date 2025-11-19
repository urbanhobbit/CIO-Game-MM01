// src/styles/theme.js

export const styles = {
  // ANA KUTU (Ekrana sığacak şekilde dinamik sınırlar)
  wrapper: {
    width: "98vw",
    maxWidth: "1300px",
    height: "95vh",
    maxHeight: "800px", 
    backgroundColor: "#0f172a",
    borderRadius: "20px", 
    border: "1px solid #1e293b",
    boxShadow: "0 0 60px rgba(0, 0, 0, 0.3)",
    padding: "24px",
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    boxSizing: "border-box",
    position: "relative",
    fontFamily: "'Inter', sans-serif",
    overflow: "hidden", 
  },

  // HEADER (Kompakt)
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: "12px",
    borderBottom: "1px solid #1e293b",
    minHeight: "40px",
    flexShrink: 0, 
  },
  headerLeft: { display: "flex", alignItems: "baseline", gap: "12px" }, // Başlıklar yan yana
  headerIcon: { fontSize: "24px" },
  headerTitle: { fontSize: "18px", fontWeight: "700", color: "#f8fafc", margin: 0 },
  headerSubtitle: { fontSize: "12px", color: "#94a3b8", marginTop: "2px" },

  // LAYOUT
  mainRow: {
    display: "grid",
    gridTemplateColumns: "2.2fr 1fr", // Desktop varsayılanı
    gap: "20px", 
    height: "100%",
    overflow: "hidden", 
  },

  // SOL TARAF
  mainCard: {
    display: "flex",
    flexDirection: "column",
    gap: "8px", 
    overflowY: "auto", // Gerekirse içeriği kaydır
    justifyContent: "flex-start",
    height: "100%",
  },

  // SAĞ TARAF
  sideCard: {
    backgroundColor: "#020617",
    borderRadius: "16px",
    border: "1px solid #1f2937",
    padding: "16px",
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    height: "100%", 
    overflowY: "auto", 
  },
  sideTitle: {
    fontSize: "15px",
    fontWeight: "700",
    color: "#93c5fd",
    margin: "0 0 8px 0",
  },

  // METİNLER (OKUNAKLI)
  phaseTitle: {
    fontSize: "18px",
    fontWeight: "700",
    color: "#60a5fa",
    marginBottom: "8px",
    marginTop: 0,
  },
  storyText: {
    fontSize: "14px",
    lineHeight: "1.5",
    color: "#e2e8f0",
    marginBottom: "8px",
  },
  storyBox: {
    background: "#1e293b",
    padding: "16px",
    borderRadius: "12px",
    borderLeft: "4px solid #f97316",
    marginBottom: "12px",
  },
  
  // AKSİYON GRİD
  actionsGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr", 
    gap: "12px",
    marginTop: "4px",
  },
  actionCard: {
    background: "#111827",
    border: "1px solid #374151",
    borderRadius: "12px",
    padding: "16px",
    textAlign: "left",
    cursor: "pointer",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    minHeight: "130px", 
    transition: "all 0.2s ease",
  },
  actionTitle: {
    fontSize: "15px",
    fontWeight: "700",
    color: "#ec4899",
    marginBottom: "4px",
  },
  actionTooltip: {
    fontSize: "12px",
    color: "#94a3b8",
    lineHeight: "1.4",
    marginBottom: "0px", 
    flexGrow: 1,
  },
  actionCosts: {
    marginTop: "8px",
    paddingTop: "8px",
    borderTop: "1px solid #1e293b",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "8px",
    fontSize: "12px",
    fontWeight: "600",
    color: "#94a3b8",
  },

  // METRİKLER & KAYNAKLAR
  resourceBox: {
    padding: "10px 16px",
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
  metricBarTrack: {
    width: "100%",
    height: "6px", 
    borderRadius: "99px",
    background: "#374151",
    overflow: "hidden",
    marginBottom: "8px",
  },
  metricBarFill: {
    height: "100%",
    borderRadius: "99px",
    background: "#a3e635", // Neon Yeşil
    transition: "width 0.4s ease",
  },
  chipRow: { display: "flex", gap: "8px", marginTop: "8px" },
};