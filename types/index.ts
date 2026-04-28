export interface User {
  id: string
  name: string
  email: string
  role: 'admin' | 'analyst' | 'viewer'
  workspaceId: string
  avatar?: string
  createdAt: string
}

export interface Alert {
  id: string
  title: string
  message: string
  severity: 'high' | 'medium' | 'low'
  status: 'new' | 'acknowledged' | 'resolved'
  time: string
  source: string
  details?: AlertDetails
}

export interface AlertDetails {
  triggerRule?: string
  affectedMetric?: string
  threshold?: number
  actualValue?: number
  recommendedAction?: string
}

export interface Source {
  id: string
  name: string
  platform: 'youtube' | 'facebook' | 'instagram'
  accountId: string
  frequency: string
  status: 'active' | 'inactive' | 'error'
  lastIngestion?: string
}

export interface Comment {
  id: string
  text: string
  sentiment: 'positive' | 'neutral' | 'negative'
  spamScore: number
  topics: string[]
  platform: string
  postId: string
  author: string
  timestamp: string
}

export interface AnalyticsMetrics {
  totalMentions: number
  averageSentiment: number
  activeAlerts: number
  engagementRate: number
  sentimentTrend: Array<{ date: string; sentiment: number }>
  topicDistribution: Array<{ name: string; value: number }>
  engagementByPlatform: Array<{ platform: string; engagement: number }>
}

export interface Workspace {
  id: string
  name: string
  role: 'admin' | 'analyst' | 'viewer'
  members: User[]
  createdAt: string
}

export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  message?: string
  errors?: Record<string, string[]>
}