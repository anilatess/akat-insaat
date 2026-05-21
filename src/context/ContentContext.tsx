import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react'
import { api } from '../lib/api'
import { fallbackProjects, fallbackServices } from '../data/site'
import type { Project, Service } from '../types'

type ContentValue = {
  projects: Project[]
  services: Service[]
  loading: boolean
  refresh: () => Promise<void>
}

const ContentContext = createContext<ContentValue | null>(null)

export function ContentProvider({ children }: { children: ReactNode }) {
  const [projects, setProjects] = useState<Project[]>(fallbackProjects)
  const [services, setServices] = useState<Service[]>(fallbackServices)
  const [loading, setLoading] = useState(true)

  const refresh = useCallback(async () => {
    try {
      const [p, s] = await Promise.all([
        api.listProjects(),
        api.listServices(),
      ])
      if (Array.isArray(p) && p.length) setProjects(p)
      if (Array.isArray(s) && s.length) setServices(s)
    } catch {
      // API unreachable → keep fallback content so the site still renders.
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    // Initial content load from the backend (state is set only after the
    // async fetch resolves, not synchronously during the effect).
    // eslint-disable-next-line react-hooks/set-state-in-effect
    refresh()
  }, [refresh])

  return (
    <ContentContext.Provider value={{ projects, services, loading, refresh }}>
      {children}
    </ContentContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useContent() {
  const ctx = useContext(ContentContext)
  if (!ctx) throw new Error('useContent must be used within ContentProvider')
  return ctx
}
