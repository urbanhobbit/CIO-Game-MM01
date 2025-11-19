import React from "react";
import { styles } from "../../styles/theme";
import NewsTicker from "../panels/NewsTicker";

export default function AdvisorsScreen({ scenario, news, onNext, isKids = false }) {
  return (
    <>
      {/* Başlık */}
      <h2 style={styles.phaseTitle}>
        {isKids ? "Danışmanların ne diyor?" : "Danışman Görüşleri"}
      </h2>
      
      {/* Açıklama Metni */}
      <p style={styles.storyText}>
        {isKids
          ? "Burada farklı danışmanlardan fikirler duyacaksın. Karar verirken hepsini düşün."
          : "Farklı danışmanlar sana farklı değerleri öne çıkaran çözümler sunuyor. Sadece “güvenlik” değil, özgürlük ve meşruiyet maliyetini de düşün."}
      </p>

      {/* 2x2 Grid Yapısı */}
      <div style={styles.advisorsGrid}>
        {scenario.advisors.map((a, i) => (
          <div key={i} style={styles.advisorCard}>
            <div style={styles.advisorName}>{a.name}</div>
            {/* Metin içindeki ✅ ve ❌ ikonlarını renklendirmek istersen basit bir render mantığı: */}
            <div style={styles.advisorText}>
               {a.text}
            </div>
          </div>
        ))}
      </div>

      {/* Haber Akışı Bölümü (Altta sabit duracak şekilde) */}
      <div style={{ marginTop: "auto", paddingTop: "20px" }}>
         <div style={{ fontSize: "12px", color: "#93c5fd", marginBottom: "6px" }}>
            Haber Akışı
         </div>
         <div style={{ 
             border: "1px solid #1e293b", 
             borderRadius: "8px", 
             padding: "10px", 
             background: "#020617",
             fontSize: "13px",
             color: "#cbd5e1"
         }}>
            {news.length > 0 ? `• ${news[0]}` : "• Haber akışı bekleniyor..."}
         </div>
      </div>

      {/* Yeşil Buton (Ortalanmış) */}
      <div style={styles.actionsRow}>
        <button style={styles.successButton} onClick={onNext}>
          {isKids ? "Karar ver" : "Karar aşamasına geç"}
        </button>
      </div>
    </>
  );
}