'use client'

import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { sourceService, Source } from '@/lib/api/sources'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Table, Column } from '@/components/ui/Table'
import { Badge } from '@/components/ui/Badge'
import { AddSourceModal } from '@/components/features/AddSourceModal'

export default function SourcesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const queryClient = useQueryClient()

  const { data: sources, isLoading } = useQuery({
    queryKey: ['sources'],
    queryFn: sourceService.getSources,
  })

  const deleteMutation = useMutation({
    mutationFn: sourceService.deleteSource,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sources'] })
    },
  })

  const columns: Column<Source>[] = [
    { key: 'name', label: 'Source Name' },
    { key: 'platform', label: 'Platform' },
    { key: 'accountId', label: 'Account ID' },
    { key: 'frequency', label: 'Polling Frequency' },
    {
      key: 'status',
      label: 'Status',
      render: (value: string) => (
        <Badge variant={value === 'active' ? 'success' : value === 'error' ? 'danger' : 'warning'}>
          {value}
        </Badge>
      ),
    },
    {
      key: 'actions',
      label: '',
      render: (_: any, row: Source) => (
        <div className="flex items-center space-x-2">
          <button className="p-1 text-slate-400 hover:text-slate-600 transition-colors">
            Edit
          </button>
          <button
            onClick={() => deleteMutation.mutate(row.id)}
            className="p-1 text-slate-400 hover:text-red-600 transition-colors"
          >
            Delete
          </button>
        </div>
      ),
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Social Media Sources</h1>
          <p className="text-sm text-slate-500 mt-1">
            Manage external platforms monitored by your workspace
          </p>
        </div>
        <Button onClick={() => setIsModalOpen(true)}>Add Source</Button>
      </div>

      <Card className="overflow-hidden">
        {isLoading ? (
          <div className="p-8 text-center">Loading sources...</div>
        ) : (
          <Table columns={columns} data={sources || []} />
        )}
      </Card>

      <AddSourceModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  )
}