import { BellRing, BrainCircuit, LockKeyhole, Palette, Settings2, Users } from 'lucide-react'

import { settingsSections } from '@/lib/monitoring-data'

export default function SettingsPage() {
  return (
    <div className="space-y-6 text-slate-100">
      <section className="dashboard-panel p-6 sm:p-8">
        <div className="max-w-3xl space-y-3">
          <span className="section-label">Settings</span>
          <h2 className="text-3xl font-medium text-white">Shape the workspace defaults for review, notifications, and retention.</h2>
          <p className="text-sm leading-7 text-slate-300">
            Authentication is not part of this basis build, but the settings surface already reflects the control areas expected in the source repo.
          </p>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {[
          { label: 'Workspace', icon: Users, value: 'Global Monitoring Lab' },
          { label: 'Theme', icon: Palette, value: 'Midnight Glass' },
          { label: 'Review mode', icon: BrainCircuit, value: 'Assisted triage' },
        ].map((item) => {
          const Icon = item.icon

          return (
            <div key={item.label} className="dashboard-panel-soft p-5">
              <div className="flex items-center justify-between text-sm text-slate-400">
                <span>{item.label}</span>
                <Icon size={18} className="text-cyan-300" />
              </div>
              <div className="mt-4 text-xl font-medium text-white">{item.value}</div>
            </div>
          )
        })}
      </section>

      <section className="grid gap-6 xl:grid-cols-3">
        {settingsSections.map((section) => (
          <div key={section.title} className="dashboard-panel p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-lg font-medium text-white">{section.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-400">{section.description}</p>
              </div>
              <Settings2 className="text-cyan-300" size={18} />
            </div>
            <div className="mt-6 space-y-3">
              <label className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200">
                <span>Enable automatic updates</span>
                <input type="checkbox" defaultChecked className="h-5 w-5 rounded border-white/20 bg-transparent accent-cyan-400" />
              </label>
              <label className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200">
                <span>Send digest email</span>
                <input type="checkbox" defaultChecked className="h-5 w-5 rounded border-white/20 bg-transparent accent-cyan-400" />
              </label>
            </div>
          </div>
        ))}
      </section>

      <section className="dashboard-panel p-6">
        <div className="grid gap-4 md:grid-cols-3">
          {[
            { label: 'Alert channel', value: 'Slack + Email', icon: BellRing },
            { label: 'Access control', value: 'Role-based', icon: LockKeyhole },
            { label: 'Data retention', value: '365 days', icon: Settings2 },
          ].map((item) => {
            const Icon = item.icon

            return (
              <div key={item.label} className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <div className="flex items-center justify-between text-sm text-slate-400">
                  <span>{item.label}</span>
                  <Icon size={16} className="text-cyan-300" />
                </div>
                <div className="mt-3 text-lg font-medium text-white">{item.value}</div>
              </div>
            )
          })}
        </div>
      </section>
    </div>
  )
}