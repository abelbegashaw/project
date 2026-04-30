"use client"

import { useState } from 'react'
import { ArrowUpRight, BarChart3, Globe2, Layers3 } from 'lucide-react'

import { analyticsTrend, sentimentBreakdown, topTopics } from '@/lib/monitoring-data'

const dateRangeOptions = ['24h', '7d', '30d', '90d']
const platformOptions = ['all', 'youtube', 'facebook', 'instagram']

export default function AnalyticsPage() {
  const [dateRange, setDateRange] = useState('7d')
  const [platform, setPlatform] = useState('all')

  return (
    <div className="space-y-6 text-slate-100">
      <section className="dashboard-panel p-6 sm:p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl space-y-3">
            <span className="section-label">Analytics</span>
            <h2 className="text-3xl font-medium text-white">Explore sentiment shifts and topic concentration over time.</h2>
            <p className="text-sm leading-7 text-slate-300">
              These controls are wired for the frontend basis only, but they already demonstrate the expected analytics layout.
            </p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/5 p-4 text-sm text-slate-300">
            Showing <span className="font-semibold text-white">{dateRange}</span> across <span className="font-semibold text-white capitalize">{platform}</span>.
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {[
          { label: 'Trend lift', value: '+12.8%', icon: ArrowUpRight },
          { label: 'Coverage score', value: '93%', icon: Globe2 },
          { label: 'Topic variety', value: '24', icon: Layers3 },
          { label: 'Signal quality', value: 'High', icon: BarChart3 },
        ].map((stat) => {
          const Icon = stat.icon

          return (
            <div key={stat.label} className="dashboard-panel-soft p-5">
              <div className="flex items-center justify-between text-sm text-slate-400">
                <span>{stat.label}</span>
                <Icon size={18} className="text-cyan-300" />
              </div>
              <div className="mt-4 text-2xl font-medium text-white">{stat.value}</div>
            </div>
          )
        })}
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="dashboard-panel p-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="section-label">Filters</p>
              <h3 className="mt-2 text-xl font-medium text-white">Adjust the analysis window</h3>
            </div>
            <div className="flex flex-wrap gap-3">
              <select
                value={dateRange}
                onChange={(event) => setDateRange(event.target.value)}
                className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none"
              >
                {dateRangeOptions.map((option) => (
                  <option key={option} value={option} className="bg-slate-900">
                    Last {option}
                  </option>
                ))}
              </select>
              <select
                value={platform}
                onChange={(event) => setPlatform(event.target.value)}
                className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none capitalize"
              >
                {platformOptions.map((option) => (
                  <option key={option} value={option} className="bg-slate-900 capitalize">
                    {option === 'all' ? 'All platforms' : option}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
              <h4 className="text-base font-medium text-white">Sentiment over time</h4>
              <div className="mt-6 flex h-56 items-end gap-3">
                {analyticsTrend.map((point) => (
                  <div key={point.label} className="flex flex-1 flex-col items-center gap-3">
                    <div className="flex w-full items-end justify-center rounded-2xl bg-slate-900/70 px-2 py-3">
                      <div className="w-full rounded-2xl bg-gradient-to-t from-cyan-400 via-emerald-400 to-cyan-100" style={{ height: `${point.value}%`, minHeight: '2.5rem' }} />
                    </div>
                    <span className="text-xs text-slate-400">{point.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
              <h4 className="text-base font-medium text-white">Sentiment breakdown</h4>
              <div className="mt-6 space-y-4">
                {sentimentBreakdown.map((segment) => (
                  <div key={segment.label}>
                    <div className="mb-2 flex items-center justify-between text-sm">
                      <span className="text-slate-300">{segment.label}</span>
                      <span className="text-slate-400">{segment.value}%</span>
                    </div>
                    <div className="h-3 rounded-full bg-white/6">
                      <div className={`h-3 rounded-full bg-gradient-to-r ${segment.color}`} style={{ width: `${segment.value}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="dashboard-panel p-6">
          <p className="section-label">Topics</p>
          <h3 className="mt-2 text-xl font-medium text-white">Top discussion drivers</h3>
          <div className="mt-6 space-y-4">
            {topTopics.map((topic) => (
              <div key={topic.name} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="flex items-center justify-between gap-4">
                  <span className="font-medium text-white">{topic.name}</span>
                  <span className="text-sm text-slate-400">{topic.mentions} mentions</span>
                </div>
                <div className="mt-3 h-2 rounded-full bg-white/6">
                  <div className="h-2 rounded-full bg-gradient-to-r from-fuchsia-400 to-cyan-400" style={{ width: `${topic.value}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}