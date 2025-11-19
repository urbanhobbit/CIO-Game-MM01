import React from 'react'  // <-- BU SATIR EKSİK OLABİLİR
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css' // Eğer css dosyan varsa kalsın, yoksa bu satırı sil

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)