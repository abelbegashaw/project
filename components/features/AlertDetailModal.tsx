'use client'

import { useEffect } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { alertService, Alert } from '@/lib/api/alerts'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
// Minimal inline SVG icon components to avoid external dependency on 'lucide-react'
const X = ({ size = 16, className = '' }: { size?: number; className?: string }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
)

const AlertTriangle = ({ size = 16, className = '' }: { size?: number; className?: string }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
    <line x1="12" y1="9" x2="12" y2="13" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
)

const Info = ({ size = 16, className = '' }: { size?: number; className?: string }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="16" x2="12" y2="12" />
    <line x1="12" y1="8" x2="12.01" y2="8" />
  </svg>
)

const Clock = ({ size = 16, className = '' }: { size?: number; className?: string }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
)

const CheckCircle = ({ size = 16, className = '' }: { size?: number; className?: string }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
)

interface AlertDetailModalProps {
  alert: Alert | null
  isOpen: boolean
  onClose: () => void
}

export function AlertDetailModal({ alert, isOpen, onClose }: AlertDetailModalProps) {
  const queryClient = useQueryClient()

  const resolveMutation = useMutation({
    mutationFn: alertService.resolveAlert,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['alerts'] })
      onClose()
    },
  })

  const acknowledgeMutation = useMutation({
    mutationFn: alertService.acknowledgeAlert,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['alerts'] })
    },
  })

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    
    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  if (!isOpen || !alert) return null

  const getSeverityIcon = () => {
    switch (alert.severity) {
      case 'high': return <AlertTriangle size={20} className="text-red-500" />
      case 'medium': return <AlertTriangle size={20} className="text-yellow-500" />
      default: return <Info size={20} className="text-blue-500" />
    }
  }

  const getSeverityBg = () => {
    switch (alert.severity) {
      case 'high': return 'border-red-200 bg-red-50'
      case 'medium': return 'border-yellow-200 bg-yellow-50'
      default: return 'border-blue-200 bg-blue-50'
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      
      <div className="relative bg-white rounded-md border border-slate-200 w-full max-w-lg mx-4 shadow-xl">
        <div className={`flex items-center justify-between p-4 border-b border-slate-200 ${getSeverityBg()}`}>
          <div className="flex items-center space-x-3">
            {getSeverityIcon()}
            <div>
              <h2 className="text-lg font-semibold text-slate-900">{alert.title}</h2>
              <p className="text-xs text-slate-500 mt-0.5">Alert ID: {alert.id}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-slate-600">
            <X size={18} />
          </button>
        </div>

        <div className="p-4 space-y-4">
          <div>
            <h3 className="text-sm font-medium text-slate-700 mb-1">Message</h3>
            <p className="text-sm text-slate-600">{alert.message}</p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <h3 className="text-xs font-medium text-slate-500 mb-1">Severity</h3>
              <Badge variant={
                alert.severity === 'high' ? 'danger' :
                alert.severity === 'medium' ? 'warning' : 'info'
              }>
                {alert.severity.toUpperCase()}
              </Badge>
            </div>
            <div>
              <h3 className="text-xs font-medium text-slate-500 mb-1">Status</h3>
              <Badge variant={
                alert.status === 'new' ? 'danger' :
                alert.status === 'acknowledged' ? 'warning' : 'success'
              }>
                {alert.status}
              </Badge>
            </div>
            <div>
              <h3 className="text-xs font-medium text-slate-500 mb-1">Time</h3>
              <div className="flex items-center text-sm text-slate-700">
                <Clock size={12} className="mr-1 text-slate-400" />
                {alert.time}
              </div>
            </div>
            <div>
              <h3 className="text-xs font-medium text-slate-500 mb-1">Source</h3>
              <div className="text-sm text-slate-700">{alert.source}</div>
            </div>
          </div>

          {alert.details && (
            <div className="border-t border-slate-200 pt-3">
              <h3 className="text-sm font-medium text-slate-700 mb-2">Details</h3>
              <div className="space-y-2 text-sm">
                {alert.details.triggerRule && (
                  <div className="flex justify-between">
                    <span className="text-slate-500">Trigger Rule:</span>
                    <span className="text-slate-700">{alert.details.triggerRule}</span>
                  </div>
                )}
                {alert.details.affectedMetric && (
                  <div className="flex justify-between">
                    <span className="text-slate-500">Affected Metric:</span>
                    <span className="text-slate-700">{alert.details.affectedMetric}</span>
                  </div>
                )}
                {alert.details.recommendedAction && (
                  <div className="mt-2 p-2 bg-slate-50 rounded border border-slate-200">
                    <span className="text-slate-500 block mb-1">Recommended Action:</span>
                    <span className="text-slate-700">{alert.details.recommendedAction}</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center justify-end space-x-3 p-4 border-t border-slate-200 bg-slate-50">
          {alert.status === 'new' && (
            <>
              <Button variant="ghost" onClick={() => acknowledgeMutation.mutate(alert.id)}>
                Acknowledge
              </Button>
              <Button onClick={() => resolveMutation.mutate(alert.id)}>
                <CheckCircle size={14} className="mr-2" />
                Resolve
              </Button>
            </>
          )}
          {alert.status === 'acknowledged' && (
            <Button onClick={() => resolveMutation.mutate(alert.id)}>
              <CheckCircle size={14} className="mr-2" />
              Mark as Resolved
            </Button>
          )}
          {alert.status === 'resolved' && (
            <Button variant="secondary" onClick={onClose}>
              Close
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}