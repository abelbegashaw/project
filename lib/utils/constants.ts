export const PLATFORMS = {
  YOUTUBE: 'youtube',
  FACEBOOK: 'facebook',
  INSTAGRAM: 'instagram',
} as const

export const PLATFORM_LABELS = {
  [PLATFORMS.YOUTUBE]: 'YouTube',
  [PLATFORMS.FACEBOOK]: 'Facebook',
  [PLATFORMS.INSTAGRAM]: 'Instagram',
} as const

export const FREQUENCY_OPTIONS = [
  { value: '15m', label: 'Every 15 minutes' },
  { value: '1h', label: 'Every hour' },
  { value: '4h', label: 'Every 4 hours' },
  { value: '24h', label: 'Every 24 hours' },
] as const

export const SENTIMENT_COLORS = {
  positive: 'text-green-600 bg-green-50 border-green-200',
  neutral: 'text-yellow-600 bg-yellow-50 border-yellow-200',
  negative: 'text-red-600 bg-red-50 border-red-200',
} as const

export const SEVERITY_COLORS = {
  high: 'text-red-600 bg-red-50 border-red-200',
  medium: 'text-yellow-600 bg-yellow-50 border-yellow-200',
  low: 'text-blue-600 bg-blue-50 border-blue-200',
} as const

export const ALERT_STATUS = {
  NEW: 'new',
  ACKNOWLEDGED: 'acknowledged',
  RESOLVED: 'resolved',
} as const