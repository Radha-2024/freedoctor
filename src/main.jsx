import React from 'react'
import ReactDOM from 'react-dom/client'
import '../index.css'

function App() {
  return (
    <div>
      <h1>Free Doctor</h1>
      <p>Welcome to Free Doctor App</p>
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)