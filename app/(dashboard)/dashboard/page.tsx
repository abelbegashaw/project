'use client'

import { useQuery } from '@tanstack/react-query'
import { analyticsService } from '@/lib/api/analytics'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { LineChart, BarChart, DonutChart } from '@/components/charts'
import { Skeleton } from '@/components/ui/Skeleton'
// Lightweight inline icon components to avoid requiring 'lucide-react'
const IconBase = ({ children, size = 18, className = '', ...props }: any) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    {children}
  </svg>
)

const AlertCircle = ({ size, className, ...props }: any) => (
  <IconBase size={size} className={className} {...props}>
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="8" x2="12" y2="12" />
    <line x1="12" y1="16" x2="12.01" y2="16" />
  </IconBase>
)

const ThumbsUp = ({ size, className, ...props }: any) => (
  <IconBase size={size} className={className} {...props}>
    <path d="M14 9V5a2 2 0 0 0-2-2l-3 7v9h8a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2h-3z" />
    <path d="M7 22v-9" />
  </IconBase>
)

const MessageSquare = ({ size, className, ...props }: any) => (
  <IconBase size={size} className={className} {...props}>
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </IconBase>
)

const Users = ({ size, className, ...props }: any) => (
  <IconBase size={size} className={className} {...props}>
    <path d="M17 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </IconBase>
)

export default function DashboardPage() {
  const { data: metrics, isLoading } = useQuery({
    queryKey: ['dashboard-metrics'],
    queryFn: analyticsService.getDashboardMetrics,
  })

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div>
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-64 mt-2" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="p-4">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-8 w-16 mt-2" />
            </Card>
          ))}
        </div>
      </div>
    )
  }

  const kpis = [
    { label: 'Total Mentions', value: metrics?.totalMentions.toLocaleString(), change: '+12%', icon: MessageSquare },
    { label: 'Avg Sentiment', value: `${metrics?.averageSentiment}%`, change: '+5%', icon: ThumbsUp },
    { label: 'Active Alerts', value: metrics?.activeAlerts.toString(), change: '-3', icon: AlertCircle },
    { label: 'Engagement Rate', value: `${metrics?.engagementRate}%`, change: '+0.4%', icon: Users },
  ]

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">Dashboard Overview</h1>
        <p className="text-sm text-slate-500 mt-1">Key metrics and insights from all monitored platforms</p>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi) => {
          const Icon = kpi.icon
          return (
            <Card key={kpi.label} className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-slate-500">{kpi.label}</span>
                <Icon size={18} className="text-slate-400" />
              </div>
              <div className="text-2xl font-semibold text-slate-900">{kpi.value}</div>
              <div className={`text-xs mt-1 ${kpi.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                {kpi.change} from last week
              </div>
            </Card>
          )
        })}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sentiment Trend */}
        <Card className="p-4">
          <h3 className="text-base font-medium text-slate-900 mb-4">Sentiment Trend</h3>
          <LineChart
            data={metrics?.sentimentTrend || []}
            xKey="date"
            yKey="sentiment"
            height={300}
          />
        </Card>

        {/* Topic Distribution */}
        <Card className="p-4">
          <h3 className="text-base font-medium text-slate-900 mb-4">Topic Distribution</h3>
          <DonutChart
            data={metrics?.topicDistribution || []}
            height={300}
          />
        </Card>

        {/* Engagement by Platform */}
        <Card className="p-4 lg:col-span-2">
          <h3 className="text-base font-medium text-slate-900 mb-4">Engagement by Platform</h3>
          <BarChart
            data={metrics?.engagementByPlatform || []}
            xKey="platform"
            yKey="engagement"
            height={300}
          />
        </Card>
      </div>

      {/* Recent Alerts */}
      <Card className="p-4">
        <h3 className="text-base font-medium text-slate-900 mb-4">Recent Alerts</h3>
        <div className="space-y-3">
          {(metrics?.recentAlerts || []).map((alert) => (
            <div
              key={alert.id}
              className="flex items-center justify-between p-3 bg-slate-50 border border-slate-200 rounded-md"
            >
              <div>
                <div className="text-sm font-medium text-slate-900">{alert.message}</div>
                <div className="text-xs text-slate-500 mt-1">{alert.time}</div>
              </div>
              <Badge variant={alert.severity === 'high' ? 'danger' : 'warning'}>
                {alert.severity}
              </Badge>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}