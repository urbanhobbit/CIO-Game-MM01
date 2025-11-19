import React from 'react'
import FullGame from './FullGame'

function App() {
  return (
    <div 
      style={{ 
        width: "100vw", 
        height: "100vh", 
        backgroundColor: "#020617",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Inter', system-ui, sans-serif",
        overflow: "hidden"
      }}
    >
      <FullGame />
    </div>
  )
}

export default App