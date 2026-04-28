import { apiClient } from './client'

export interface AnalyticsFilters {
  dateRange: string
  platform: string
  source?: string
}

export interface DashboardMetrics {
  totalMentions: number
  averageSentiment: number
  activeAlerts: number
  engagementRate: number
  sentimentTrend: Array<{ date: string; sentiment: number }>
  topicDistribution: Array<{ name: string; value: number }>
  engagementByPlatform: Array<{ platform: string; engagement: number }>
  recentAlerts: Array<{
    id: string
    message: string
    time: string
    severity: string
  }>
}

export const analyticsService = {
  getDashboardMetrics: async (): Promise<DashboardMetrics> => {
    await new Promise(resolve => setTimeout(resolve, 800))
    
    return {
      totalMentions: 12847,
      averageSentiment: 74,
      activeAlerts: 23,
      engagementRate: 3.2,
      sentimentTrend: [
        { date: 'Mon', sentiment: 65 },
        { date: 'Tue', sentiment: 72 },
        { date: 'Wed', sentiment: 68 },
        { date: 'Thu', sentiment: 78 },
        { date: 'Fri', sentiment: 74 },
        { date: 'Sat', sentiment: 71 },
        { date: 'Sun', sentiment: 69 },
      ],
      topicDistribution: [
        { name: 'Product Quality', value: 35 },
        { name: 'Customer Service', value: 28 },
        { name: 'Pricing', value: 20 },
        { name: 'Features', value: 17 },
      ],
      engagementByPlatform: [
        { platform: 'YouTube', engagement: 45000 },
        { platform: 'Facebook', engagement: 28000 },
        { platform: 'Instagram', engagement: 19000 },
      ],
      recentAlerts: [
        { id: '1', message: 'Negative sentiment spike detected', time: '2 min ago', severity: 'high' },
        { id: '2', message: 'Unusual comment volume', time: '1 hour ago', severity: 'medium' },
        { id: '3', message: 'Spam rate exceeded threshold', time: '3 hours ago', severity: 'low' },
      ],
    }
  },

  getAnalytics: async (filters: AnalyticsFilters): Promise<any> => {
    await new Promise(resolve => setTimeout(resolve, 600))
    
    return {
      sentimentOverTime: [
        { date: '2024-01-01', sentiment: 72 },
        { date: '2024-01-02', sentiment: 68 },
        { date: '2024-01-03', sentiment: 75 },
        { date: '2024-01-04', sentiment: 71 },
        { date: '2024-01-05', sentiment: 78 },
      ],
      sentimentBreakdown: [
        { name: 'Positive', value: 45 },
        { name: 'Neutral', value: 35 },
        { name: 'Negative', value: 20 },
      ],
      topTopics: [
        { name: 'Customer Support', count: 234, percentage: 45 },
        { name: 'Product Features', count: 189, percentage: 36 },
        { name: 'Pricing', count: 98, percentage: 19 },
      ],
    }
  },
}