'use client'

import { useAuthStore } from '@/store/authstore'
import { useRouter } from 'next/navigation'
import { authService } from '@/lib/api/auth'

export function useAuth() {
  const { user, token, login, logout } = useAuthStore()
  const router = useRouter()

  const signOut = async () => {
    await authService.logout()
    logout()
    router.push('/login')
  }

  return {
    user,
    token,
    isAuthenticated: !!token,
    login,
    logout: signOut,
  }
}