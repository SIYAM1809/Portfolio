import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async';
import './index.css'
import App from './App.jsx'

import { PortfolioProvider } from './context/PortfolioContext.jsx';

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <HelmetProvider>
            <PortfolioProvider>
                <App />
            </PortfolioProvider>
        </HelmetProvider>
    </StrictMode>,
)
