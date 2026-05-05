import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx' // ✅ default import
import './index.css'
import AuthProvider from './context/authContext.jsx' // ✅ correct provider

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </StrictMode>
)