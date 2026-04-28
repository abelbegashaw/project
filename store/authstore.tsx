import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface User {
  id: string
  name: string
  email: string
  role: 'admin' | 'analyst' | 'viewer'
  workspaceId: string
}

interface AuthState {
  user: User | null
  token: string | null
  login: (token: string, user: User) => void
  logout: () => void
  setWorkspace: (workspaceId: string) => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      login: (token, user) => {
        // Store token in localStorage for API calls
        if (typeof window !== 'undefined') {
          localStorage.setItem('auth-token', token)
        }
        set({ token, user })
      },
      logout: () => {
        if (typeof window !== 'undefined') {
          localStorage.removeItem('auth-token')
        }
        set({ token: null, user: null })
      },
      setWorkspace: (workspaceId) =>
        set((state) => ({
          user: state.user ? { ...state.user, workspaceId } : null,
        })),
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ user: state.user }), // Don't persist token
    }
  )
)