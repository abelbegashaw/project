'use client'

import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { sourceService } from '@/lib/api/sources'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { sourceSchema, SourceFormData } from '@/lib/utils/validators'

interface AddSourceModalProps {
  isOpen: boolean
  onClose: () => void
}

export function AddSourceModal({ isOpen, onClose }: AddSourceModalProps) {
  const [formData, setFormData] = useState<SourceFormData>({
    name: '',
    platform: 'youtube',
    accountId: '',
    frequency: '1h',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const queryClient = useQueryClient()

  const createMutation = useMutation({
    mutationFn: sourceService.createSource,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sources'] })
      onClose()
      resetForm()
    },
    onError: (err: any) => {
      setErrors({ submit: err.message || 'Failed to create source' })
    },
  })

  const resetForm = () => {
    setFormData({
      name: '',
      platform: 'youtube',
      accountId: '',
      frequency: '1h',
    })
    setErrors({})
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const result = sourceSchema.safeParse(formData)
    if (!result.success) {
      const fieldErrors: Record<string, string> = {}
      result.error.issues.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as string] = err.message
        }
      })
      setErrors(fieldErrors)
      return
    }
    
    createMutation.mutate(formData)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      
      <div className="relative bg-white rounded-md border border-slate-200 w-full max-w-md mx-4 shadow-xl">
        <div className="flex items-center justify-between p-4 border-b border-slate-200">
          <h2 className="text-lg font-semibold text-slate-900">Add Social Media Source</h2>
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-slate-600">
            <span aria-hidden="true" className="text-lg leading-none">×</span>
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="p-4 space-y-4">
            <Input
              label="Source Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g., Main YouTube Channel"
              error={errors.name}
            />

            <Select
              label="Platform"
              value={formData.platform}
              onChange={(e) => setFormData({ ...formData, platform: e.target.value as any })}
              options={[
                { value: 'youtube', label: 'YouTube' },
                { value: 'facebook', label: 'Facebook' },
                { value: 'instagram', label: 'Instagram' },
              ]}
              error={errors.platform}
            />

            <Input
              label="Account ID / Page ID"
              value={formData.accountId}
              onChange={(e) => setFormData({ ...formData, accountId: e.target.value })}
              placeholder="Enter account identifier"
              error={errors.accountId}
            />

            <Select
              label="Polling Frequency"
              value={formData.frequency}
              onChange={(e) => setFormData({ ...formData, frequency: e.target.value as any })}
              options={[
                { value: '15m', label: 'Every 15 minutes' },
                { value: '1h', label: 'Every hour' },
                { value: '4h', label: 'Every 4 hours' },
                { value: '24h', label: 'Every 24 hours' },
              ]}
              error={errors.frequency}
            />

            {errors.submit && (
              <p className="text-sm text-red-600">{errors.submit}</p>
            )}
          </div>

          <div className="flex items-center justify-end space-x-3 p-4 border-t border-slate-200 bg-slate-50">
            <Button type="button" variant="ghost" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" isLoading={createMutation.isPending}>
              Add Source
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}