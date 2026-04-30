import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext.jsx'
import { SpotifyPlayerProvider } from './context/SpotifyPlayerContext.jsx'
import { CaseStudyProgressProvider } from './context/CaseStudyProgressContext.jsx'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <ThemeProvider>
      <SpotifyPlayerProvider>
        <CaseStudyProgressProvider>
          <App />
        </CaseStudyProgressProvider>
      </SpotifyPlayerProvider>
    </ThemeProvider>
  </BrowserRouter>,
)
