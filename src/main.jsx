import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext.jsx'
import { SpotifyPlayerProvider } from './context/SpotifyPlayerContext.jsx'
import { CaseStudyProgressProvider } from './context/CaseStudyProgressContext.jsx'
import App from './App.jsx'
import './index.css'

history.scrollRestoration = 'manual'

// On reload while on a case-study page, silently rewrite the URL to /
// before React Router initialises so the homepage always renders on refresh.
const _navType = performance.getEntriesByType('navigation')[0]?.type
if (_navType === 'reload' && window.location.pathname !== '/') {
  history.replaceState(null, '', '/')
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter basename={import.meta.env.BASE_URL}>
    <ThemeProvider>
      <SpotifyPlayerProvider>
        <CaseStudyProgressProvider>
          <App />
        </CaseStudyProgressProvider>
      </SpotifyPlayerProvider>
    </ThemeProvider>
  </BrowserRouter>,
)
