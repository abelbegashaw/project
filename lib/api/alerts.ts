import { apiClient } from './client'

export interface Alert {
  id: string
  title: string
  message: string
  severity: 'high' | 'medium' | 'low'
  status: 'new' | 'acknowledged' | 'resolved'
  time: string
  source: string
  details?: {
    triggerRule?: string
    affectedMetric?: string
    threshold?: number
    actualValue?: number
    recommendedAction?: string
  }
}

export const alertService = {
  getAlerts: async (): Promise<Alert[]> => {
    await new Promise(resolve => setTimeout(resolve, 500))
    
    return [
      {
        id: 'ALT-001',
        title: 'Sentiment Spike Detected',
        message: 'Negative sentiment increased by 45% in the last hour for YouTube comments.',
        severity: 'high',
        status: 'new',
        time: '2 minutes ago',
        source: 'YouTube',
        details: {
          triggerRule: 'Sentiment Threshold Alert',
          affectedMetric: 'Negative Sentiment Percentage',
          threshold: 30,
          actualValue: 45,
          recommendedAction: 'Review recent comments and consider posting a response.',
        },
      },
      {
        id: 'ALT-002',
        title: 'Unusual Comment Volume',
        message: 'Comment volume spiked 200% above baseline on Facebook Page.',
        severity: 'medium',
        status: 'acknowledged',
        time: '1 hour ago',
        source: 'Facebook',
        details: {
          triggerRule: 'Volume Anomaly Detection',
          affectedMetric: 'Comments per Hour',
          threshold: 50,
          actualValue: 150,
          recommendedAction: 'Investigate the source of increased engagement.',
        },
      },
      {
        id: 'ALT-003',
        title: 'Spam Rate Alert',
        message: 'Spam detection rate exceeded 15% threshold.',
        severity: 'low',
        status: 'resolved',
        time: '3 hours ago',
        source: 'Instagram',
      },
    ]
  },

  resolveAlert: async (alertId: string): Promise<void> => {
    await new Promise(resolve => setTimeout(resolve, 300))
    console.log(`Alert ${alertId} resolved`)
  },

  acknowledgeAlert: async (alertId: string): Promise<void> => {
    await new Promise(resolve => setTimeout(resolve, 300))
    console.log(`Alert ${alertId} acknowledged`)
  },
}