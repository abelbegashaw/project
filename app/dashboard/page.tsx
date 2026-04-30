import { CircleGauge, Flame, Megaphone, MessageSquareText, ShieldAlert, Sparkles, TrendingUp, Users } from 'lucide-react'

import { alerts, dashboardSnapshot, dashboardTopics, sources } from '@/lib/monitoring-data'

const metricCards = [
  { label: 'Total mentions', value: dashboardSnapshot.mentions.toLocaleString(), delta: '+12.4%', icon: MessageSquareText, tone: 'from-cyan-400 to-blue-500' },
  { label: 'Average sentiment', value: `${dashboardSnapshot.sentiment}%`, delta: '+5.1%', icon: TrendingUp, tone: 'from-emerald-400 to-teal-500' },
  { label: 'Active alerts', value: String(dashboardSnapshot.alerts), delta: '-3 this week', icon: ShieldAlert, tone: 'from-amber-400 to-orange-500' },
  { label: 'Engagement rate', value: `${dashboardSnapshot.engagement}%`, delta: '+0.4%', icon: Users, tone: 'from-fuchsia-400 to-pink-500' },
]

export default function DashboardPage() {
  return (
    <div className="space-y-6 text-slate-100">
      <section className="dashboard-panel relative overflow-hidden p-6 sm:p-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(56,189,248,0.18),_transparent_30%),radial-gradient(circle_at_bottom_left,_rgba(16,185,129,0.14),_transparent_28%)]" />
        <div className="relative grid gap-8 lg:grid-cols-[1.25fr_0.75fr]">
          <div className="space-y-5">
            <span className="section-label">Overview</span>
            <div className="space-y-3">
              <h2 className="max-w-3xl text-3xl font-medium tracking-tight text-white sm:text-4xl">
                Monitor audience sentiment, source health, and emerging risks from one place.
              </h2>
              <p className="max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
                This frontend basis mirrors the repository structure with dedicated sections for dashboard, sources, analytics, comments, and alerts. Authentication is intentionally omitted.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              {['Live ingest', 'Sentiment analysis', 'Comment intelligence', 'Alert triage'].map((chip) => (
                <span key={chip} className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/6 px-4 py-2 text-sm text-slate-200">
                  <Sparkles size={14} className="text-cyan-300" />
                  {chip}
                </span>
              ))}
            </div>
          </div>

          <div className="dashboard-panel-soft p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">System pulse</p>
                <p className="mt-1 text-xl font-medium text-white">Healthy</p>
              </div>
              <CircleGauge className="text-cyan-300" />
            </div>
            <div className="mt-6 space-y-4">
              <div>
                <div className="mb-2 flex items-center justify-between text-sm text-slate-400">
                  <span>Ingestion success</span>
                  <span>98.7%</span>
                </div>
                <div className="h-2 rounded-full bg-white/8">
                  <div className="h-2 w-[98%] rounded-full bg-gradient-to-r from-cyan-400 to-emerald-400" />
                </div>
              </div>
              <div>
                <div className="mb-2 flex items-center justify-between text-sm text-slate-400">
                  <span>Alert backlog</span>
                  <span>Low</span>
                </div>
                <div className="h-2 rounded-full bg-white/8">
                  <div className="h-2 w-[24%] rounded-full bg-gradient-to-r from-amber-400 to-orange-500" />
                </div>
              </div>
              <div>
                <div className="mb-2 flex items-center justify-between text-sm text-slate-400">
                  <span>Audience signal quality</span>
                  <span>92%</span>
                </div>
                <div className="h-2 rounded-full bg-white/8">
                  <div className="h-2 w-[92%] rounded-full bg-gradient-to-r from-fuchsia-400 to-cyan-400" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {metricCards.map((metric) => {
          const Icon = metric.icon

          return (
            <div key={metric.label} className="dashboard-panel-soft p-5">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-400">{metric.label}</span>
                <div className={`flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br ${metric.tone} text-slate-950`}>
                  <Icon size={18} />
                </div>
              </div>
              <div className="mt-4 text-2xl font-medium text-white">{metric.value}</div>
              <p className="mt-2 text-sm text-emerald-300">{metric.delta} from last week</p>
            </div>
          )
        })}
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <div className="dashboard-panel p-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="section-label">Sentiment trend</p>
              <h3 className="mt-2 text-xl font-medium text-white">Weekly audience signal</h3>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-300">
              <Flame size={14} className="text-amber-300" />
              <span>Peak on Friday</span>
            </div>
          </div>
          <div className="mt-8 flex h-64 items-end gap-3">
            {dashboardSnapshot.trend.map((value, index) => (
              <div key={index} className="flex flex-1 flex-col items-center gap-3">
                <div className="flex w-full items-end justify-center rounded-2xl bg-white/5 px-2 py-3">
                  <div
                    className="w-full rounded-2xl bg-gradient-to-t from-cyan-500 via-emerald-400 to-cyan-200 shadow-[0_20px_40px_rgba(34,211,238,0.18)]"
                    style={{ height: `${Math.max(20, value)}%`, minHeight: '2.5rem' }}
                  />
                </div>
                <span className="text-xs font-medium text-slate-400">{['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][index]}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="dashboard-panel p-6">
          <p className="section-label">Source health</p>
          <h3 className="mt-2 text-xl font-medium text-white">Ingested channels</h3>
          <div className="mt-6 space-y-4">
            {sources.map((source) => (
              <div key={source.accountId} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-medium text-white">{source.name}</p>
                    <p className="mt-1 text-sm text-slate-400">{source.platform} • {source.frequency}</p>
                  </div>
                  <span className={`rounded-full px-3 py-1 text-xs font-semibold ${source.status === 'active' ? 'bg-emerald-400/10 text-emerald-200' : 'bg-amber-400/10 text-amber-200'}`}>
                    {source.status}
                  </span>
                </div>
                <div className="mt-4 flex items-center justify-between text-sm text-slate-400">
                  <span>{source.accountId}</span>
                  <span>{source.lastIngestion}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[0.92fr_1.08fr]">
        <div className="dashboard-panel p-6">
          <p className="section-label">Top topics</p>
          <h3 className="mt-2 text-xl font-medium text-white">Conversation drivers</h3>
          <div className="mt-6 space-y-4">
            {dashboardTopics.map((topic) => (
              <div key={topic.name}>
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="text-slate-200">{topic.name}</span>
                  <span className="text-slate-400">{topic.share}%</span>
                </div>
                <div className="h-3 rounded-full bg-white/6">
                  <div className="h-3 rounded-full bg-gradient-to-r from-cyan-400 via-teal-400 to-emerald-400" style={{ width: `${topic.share}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="dashboard-panel p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="section-label">Recent alerts</p>
              <h3 className="mt-2 text-xl font-medium text-white">Operational watchlist</h3>
            </div>
            <Megaphone className="text-cyan-300" />
          </div>
          <div className="mt-6 space-y-3">
            {alerts.map((alert) => (
              <div key={alert.id} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-medium text-white">{alert.title}</p>
                    <p className="mt-1 text-sm leading-6 text-slate-400">{alert.message}</p>
                  </div>
                  <span className={`rounded-full px-3 py-1 text-xs font-semibold ${alert.severity === 'high' ? 'bg-rose-400/10 text-rose-200' : alert.severity === 'medium' ? 'bg-amber-400/10 text-amber-200' : 'bg-sky-400/10 text-sky-200'}`}>
                    {alert.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}