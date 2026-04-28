'use client'

import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { analyticsService } from '@/lib/api/analytics'
import { Card } from '@/components/ui/Card'
import { Select } from '@/components/ui/Select'
import { LineChart, BarChart, DonutChart } from '@/components/charts'

export default function AnalyticsPage() {
  const [dateRange, setDateRange] = useState('7d')
  const [platform, setPlatform] = useState('all')

  const { data: analytics, isLoading } = useQuery({
    queryKey: ['analytics', dateRange, platform],
    queryFn: () => analyticsService.getAnalytics({ dateRange, platform }),
  })

  if (isLoading) {
    return <div className="flex items-center justify-center h-64">Loading analytics...</div>
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">Analytics Dashboard</h1>
        <p className="text-sm text-slate-500 mt-1">
          Deep dive into sentiment trends and engagement metrics
        </p>
      </div>

      <div className="flex items-center space-x-4 bg-white border border-slate-200 rounded-md p-4">
        <Select
          label="Date Range"
          value={dateRange}
          onChange={(e) => setDateRange(e.target.value)}
          options={[
            { value: '24h', label: 'Last 24 Hours' },
            { value: '7d', label: 'Last 7 Days' },
            { value: '30d', label: 'Last 30 Days' },
            { value: '90d', label: 'Last 90 Days' },
          ]}
        />
        <Select
          label="Platform"
          value={platform}
          onChange={(e) => setPlatform(e.target.value)}
          options={[
            { value: 'all', label: 'All Platforms' },
            { value: 'youtube', label: 'YouTube' },
            { value: 'facebook', label: 'Facebook' },
            { value: 'instagram', label: 'Instagram' },
          ]}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-4">
          <h3 className="text-base font-medium text-slate-900 mb-4">Sentiment Over Time</h3>
          <LineChart
            data={analytics?.sentimentOverTime || []}
            xKey="date"
            yKey="sentiment"
            height={350}
          />
        </Card>

        <Card className="p-4">
          <h3 className="text-base font-medium text-slate-900 mb-4">Sentiment Breakdown</h3>
          <DonutChart
            data={analytics?.sentimentBreakdown || []}
            height={350}
          />
        </Card>

        <Card className="p-4 lg:col-span-2">
          <h3 className="text-base font-medium text-slate-900 mb-4">Top Topics Discussed</h3>
          <div className="space-y-4">
            {(analytics?.topTopics || []).map((topic: any) => (
              <div key={topic.name}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-slate-700">{topic.name}</span>
                  <span className="text-slate-500">{topic.count} mentions</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div
                    className="bg-primary-600 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${topic.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}