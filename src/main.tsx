import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.css'
import App from './App.tsx'
import RootLayout from './rootLayout.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RootLayout>
    <App />
    </RootLayout>
  </StrictMode>,
)
