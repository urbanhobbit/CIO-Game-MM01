// src/App.jsx
import React from 'react'
import FullGame from './FullGame'

function App() {
  return (
    <div 
      style={{ 
        width: "100vw", 
        height: "100vh", 
        backgroundColor: "#020617", // En dıştaki koyu lacivert
        display: "flex",
        alignItems: "center",     // Dikey ortalama
        justifyContent: "center", // Yatay ortalama
        fontFamily: "'Inter', system-ui, sans-serif",
        overflow: "hidden"
      }}
    >
      <FullGame />
    </div>
  )
}

export default App