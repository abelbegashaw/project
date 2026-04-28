import { apiClient } from './client'

export interface LoginCredentials {
  email: string
  password: string
}

export interface AuthResponse {
  token: string
  user: {
    id: string
    name: string
    email: string
    role: 'admin' | 'analyst' | 'viewer'
    workspaceId: string
  }
}

export const authService = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>('/auth/login', credentials)
    // Store token in localStorage (consider using httpOnly cookies in production)
    if (typeof window !== 'undefined') {
      localStorage.setItem('auth-token', response.token)
    }
    return response
  },

  logout: async (): Promise<void> => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('auth-token')
    }
    await apiClient.post('/auth/logout').catch(() => {})
  },

  getCurrentUser: async () => {
    return apiClient.get('/auth/me')
  },
}