import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { SessionProvider } from './context/sessionToken.tsx'
import { ModalProvider } from './context/modalContext.tsx'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
    <SessionProvider>
    <ModalProvider>
    <App />-
    </ModalProvider>
    </SessionProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
