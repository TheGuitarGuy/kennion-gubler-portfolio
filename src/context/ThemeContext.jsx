import { createContext, useContext, useEffect, useState } from 'react'

const ThemeContext = createContext()

function getAutoMode() {
  const h = new Date().getHours()
  if (h >= 6 && h < 17) return 'day'
  if (h >= 17 && h < 20) return 'sunset'
  return 'night'
}

export function ThemeProvider({ children }) {
  const [mode, setModeState] = useState(getAutoMode)
  const [manualOverride, setManualOverride] = useState(false)

  // Auto-update every minute unless user has manually chosen a mode
  useEffect(() => {
    if (manualOverride) return
    const tick = setInterval(() => setModeState(getAutoMode()), 60_000)
    return () => clearInterval(tick)
  }, [manualOverride])

  useEffect(() => {
    const html = document.documentElement
    html.classList.remove('night', 'sunset')
    if (mode === 'night') html.classList.add('night')
    if (mode === 'sunset') html.classList.add('sunset')
  }, [mode])

  const setMode = (m) => {
    setManualOverride(true)
    setModeState(m)
  }

  const cycleMode = () => {
    const next = { day: 'sunset', sunset: 'night', night: 'day' }[mode]
    setMode(next)
  }

  return (
    <ThemeContext.Provider value={{
      mode,
      night:  mode === 'night',
      sunset: mode === 'sunset',
      day:    mode === 'day',
      setMode,
      toggle: cycleMode,
    }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  return useContext(ThemeContext)
}
