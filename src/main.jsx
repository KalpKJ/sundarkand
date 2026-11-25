import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource/tiro-devanagari-hindi/400.css'
import '@fontsource/rozha-one/400.css'
import '@fontsource/hanken-grotesk/400.css'
import '@fontsource/hanken-grotesk/500.css'
import '@fontsource/hanken-grotesk/600.css'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
