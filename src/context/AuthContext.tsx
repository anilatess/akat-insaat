import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react'
import { api, tokenStore } from '../lib/api'
import type { Admin } from '../types'

type AuthValue = {
  user: Admin | null
  loading: boolean
  login: (username: string, password: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<Admin | null>(null)
  // Start in "loading" only when a token exists and must be validated.
  const [loading, setLoading] = useState<boolean>(() => !!tokenStore.get())

  useEffect(() => {
    const token = tokenStore.get()
    if (!token) return
    let active = true
    api
      .me()
      .then((r) => {
        if (active) setUser(r.user)
      })
      .catch(() => {
        tokenStore.clear()
      })
      .finally(() => {
        if (active) setLoading(false)
      })
    return () => {
      active = false
    }
  }, [])

  const login = useCallback(async (username: string, password: string) => {
    const { token, user } = await api.login(username, password)
    tokenStore.set(token)
    setUser(user)
  }, [])

  const logout = useCallback(() => {
    tokenStore.clear()
    setUser(null)
  }, [])

  // When any API call detects an expired/invalid token, drop the session so
  // ProtectedRoute sends the user back to the login screen.
  useEffect(() => {
    const onExpired = () => setUser(null)
    window.addEventListener('auth:expired', onExpired)
    return () => window.removeEventListener('auth:expired', onExpired)
  }, [])

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
