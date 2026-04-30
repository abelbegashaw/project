"use client"

import { useMemo, useState } from 'react'
import { AlertTriangle, CheckCircle2, Clock3, Info, ShieldAlert } from 'lucide-react'

import { alerts } from '@/lib/monitoring-data'

export default function AlertsPage() {
  const [selectedId, setSelectedId] = useState(alerts[0]?.id ?? '')
  const [acknowledged, setAcknowledged] = useState<string[]>([])

  const selectedAlert = useMemo(() => alerts.find((alert) => alert.id === selectedId) ?? alerts[0], [selectedId])

  return (
    <div className="space-y-6 text-slate-100">
      <section className="dashboard-panel p-6 sm:p-8">
        <div className="max-w-3xl space-y-3">
          <span className="section-label">Alerts</span>
          <h2 className="text-3xl font-medium text-white">Prioritize sentiment spikes, spam bursts, and anomalous activity.</h2>
          <p className="text-sm leading-7 text-slate-300">
            The alert list is interactive so you can preview the triage flow without backend dependencies.
          </p>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="dashboard-panel p-6">
          <div className="flex items-center gap-3 border-b border-white/10 pb-4">
            <ShieldAlert className="text-cyan-300" size={18} />
            <h3 className="text-xl font-medium text-white">Active alert queue</h3>
          </div>

          <div className="mt-5 space-y-4">
            {alerts.map((alert) => {
              const active = alert.id === selectedId
              const isAcknowledged = acknowledged.includes(alert.id) || alert.status === 'acknowledged'

              return (
                <button
                  key={alert.id}
                  type="button"
                  onClick={() => setSelectedId(alert.id)}
                  className={`w-full rounded-3xl border p-4 text-left transition-all ${active ? 'border-cyan-400/30 bg-cyan-400/10' : 'border-white/10 bg-white/5 hover:bg-white/8'}`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex gap-3">
                      <div className="mt-0.5">
                        {alert.severity === 'high' ? <AlertTriangle size={18} className="text-rose-300" /> : alert.severity === 'medium' ? <AlertTriangle size={18} className="text-amber-300" /> : <Info size={18} className="text-sky-300" />}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium text-white">{alert.title}</h4>
                          <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${isAcknowledged ? 'bg-emerald-400/10 text-emerald-200' : 'bg-white/8 text-slate-300'}`}>
                            {isAcknowledged ? 'acknowledged' : alert.status}
                          </span>
                        </div>
                        <p className="mt-2 text-sm leading-6 text-slate-300">{alert.message}</p>
                        <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-slate-400">
                          <span className="inline-flex items-center gap-1.5"><Clock3 size={12} />{alert.time}</span>
                          <span>Source: {alert.source}</span>
                        </div>
                      </div>
                    </div>
                    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${alert.severity === 'high' ? 'bg-rose-400/10 text-rose-200' : alert.severity === 'medium' ? 'bg-amber-400/10 text-amber-200' : 'bg-sky-400/10 text-sky-200'}`}>
                      {alert.severity}
                    </span>
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        <div className="dashboard-panel p-6">
          <div className="flex items-center gap-3 border-b border-white/10 pb-4">
            <CheckCircle2 className="text-cyan-300" size={18} />
            <h3 className="text-xl font-medium text-white">Selected alert</h3>
          </div>

          <div className="mt-5 space-y-4">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
              <p className="text-sm text-slate-400">Identifier</p>
              <p className="mt-2 text-xl font-semibold text-white">{selectedAlert.id}</p>
              <p className="mt-4 text-sm leading-6 text-slate-300">{selectedAlert.detail}</p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
              <p className="text-sm text-slate-400">Recommended action</p>
              <p className="mt-2 text-sm leading-6 text-slate-300">
                Escalate to the triage queue, inspect the source distribution, and verify whether the pattern repeats in the next ingest cycle.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setAcknowledged((current) => (current.includes(selectedAlert.id) ? current : [...current, selectedAlert.id]))}
              className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-cyan-400 px-4 py-3 font-semibold text-slate-950 shadow-lg shadow-cyan-500/20"
            >
              <CheckCircle2 size={16} />
              Mark as acknowledged
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}