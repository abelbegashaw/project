import { apiClient } from './client'

export interface Source {
  id: string
  name: string
  platform: 'youtube' | 'facebook' | 'instagram'
  accountId: string
  frequency: string
  status: 'active' | 'inactive' | 'error'
  lastIngestion?: string
}

export interface CreateSourceDto {
  name: string
  platform: 'youtube' | 'facebook' | 'instagram'
  accountId: string
  frequency: string
}

export const sourceService = {
  getSources: async (): Promise<Source[]> => {
    // Mock data - replace with actual API call
    await new Promise(resolve => setTimeout(resolve, 500))
    
    return [
      {
        id: 'src-1',
        name: 'Main Channel',
        platform: 'youtube',
        accountId: 'UC12345...',
        frequency: '15m',
        status: 'active',
        lastIngestion: new Date().toISOString(),
      },
      {
        id: 'src-2',
        name: 'Public Page',
        platform: 'facebook',
        accountId: '1098234...',
        frequency: '1h',
        status: 'active',
        lastIngestion: new Date().toISOString(),
      },
      {
        id: 'src-3',
        name: 'Official Brand',
        platform: 'instagram',
        accountId: 'brand_eth',
        frequency: '4h',
        status: 'error',
        lastIngestion: new Date().toISOString(),
      },
    ]
  },

  createSource: async (data: CreateSourceDto): Promise<Source> => {
    await new Promise(resolve => setTimeout(resolve, 500))
    return {
      id: `src-${Date.now()}`,
      ...data,
      status: 'active',
      lastIngestion: new Date().toISOString(),
    }
  },

  updateSource: async (id: string, data: Partial<CreateSourceDto>): Promise<Source> => {
    await new Promise(resolve => setTimeout(resolve, 500))
    return {
      id,
      ...data,
      platform: data.platform || 'youtube',
      status: 'active',
    } as Source
  },

  deleteSource: async (id: string): Promise<void> => {
    await new Promise(resolve => setTimeout(resolve, 500))
    console.log(`Deleted source: ${id}`)
  },
}