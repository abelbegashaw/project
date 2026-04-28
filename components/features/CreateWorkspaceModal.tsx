'use client'

import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { workspaceService } from '@/lib/api/workspaces'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'

interface CreateWorkspaceModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
}

export function CreateWorkspaceModal({ isOpen, onClose, onSuccess }: CreateWorkspaceModalProps) {
  const [name, setName] = useState('')
  const [error, setError] = useState('')

  const createMutation = useMutation({
    mutationFn: workspaceService.createWorkspace,
    onSuccess: () => {
      onSuccess()
    },
    onError: (err: any) => {
      setError(err.message || 'Failed to create workspace')
    },
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) {
      setError('Workspace name is required')
      return
    }
    createMutation.mutate(name)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      
      <div className="relative bg-white rounded-md border border-slate-200 w-full max-w-md mx-4 shadow-xl">
        <div className="flex items-center justify-between p-4 border-b border-slate-200">
          <h2 className="text-lg font-semibold text-slate-900">Create New Workspace</h2>
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-slate-600" aria-label="Close modal">
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="p-4">
            <Input
              label="Workspace Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Acme Corporation"
              error={error}
              autoFocus
            />
            <p className="mt-2 text-xs text-slate-500">
              This will create a new workspace where you can invite team members.
            </p>
          </div>

          <div className="flex items-center justify-end space-x-3 p-4 border-t border-slate-200 bg-slate-50">
            <Button type="button" variant="ghost" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" isLoading={createMutation.isPending}>
              Create Workspace
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}