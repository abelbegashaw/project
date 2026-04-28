// Lightweight local replacements to avoid dependency on 'date-fns'

function isValid(d: unknown): d is Date {
  return d instanceof Date && !isNaN(d.getTime())
}

function formatDateWithOptions(d: Date, opts: Intl.DateTimeFormatOptions) {
  return new Intl.DateTimeFormat('en-US', opts).format(d)
}

export function formatDate(date: string | Date): string {
  const d = typeof date === 'string' ? new Date(date) : date
  if (!isValid(d)) return 'Invalid date'
  return formatDateWithOptions(d, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  })
}

export function formatRelativeTime(date: string | Date): string {
  // emulate date-fns formatDistanceToNow with suffix
  const d = typeof date === 'string' ? new Date(date) : date
  if (!isValid(d)) return 'Invalid date'
  return formatTimeAgo(d)
}

export function formatShortDate(date: string | Date): string {
  const d = typeof date === 'string' ? new Date(date) : date
  if (!isValid(d)) return 'Invalid date'
  return formatDateWithOptions(d, { month: 'short', day: 'numeric', year: 'numeric' })
}

export function formatTimeAgo(date: string | Date): string {
  const d = typeof date === 'string' ? new Date(date) : date
  if (!isValid(d)) return 'Invalid date'

  const seconds = Math.floor((Date.now() - d.getTime()) / 1000)

  let interval = seconds / 31536000
  if (interval > 1) return Math.floor(interval) + ' years ago'

  interval = seconds / 2592000
  if (interval > 1) return Math.floor(interval) + ' months ago'

  interval = seconds / 86400
  if (interval > 1) return Math.floor(interval) + ' days ago'

  interval = seconds / 3600
  if (interval > 1) return Math.floor(interval) + ' hours ago'

  interval = seconds / 60
  if (interval > 1) return Math.floor(interval) + ' minutes ago'

  return Math.floor(seconds) + ' seconds ago'
}