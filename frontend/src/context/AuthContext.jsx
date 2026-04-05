import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

export function AuthProvider({ children }) {
  const [user, setUser]     = useState(null)
  const [token, setToken]   = useState(() => localStorage.getItem('pyq_token'))
  const [loading, setLoading] = useState(true)

  // Load user on mount if token exists
  useEffect(() => {
    if (token) {
      fetchMe()
    } else {
      setLoading(false)
    }
  }, [])

  const fetchMe = async () => {
    try {
      const res  = await fetch(`${API}/auth/me`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      const data = await res.json()
      if (data.success) setUser(data.user)
      else logout()
    } catch {
      logout()
    } finally {
      setLoading(false)
    }
  }

  const login = async (email, password) => {
    const res  = await fetch(`${API}/auth/login`, {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({ email, password }),
    })
    const data = await res.json()
    if (!data.success) throw new Error(data.message)
    localStorage.setItem('pyq_token', data.token)
    setToken(data.token)
    setUser(data.user)
    return data.user
  }

  const register = async (name, email, password) => {
    const res  = await fetch(`${API}/auth/register`, {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({ name, email, password }),
    })
    const data = await res.json()
    if (!data.success) throw new Error(data.message)
    localStorage.setItem('pyq_token', data.token)
    setToken(data.token)
    setUser(data.user)
    return data.user
  }

  const logout = () => {
    localStorage.removeItem('pyq_token')
    setToken(null)
    setUser(null)
  }

  // Toggle save/unsave a paper
  const toggleSave = async (paperId) => {
    if (!token) return null
    const res  = await fetch(`${API}/auth/save/${paperId}`, {
      method:  'PUT',
      headers: { Authorization: `Bearer ${token}` },
    })
    const data = await res.json()
    if (data.success) {
      setUser(u => ({ ...u, savedPapers: data.savedPapers }))
    }
    return data
  }

  // Track download
  const trackDownload = async (paperId) => {
    if (!token) return
    try {
      await fetch(`${API}/papers/${paperId}/download`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      // Refresh user to get updated history
      fetchMe()
    } catch { /* silent */ }
  }

  const isSaved = (paperId) => {
    return user?.savedPapers?.some(p =>
      (p._id || p) === paperId
    ) || false
  }

  return (
    <AuthContext.Provider value={{
      user, token, loading,
      login, register, logout,
      toggleSave, trackDownload, isSaved,
      isLoggedIn: !!user,
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
