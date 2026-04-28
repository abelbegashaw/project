'use client'

import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { commentService } from '@/lib/api/comments'
import { Card } from '@/components/ui/Card'
import { Table, Column } from '@/components/ui/Table'
import { Badge } from '@/components/ui/Badge'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'


export default function CommentsPage() {
  const [filters, setFilters] = useState({
    sentiment: 'all',
    spam: 'all',
    keyword: '',
  })

  const { data: comments, isLoading } = useQuery({
    queryKey: ['comments', filters],
    queryFn: () => commentService.getComments(filters),
  })

  const { data: summary } = useQuery({
    queryKey: ['comment-summary'],
    queryFn: commentService.getAISummary,
  })

  const columns: Column<any>[] = [
    {
      key: 'text',
      label: 'Comment',
      render: (value: string) => (
        <div className="max-w-md">
          <div className="text-sm text-slate-900 font-amharic">{value}</div>
          <div className="text-xs text-slate-400 mt-1">Language: Amharic</div>
        </div>
      ),
    },
    {
      key: 'sentiment',
      label: 'Sentiment',
      render: (value: string) => (
        <Badge variant={
          value === 'positive' ? 'success' :
          value === 'negative' ? 'danger' : 'warning'
        }>
          {value}
        </Badge>
      ),
    },
    {
      key: 'spamScore',
      label: 'Spam Score',
      render: (value: number) => {
        const isSpam = value > 0.7
        const isSuspicious = value > 0.3
        return (
          <span className={`text-sm font-medium ${
            isSpam ? 'text-red-600' : isSuspicious ? 'text-yellow-600' : 'text-green-600'
          }`}>
            {(value * 100).toFixed(0)}%
          </span>
        )
      },
    },
    {
      key: 'topics',
      label: 'Topics',
      render: (value: string[]) => (
        <div className="flex flex-wrap gap-1">
          {value?.slice(0, 2).map((topic) => (
            <span key={topic} className="px-2 py-0.5 bg-slate-100 text-slate-600 text-xs rounded">
              {topic}
            </span>
          ))}
        </div>
      ),
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">Comment Intelligence</h1>
        <p className="text-sm text-slate-500 mt-1">
          AI-powered analysis of audience feedback and sentiment
        </p>
      </div>

      {/* AI Summary */}
      {summary && (
        <Card className="p-4 border-l-4 border-l-primary-500">
          <div className="flex items-start space-x-3">
            <div className="p-2 bg-primary-50 rounded-md flex-shrink-0">
              <span className="text-primary-600 text-sm font-semibold leading-none">AI</span>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-slate-900">AI Summary</h3>
              <p className="text-sm text-slate-600 mt-1 leading-relaxed">{summary}</p>
            </div>
          </div>
        </Card>
      )}

      {/* Filters */}
      <Card className="p-4">
        <div className="flex items-center space-x-3 mb-4">
          <span className="text-slate-400 text-sm">⚲</span>
          <span className="text-sm font-medium text-slate-700">Filters</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Select
            label="Sentiment"
            value={filters.sentiment}
            onChange={(e) => setFilters({ ...filters, sentiment: e.target.value })}
            options={[
              { value: 'all', label: 'All' },
              { value: 'positive', label: 'Positive' },
              { value: 'neutral', label: 'Neutral' },
              { value: 'negative', label: 'Negative' },
            ]}
          />
          <Select
            label="Spam Status"
            value={filters.spam}
            onChange={(e) => setFilters({ ...filters, spam: e.target.value })}
            options={[
              { value: 'all', label: 'All' },
              { value: 'clean', label: 'Clean Only' },
              { value: 'spam', label: 'Spam Only' },
            ]}
          />
          <Input
            label="Keyword Search"
            placeholder="Search comments..."
            value={filters.keyword}
            onChange={(e) => setFilters({ ...filters, keyword: e.target.value })}
            leftIcon={<span className="text-slate-400 text-xs">⌕</span>}
          />
        </div>
      </Card>

      {/* Comments Table */}
      <Card className="overflow-hidden">
        {isLoading ? (
          <div className="p-8 text-center">Loading comments...</div>
        ) : (
          <Table columns={columns} data={comments || []} />
        )}
      </Card>
    </div>
  )
}