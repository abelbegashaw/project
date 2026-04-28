import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

export const sourceSchema = z.object({
  name: z.string().min(1, 'Source name is required'),
  platform: z.enum(['youtube', 'facebook', 'instagram']),
  accountId: z.string().min(1, 'Account ID is required'),
  frequency: z.enum(['15m', '1h', '4h', '24h']),
})

export const workspaceSchema = z.object({
  name: z.string().min(1, 'Workspace name is required').max(50, 'Workspace name is too long'),
})

export type LoginFormData = z.infer<typeof loginSchema>
export type SourceFormData = z.infer<typeof sourceSchema>
export type WorkspaceFormData = z.infer<typeof workspaceSchema>