import { createContext, useCallback, useContext, useState } from 'react'

const STORAGE_KEY = 'cs_visited'
export const CASE_STUDY_SLUGS = ['chatgpt', 'buy-for-me', 'askcr-bfm', 'ember', 'pod']

const Ctx = createContext(null)

export function CaseStudyProgressProvider({ children }) {
  const [visited, setVisited] = useState(() => {
    try {
      return new Set(JSON.parse(sessionStorage.getItem(STORAGE_KEY) || '[]'))
    } catch {
      return new Set()
    }
  })

  const markVisited = useCallback((slug) => {
    setVisited(prev => {
      if (prev.has(slug)) return prev
      const next = new Set(prev)
      next.add(slug)
      try { sessionStorage.setItem(STORAGE_KEY, JSON.stringify([...next])) } catch {}
      return next
    })
  }, [])

  return (
    <Ctx.Provider value={{
      visited,
      markVisited,
      total: CASE_STUDY_SLUGS.length,
      count: CASE_STUDY_SLUGS.filter(s => visited.has(s)).length,
      allSeen: CASE_STUDY_SLUGS.every(s => visited.has(s)),
    }}>
      {children}
    </Ctx.Provider>
  )
}

export const useCaseStudyProgress = () => useContext(Ctx)
