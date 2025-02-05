import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { QueryProvider } from '@/providers/query-provider'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryProvider>
        <App />
    </QueryProvider>
  </StrictMode>,
)
