import { apiClient } from './client'

export interface Workspace {
  id: string
  name: string
  role: 'admin' | 'analyst' | 'viewer'
  createdAt: string
}

export const workspaceService = {
  getUserWorkspaces: async (): Promise<Workspace[]> => {
    await new Promise(resolve => setTimeout(resolve, 400))
    
    return [
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
    ]
  },

  switchWorkspace: async (workspaceId: string): Promise<void> => {
    await new Promise(resolve => setTimeout(resolve, 300))
    console.log(`Switched to workspace: ${workspaceId}`)
  },

  createWorkspace: async (name: string): Promise<Workspace> => {
    await new Promise(resolve => setTimeout(resolve, 500))
    return {
      id: `workspace-${Date.now()}`,
      name,
      role: 'admin',
      createdAt: new Date().toISOString(),
    }
  },
}