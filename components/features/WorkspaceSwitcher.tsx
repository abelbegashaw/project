'use client'

import { useState, useEffect } from 'react'
import { useAuthStore } from '@/store/authstore'
// Simple inline SVG icon components to avoid external dependency on `lucide-react`
type IconProps = React.SVGProps<SVGSVGElement> & { size?: number }

const Check = ({ size = 16, className = '', ...props }: IconProps) => (
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
    {...props}
  >
    <path d="M20 6L9 17l-5-5" />
  </svg>
)

const ChevronDown = ({ size = 16, className = '', ...props }: IconProps) => (
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
    {...props}
  >
    <polyline points="6 9 12 15 18 9" />
  </svg>
)

const Building2 = ({ size = 16, className = '', ...props }: IconProps) => (
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
    {...props}
  >
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
    <path d="M8 3v18" />
    <path d="M16 8h.01" />
    <path d="M12 8h.01" />
    <path d="M8 8h.01" />
  </svg>
)

const Plus = ({ size = 16, className = '', ...props }: IconProps) => (
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
    {...props}
  >
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
)
import { workspaceService, Workspace } from '@/lib/api/workspaces'
import { CreateWorkspaceModal } from './CreateWorkspaceModal'

export function WorkspaceSwitcher() {
  const [isOpen, setIsOpen] = useState(false)
  const [workspaces, setWorkspaces] = useState<Workspace[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showCreateModal, setShowCreateModal] = useState(false)
  
  const { user, setWorkspace } = useAuthStore()
  const currentWorkspaceId = user?.workspaceId

  useEffect(() => {
    const fetchWorkspaces = async () => {
      try {
        const data = await workspaceService.getUserWorkspaces()
        setWorkspaces(data)
      } catch (error) {
        console.error('Failed to fetch workspaces:', error)
        // Mock data for demonstration
        setWorkspaces([
          {
            id: 'workspace-1',
            name: 'Ethiopian Broadcasting Corp',
            role: 'admin',
            createdAt: '2024-01-15',
          },
          {
            id: 'workspace-2',
            name: 'Commercial Bank of Ethiopia',
            role: 'analyst',
            createdAt: '2024-02-20',
          },
        ])
      } finally {
        setIsLoading(false)
      }
    }

    fetchWorkspaces()
  }, [])

  const handleSwitchWorkspace = async (workspaceId: string) => {
    try {
      await workspaceService.switchWorkspace(workspaceId)
      setWorkspace(workspaceId)
      setIsOpen(false)
      window.location.reload()
    } catch (error) {
      console.error('Failed to switch workspace:', error)
    }
  }

  const currentWorkspace = workspaces.find(w => w.id === currentWorkspaceId)

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-primary-100 text-primary-700'
      case 'analyst': return 'bg-blue-100 text-blue-700'
      default: return 'bg-slate-100 text-slate-700'
    }
  }

  return (
    <>
      <div className="relative border-t border-slate-200 p-4">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between p-2 rounded-md hover:bg-slate-50 transition-colors"
        >
          <div className="flex items-center space-x-2 min-w-0">
            <div className="h-8 w-8 rounded-md bg-primary-100 flex items-center justify-center flex-shrink-0">
              <Building2 size={16} className="text-primary-700" />
            </div>
            <div className="flex-1 min-w-0 text-left">
              {isLoading ? (
                <div className="h-4 w-24 bg-slate-200 rounded animate-pulse" />
              ) : (
                <>
                  <p className="text-sm font-medium text-slate-900 truncate">
                    {currentWorkspace?.name || 'Select Workspace'}
                  </p>
                  <p className="text-xs text-slate-500 capitalize">
                    {currentWorkspace?.role || 'No role'}
                  </p>
                </>
              )}
            </div>
          </div>
          <ChevronDown
            size={16}
            className={`text-slate-400 transition-transform flex-shrink-0 ${
              isOpen ? 'rotate-180' : ''
            }`}
          />
        </button>

        {isOpen && (
          <>
            <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />
            <div className="absolute bottom-full left-0 right-0 mb-2 bg-white border border-slate-200 rounded-md shadow-lg z-20 max-h-96 overflow-y-auto">
              <div className="p-2">
                <div className="px-2 py-1.5">
                  <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Your Workspaces
                  </p>
                </div>
                
                {workspaces.map((workspace) => (
                  <button
                    key={workspace.id}
                    onClick={() => handleSwitchWorkspace(workspace.id)}
                    className="w-full flex items-center justify-between p-2 rounded-md hover:bg-slate-50 transition-colors"
                  >
                    <div className="flex items-center space-x-2 flex-1 min-w-0">
                      <div className="h-8 w-8 rounded-md bg-slate-100 flex items-center justify-center flex-shrink-0">
                        <Building2 size={14} className="text-slate-600" />
                      </div>
                      <div className="flex-1 min-w-0 text-left">
                        <p className="text-sm font-medium text-slate-900 truncate">
                          {workspace.name}
                        </p>
                        <span className={`text-xs px-1.5 py-0.5 rounded ${getRoleBadgeColor(workspace.role)}`}>
                          {workspace.role}
                        </span>
                      </div>
                    </div>
                    
                    {currentWorkspaceId === workspace.id && (
                      <Check size={16} className="text-primary-600 flex-shrink-0 ml-2" />
                    )}
                  </button>
                ))}
              </div>

              {currentWorkspace?.role === 'admin' && (
                <div className="border-t border-slate-200 p-2">
                  <button
                    onClick={() => {
                      setIsOpen(false)
                      setShowCreateModal(true)
                    }}
                    className="w-full flex items-center space-x-2 p-2 rounded-md hover:bg-slate-50 transition-colors"
                  >
                    <div className="h-8 w-8 rounded-md border border-dashed border-slate-300 flex items-center justify-center">
                      <Plus size={14} className="text-slate-400" />
                    </div>
                    <span className="text-sm text-slate-600">Create New Workspace</span>
                  </button>
                </div>
              )}
            </div>
          </>
        )}
      </div>

      <CreateWorkspaceModal 
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSuccess={() => {
          setShowCreateModal(false)
          window.location.reload()
        }}
      />
    </>
  )
}