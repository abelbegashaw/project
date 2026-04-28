'use client'

import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { alertService, Alert } from '@/lib/api/alerts'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { AlertDetailModal } from '@/components/features/AlertDetailModal'

const IconProps = {
  size: 16,
  className: '',
}

function CheckCircle({ size = 16, className = '' }: { size?: number; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  )
}

function AlertTriangle({ size = 16, className = '' }: { size?: number; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M10.3 3.2 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.2a2 2 0 0 0-3.4 0Z" />
      <path d="M12 9v4" />
      <path d="M12 17h.01" />
    </svg>
  )
}

function Info({ size = 16, className = '' }: { size?: number; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 16v-4" />
      <path d="M12 8h.01" />
    </svg>
  )
}

function Clock({ size = 16, className = '' }: { size?: number; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6l4 2" />
    </svg>
  )
}

export default function AlertsPage() {
  const [selectedAlert, setSelectedAlert] = useState<Alert | null>(null)
  const queryClient = useQueryClient()

  const { data: alerts, isLoading } = useQuery({
    queryKey: ['alerts'],
    queryFn: alertService.getAlerts,
  })

  const resolveMutation = useMutation({
    mutationFn: alertService.resolveAlert,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['alerts'] })
    },
  })

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'high': return <AlertTriangle size={16} className="text-red-500" />
      case 'medium': return <AlertTriangle size={16} className="text-yellow-500" />
      default: return <Info size={16} className="text-blue-500" />
    }
  }

  if (isLoading) {
    return <div className="flex items-center justify-center h-64">Loading alerts...</div>
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">Alerts & Notifications</h1>
        <p className="text-sm text-slate-500 mt-1">
          System-generated alerts triggered by sentiment spikes and anomalous activity
        </p>
      </div>

      <Card className="divide-y divide-slate-200">
        {(alerts || []).map((alert) => (
          <div
            key={alert.id}
            className="p-4 hover:bg-slate-50 transition-colors cursor-pointer"
            onClick={() => setSelectedAlert(alert)}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3 flex-1">
                <div className="mt-0.5">{getSeverityIcon(alert.severity)}</div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h3 className="text-sm font-medium text-slate-900">{alert.title}</h3>
                    <Badge variant={
                      alert.status === 'new' ? 'danger' :
                      alert.status === 'acknowledged' ? 'warning' : 'success'
                    }>
                      {alert.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-slate-600">{alert.message}</p>
                  <div className="flex items-center space-x-4 mt-2 text-xs text-slate-500">
                    <span className="flex items-center">
                      <Clock size={12} className="mr-1" />
                      {alert.time}
                    </span>
                    <span>Source: {alert.source}</span>
                  </div>
                </div>
              </div>
              {alert.status === 'new' && (
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={(e) => {
                    e.stopPropagation()
                    resolveMutation.mutate(alert.id)
                  }}
                >
                  <CheckCircle size={14} className="mr-1" />
                  Acknowledge
                </Button>
              )}
            </div>
          </div>
        ))}

        {(!alerts || alerts.length === 0) && (
          <div className="p-8 text-center">
            <p className="text-sm text-slate-500">No alerts at this time</p>
          </div>
        )}
      </Card>

      <AlertDetailModal
        alert={selectedAlert}
        isOpen={!!selectedAlert}
        onClose={() => setSelectedAlert(null)}
      />
    </div>
  )
}