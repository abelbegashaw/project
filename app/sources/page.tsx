"use client"

import { FormEvent, useMemo, useState } from 'react'
import { BadgeCheck, Database, Download, Globe2, Plus, Trash2, X } from 'lucide-react'

import { sources as initialSources } from '@/lib/monitoring-data'

type SourceStatus = 'active' | 'warning' | 'inactive'

type SourceItem = {
  id: string
  name: string
  platform: string
  accountId: string
  frequency: string
  status: SourceStatus
  lastIngestion: string
  volume: string
}

const defaultForm = {
  name: '',
  platform: 'YouTube',
  accountId: '',
  frequency: 'Every 15 min',
  status: 'active' as SourceStatus,
  lastIngestion: 'Just now',
  volume: '0 mentions',
}

export default function SourcesPage() {
  const [sources, setSources] = useState<SourceItem[]>(initialSources as SourceItem[])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [formState, setFormState] = useState(defaultForm)

  const stats = useMemo(() => {
    const activeCount = sources.filter((source) => source.status === 'active').length
    const warningCount = sources.filter((source) => source.status === 'warning').length

    return {
      activeCount,
      healthyCount: activeCount + warningCount,
      coverage: sources.length === 0 ? 0 : Math.round((activeCount / sources.length) * 100),
    }
  }, [sources])

  const openDialog = () => {
    setFormState(defaultForm)
    setIsDialogOpen(true)
  }

  const closeDialog = () => setIsDialogOpen(false)

  const handleAddSource = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const newSource: SourceItem = {
      id: `src-${crypto.randomUUID()}`,
      ...formState,
      name: formState.name.trim(),
      accountId: formState.accountId.trim(),
    }

    setSources((current) => [newSource, ...current])
    closeDialog()
  }

  const removeSource = (id: string) => {
    setSources((current) => current.filter((source) => source.id !== id))
  }

  return (
    <div className="space-y-6 text-slate-100">
      <section className="dashboard-panel p-6 sm:p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl space-y-3">
            <span className="section-label">Sources</span>
            <h2 className="text-3xl font-medium text-white">Track every monitored channel and its ingestion cadence.</h2>
            <p className="text-sm leading-7 text-slate-300">
              Add new sources locally, remove stale ones, and use this page as the basis for real ingestion management.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={openDialog}
              className="inline-flex items-center gap-2 rounded-2xl bg-cyan-400 px-4 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-cyan-500/20"
            >
              <Plus size={16} />
              Add source
            </button>
            <button className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200">
              <Download size={16} />
              Export list
            </button>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {[
          { label: 'Active sources', value: String(stats.activeCount), icon: Database },
          { label: 'Healthy channels', value: String(stats.healthyCount), icon: BadgeCheck },
          { label: 'Coverage', value: `${stats.coverage}%`, icon: Globe2 },
        ].map((stat) => {
          const Icon = stat.icon

          return (
            <div key={stat.label} className="dashboard-panel-soft p-5">
              <div className="flex items-center justify-between">
                <p className="text-sm text-slate-400">{stat.label}</p>
                <Icon size={18} className="text-cyan-300" />
              </div>
              <div className="mt-4 text-2xl font-medium text-white">{stat.value}</div>
            </div>
          )
        })}
      </section>

      <section className="dashboard-panel overflow-hidden">
        <div className="border-b border-white/10 px-6 py-4">
          <h3 className="text-lg font-medium text-white">Connected sources</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-white/10 text-left text-sm">
            <thead className="bg-white/5 text-slate-400">
              <tr>
                <th className="px-6 py-4 font-medium">Source</th>
                <th className="px-6 py-4 font-medium">Platform</th>
                <th className="px-6 py-4 font-medium">Account ID</th>
                <th className="px-6 py-4 font-medium">Cadence</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium">Last ingest</th>
                <th className="px-6 py-4 font-medium">Volume</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {sources.map((source) => (
                <tr key={source.id} className="bg-transparent text-slate-200">
                  <td className="px-6 py-4 font-medium text-white">{source.name}</td>
                  <td className="px-6 py-4 text-slate-300">{source.platform}</td>
                  <td className="px-6 py-4 text-slate-300">{source.accountId}</td>
                  <td className="px-6 py-4 text-slate-300">{source.frequency}</td>
                  <td className="px-6 py-4">
                    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${source.status === 'active' ? 'bg-emerald-400/10 text-emerald-200' : source.status === 'warning' ? 'bg-amber-400/10 text-amber-200' : 'bg-slate-400/10 text-slate-200'}`}>
                      {source.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-300">{source.lastIngestion}</td>
                  <td className="px-6 py-4 text-slate-300">{source.volume}</td>
                  <td className="px-6 py-4 text-right">
                    <button
                      type="button"
                      onClick={() => removeSource(source.id)}
                      className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs font-medium text-slate-200 hover:bg-rose-400/10 hover:text-rose-200"
                    >
                      <Trash2 size={14} />
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {isDialogOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 px-4 backdrop-blur-sm">
          <div className="dashboard-panel w-full max-w-2xl p-6">
            <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-4">
              <div>
                <p className="section-label">New source</p>
                <h3 className="mt-2 text-2xl font-semibold text-white">Add a monitored channel</h3>
              </div>
              <button
                type="button"
                onClick={closeDialog}
                className="rounded-full border border-white/10 bg-white/5 p-2 text-slate-200"
                aria-label="Close source form"
              >
                <X size={18} />
              </button>
            </div>

            <form className="mt-6 grid gap-4 md:grid-cols-2" onSubmit={handleAddSource}>
              <label className="space-y-2 text-sm text-slate-300 md:col-span-2">
                <span>Source name</span>
                <input
                  required
                  value={formState.name}
                  onChange={(event) => setFormState((current) => ({ ...current, name: event.target.value }))}
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none"
                  placeholder="YouTube creators, Reddit threads, X lists..."
                />
              </label>

              <label className="space-y-2 text-sm text-slate-300">
                <span>Platform</span>
                <select
                  value={formState.platform}
                  onChange={(event) => setFormState((current) => ({ ...current, platform: event.target.value }))}
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none"
                >
                  {['YouTube', 'Facebook', 'Instagram', 'TikTok', 'Reddit', 'X'].map((platform) => (
                    <option key={platform} value={platform} className="bg-slate-900">
                      {platform}
                    </option>
                  ))}
                </select>
              </label>

              <label className="space-y-2 text-sm text-slate-300">
                <span>Account ID</span>
                <input
                  required
                  value={formState.accountId}
                  onChange={(event) => setFormState((current) => ({ ...current, accountId: event.target.value }))}
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none"
                  placeholder="yt-0001"
                />
              </label>

              <label className="space-y-2 text-sm text-slate-300">
                <span>Polling cadence</span>
                <input
                  value={formState.frequency}
                  onChange={(event) => setFormState((current) => ({ ...current, frequency: event.target.value }))}
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none"
                  placeholder="Every 15 min"
                />
              </label>

              <label className="space-y-2 text-sm text-slate-300">
                <span>Status</span>
                <select
                  value={formState.status}
                  onChange={(event) => setFormState((current) => ({ ...current, status: event.target.value as SourceStatus }))}
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none"
                >
                  {['active', 'warning', 'inactive'].map((status) => (
                    <option key={status} value={status} className="bg-slate-900 capitalize">
                      {status}
                    </option>
                  ))}
                </select>
              </label>

              <label className="space-y-2 text-sm text-slate-300">
                <span>Last ingest</span>
                <input
                  value={formState.lastIngestion}
                  onChange={(event) => setFormState((current) => ({ ...current, lastIngestion: event.target.value }))}
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none"
                  placeholder="Just now"
                />
              </label>

              <label className="space-y-2 text-sm text-slate-300">
                <span>Volume</span>
                <input
                  value={formState.volume}
                  onChange={(event) => setFormState((current) => ({ ...current, volume: event.target.value }))}
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none"
                  placeholder="0 mentions"
                />
              </label>

              <div className="flex gap-3 md:col-span-2 md:justify-end">
                <button type="button" onClick={closeDialog} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200">
                  Cancel
                </button>
                <button type="submit" className="rounded-2xl bg-cyan-400 px-4 py-3 text-sm font-semibold text-slate-950">
                  Add source
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}