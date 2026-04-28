import { apiClient } from './client'

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

export interface CommentFilters {
  sentiment: string
  spam: string
  keyword: string
}

export const commentService = {
  getComments: async (filters: CommentFilters): Promise<Comment[]> => {
    await new Promise(resolve => setTimeout(resolve, 600))
    
    const mockComments: Comment[] = [
      {
        id: '1',
        text: 'ይህ ምርት በጣም ጥሩ ነው! በእጅጉ እመክራለሁ።',
        sentiment: 'positive',
        spamScore: 0.05,
        topics: ['Product Quality', 'Recommendation'],
        platform: 'youtube',
        postId: 'post-1',
        author: 'User123',
        timestamp: new Date().toISOString(),
      },
      {
        id: '2',
        text: 'አገልግሎቱ በጣም አዘገየ። ተስፋ አስቆራጭ ነው።',
        sentiment: 'negative',
        spamScore: 0.02,
        topics: ['Service Delay', 'Customer Support'],
        platform: 'facebook',
        postId: 'post-2',
        author: 'User456',
        timestamp: new Date().toISOString(),
      },
      {
        id: '3',
        text: 'በአጠቃላይ ጥሩ ነው ግን የተወሰኑ ችግሮች አሉት።',
        sentiment: 'neutral',
        spamScore: 0.01,
        topics: ['Mixed Feedback', 'Improvements'],
        platform: 'instagram',
        postId: 'post-3',
        author: 'User789',
        timestamp: new Date().toISOString(),
      },
    ]
    
    // Apply filters
    let filtered = mockComments
    if (filters.sentiment !== 'all') {
      filtered = filtered.filter(c => c.sentiment === filters.sentiment)
    }
    if (filters.spam === 'clean') {
      filtered = filtered.filter(c => c.spamScore < 0.5)
    } else if (filters.spam === 'spam') {
      filtered = filtered.filter(c => c.spamScore >= 0.5)
    }
    if (filters.keyword) {
      filtered = filtered.filter(c => 
        c.text.toLowerCase().includes(filters.keyword.toLowerCase())
      )
    }
    
    return filtered
  },

  getAISummary: async (): Promise<string> => {
    await new Promise(resolve => setTimeout(resolve, 400))
    
    return "Overall sentiment is positive with users praising product quality. Main concerns relate to delivery times. Key themes include customer support responsiveness and feature requests."
  },
}