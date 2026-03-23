import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './agsindex.css'
import { App } from './agsApp'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
