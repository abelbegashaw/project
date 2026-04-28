'use client'

import { useEffect, useState, useCallback } from 'react'
import { useAuthStore } from '@/store/authstore'

export function useWebSocket() {
  const [unreadAlerts, setUnreadAlerts] = useState(0)
  const [isConnected, setIsConnected] = useState(false)
  const [socket, setSocket] = useState<WebSocket | null>(null)
  const { token } = useAuthStore()

  useEffect(() => {
    if (!token) return

    const wsUrl = process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:3001/ws'
    const ws = new WebSocket(`${wsUrl}?token=${token}`)

    ws.onopen = () => {
      setIsConnected(true)
      console.log('WebSocket connected')
    }

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data)
        if (data.type === 'new_alert') {
          setUnreadAlerts((prev) => prev + 1)
        }
      } catch (error) {
        console.error('WebSocket message error:', error)
      }
    }

    ws.onclose = () => {
      setIsConnected(false)
      console.log('WebSocket disconnected')
    }

    ws.onerror = (error) => {
      console.error('WebSocket error:', error)
    }

    setSocket(ws)

    return () => {
      ws.close()
    }
  }, [token])

  const markAlertsRead = useCallback(() => {
    setUnreadAlerts(0)
  }, [])

  const sendMessage = useCallback((type: string, payload: any) => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify({ type, ...payload }))
    }
  }, [socket])

  return {
    unreadAlerts,
    isConnected,
    markAlertsRead,
    sendMessage,
  }
}