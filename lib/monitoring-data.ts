export type SentimentLabel = 'positive' | 'neutral' | 'negative'

export const dashboardSnapshot = {
  mentions: 12847,
  sentiment: 74,
  alerts: 23,
  engagement: 3.2,
  trend: [65, 72, 68, 78, 74, 71, 69],
}

export const dashboardTopics = [
  { name: 'Product Quality', share: 35 },
  { name: 'Customer Support', share: 28 },
  { name: 'Pricing', share: 19 },
  { name: 'Feature Requests', share: 18 },
]

export const sources = [
  { id: 'src-yt', name: 'YouTube channels', platform: 'YouTube', accountId: 'yt-3942', frequency: 'Every 10 min', status: 'active', lastIngestion: '2 min ago', volume: '4.8k mentions' },
  { id: 'src-fb', name: 'Facebook pages', platform: 'Facebook', accountId: 'fb-1088', frequency: 'Every 15 min', status: 'active', lastIngestion: '5 min ago', volume: '3.2k mentions' },
  { id: 'src-ig', name: 'Instagram profiles', platform: 'Instagram', accountId: 'ig-7814', frequency: 'Every 20 min', status: 'warning', lastIngestion: '18 min ago', volume: '2.1k mentions' },
  { id: 'src-tk', name: 'TikTok creators', platform: 'TikTok', accountId: 'tk-5521', frequency: 'Every 30 min', status: 'active', lastIngestion: '7 min ago', volume: '1.8k mentions' },
]

export const analyticsTrend = [
  { label: 'Mon', value: 62 },
  { label: 'Tue', value: 66 },
  { label: 'Wed', value: 63 },
  { label: 'Thu', value: 72 },
  { label: 'Fri', value: 76 },
  { label: 'Sat', value: 74 },
  { label: 'Sun', value: 70 },
]

export const sentimentBreakdown = [
  { label: 'Positive', value: 45, color: 'from-emerald-400 to-cyan-400' },
  { label: 'Neutral', value: 35, color: 'from-slate-400 to-slate-300' },
  { label: 'Negative', value: 20, color: 'from-rose-400 to-orange-400' },
]

export const topTopics = [
  { name: 'Customer Support', mentions: 234, value: 45 },
  { name: 'Product Features', mentions: 189, value: 36 },
  { name: 'Pricing', mentions: 98, value: 19 },
]

export const comments = [
  { author: 'Mulu T.', platform: 'YouTube', sentiment: 'positive' as SentimentLabel, spamScore: 0.08, topics: ['Support', 'Delivery'], text: 'The support team answered quickly and the rollout was smooth.', timestamp: '12 min ago' },
  { author: 'Solomon A.', platform: 'Facebook', sentiment: 'neutral' as SentimentLabel, spamScore: 0.31, topics: ['Pricing', 'Value'], text: 'The pricing is okay, but the yearly plan needs more flexibility.', timestamp: '28 min ago' },
  { author: 'Rahel K.', platform: 'Instagram', sentiment: 'negative' as SentimentLabel, spamScore: 0.74, topics: ['Reliability', 'Latency'], text: 'I keep seeing delayed uploads and repeated errors during peak hours.', timestamp: '41 min ago' },
  { author: 'Yonas D.', platform: 'TikTok', sentiment: 'positive' as SentimentLabel, spamScore: 0.11, topics: ['Features', 'UX'], text: 'The new dashboard is much easier to use than the previous version.', timestamp: '1 hr ago' },
  { author: 'Hana M.', platform: 'Facebook', sentiment: 'neutral' as SentimentLabel, spamScore: 0.22, topics: ['Moderation', 'Safety'], text: 'Would like a clearer moderation policy for reported posts.', timestamp: '2 hr ago' },
]

export const alerts = [
  {
    id: 'AL-2041',
    title: 'Sentiment dip detected',
    severity: 'high',
    status: 'new',
    time: '5 min ago',
    source: 'YouTube',
    message: 'Positive sentiment dropped 18% in the last hour across product launch mentions.',
    detail: 'Trigger rule: sentiment change > 15% over 60 minutes. Recommend reviewing the latest creator replies and rollout notes.',
  },
  {
    id: 'AL-2034',
    title: 'Spike in support mentions',
    severity: 'medium',
    status: 'acknowledged',
    time: '22 min ago',
    source: 'Facebook',
    message: 'Support-related mentions are trending above the 24h baseline on three pages.',
    detail: 'Trigger rule: topic mentions > 2.5x baseline. Recommended action: route to the support triage queue.',
  },
  {
    id: 'AL-2027',
    title: 'Keyword cluster flagged as spam',
    severity: 'low',
    status: 'resolved',
    time: '1 hr ago',
    source: 'Instagram',
    message: 'Repeated promo comments were filtered from the latest ingest batch.',
    detail: 'Trigger rule: spam score > 0.7 across 12 comments. Recommended action: keep the spam filter at the current threshold.',
  },
]

export const settingsSections = [
  {
    title: 'Workspace Profile',
    description: 'Manage the default workspace identity and ownership details.',
  },
  {
    title: 'Alert Delivery',
    description: 'Choose how and where high-priority alerts should arrive.',
  },
  {
    title: 'Retention Policy',
    description: 'Keep the monitoring history as long as your review workflow needs it.',
  },
]