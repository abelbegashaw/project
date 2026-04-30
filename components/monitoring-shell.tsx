'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  BarChart3,
  Bell,
  ChartNoAxesCombined,
  ChevronRight,
  CircleGauge,
  Database,
  Layers3,
  Menu,
  Search,
  Settings,
  ShieldAlert,
  Sparkles,
  X,
} from 'lucide-react'

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: CircleGauge },
  { name: 'Sources', href: '/sources', icon: Database },
  { name: 'Analytics', href: '/analytics', icon: BarChart3 },
  { name: 'Comment Intelligence', href: '/comments', icon: ChartNoAxesCombined },
  { name: 'Alerts', href: '/alerts', icon: ShieldAlert },
  { name: 'Settings', href: '/settings', icon: Settings },
]

function getActiveLabel(pathname: string) {
  const active = navigation.find((item) => pathname === item.href || pathname.startsWith(`${item.href}/`))
  return active?.name ?? 'Dashboard'
}

function NavList({
  pathname,
  onNavigate,
}: {
  pathname: string
  onNavigate?: () => void
}) {
  return (
    <nav className="space-y-1.5">
      {navigation.map((item) => {
        const Icon = item.icon
        const active = pathname === item.href || pathname.startsWith(`${item.href}/`)

        return (
          <Link
            key={item.name}
            href={item.href}
            onClick={onNavigate}
            aria-current={active ? 'page' : undefined}
            className={`group flex items-center gap-3 rounded-2xl border px-4 py-3 transition-all duration-200 ${
              active
                ? 'border-cyan-400/30 bg-cyan-400/12 text-white shadow-[0_0_0_1px_rgba(34,211,238,0.18)]'
                : 'border-transparent text-slate-300 hover:border-white/10 hover:bg-white/6 hover:text-white'
            }`}
          >
            <Icon size={18} className={active ? 'text-cyan-300' : 'text-slate-400 group-hover:text-cyan-200'} />
            <span className="flex-1 text-sm font-medium">{item.name}</span>
            <ChevronRight size={14} className={active ? 'text-cyan-200' : 'text-slate-500'} />
          </Link>
        )
      })}
    </nav>
  )
}

export function MonitoringShell({ children }: Readonly<{ children: React.ReactNode }>) {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const title = getActiveLabel(pathname)

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(56,189,248,0.12),_transparent_34%),radial-gradient(circle_at_top_right,_rgba(16,185,129,0.1),_transparent_30%),linear-gradient(180deg,_rgba(2,6,23,0.95),_rgba(8,17,31,0.96)_50%,_rgba(15,23,42,0.98))] text-slate-100">
      <div className="flex min-h-screen">
        <aside className="hidden w-80 shrink-0 border-r border-white/10 bg-slate-950/55 px-5 py-6 backdrop-blur-xl lg:flex lg:flex-col">
          <div className="mb-8 flex items-center gap-3 rounded-3xl border border-cyan-400/15 bg-cyan-400/8 px-4 py-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 to-emerald-400 text-slate-950 shadow-lg shadow-cyan-500/20">
              <Sparkles size={18} />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-100/70">AI Social Monitor</p>
              <p className="text-sm text-slate-300">Monitoring workspace</p>
            </div>
          </div>

          <div className="mb-5 rounded-3xl border border-white/10 bg-white/5 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-slate-400">Workspace</p>
                <p className="mt-1 text-sm font-semibold text-white">Global Monitoring Lab</p>
              </div>
              <Layers3 size={18} className="text-cyan-300" />
            </div>
            <p className="mt-3 text-sm leading-6 text-slate-400">
              Unified view for sources, sentiment, alerts, and audience engagement.
            </p>
          </div>

          <NavList pathname={pathname} />

          <div className="mt-auto rounded-3xl border border-white/10 bg-white/5 p-4">
            <div className="flex items-center justify-between text-sm text-slate-300">
              <span>Live ingest</span>
              <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-emerald-200">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                Active
              </span>
            </div>
            <p className="mt-3 text-xs leading-5 text-slate-500">
              Authentication is intentionally omitted in this basis build.
            </p>
          </div>
        </aside>

        {mobileMenuOpen && (
          <div className="fixed inset-0 z-40 lg:hidden">
            <button
              aria-label="Close navigation drawer"
              className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm"
              onClick={() => setMobileMenuOpen(false)}
            />
            <div className="absolute inset-y-0 left-0 w-[86vw] max-w-sm border-r border-white/10 bg-slate-950 px-5 py-6 shadow-2xl shadow-black/40">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-100/70">AI Social Monitor</p>
                  <p className="text-sm text-slate-400">Navigation</p>
                </div>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="rounded-full border border-white/10 bg-white/5 p-2 text-slate-200"
                  aria-label="Close menu"
                >
                  <X size={18} />
                </button>
              </div>
              <NavList pathname={pathname} onNavigate={() => setMobileMenuOpen(false)} />
            </div>
          </div>
        )}

        <div className="flex min-h-screen min-w-0 flex-1 flex-col">
          <header className="sticky top-0 z-30 border-b border-white/10 bg-slate-950/70 backdrop-blur-xl">
            <div className="flex items-center gap-4 px-4 py-4 sm:px-6 lg:px-8">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 p-3 text-slate-200 lg:hidden"
                aria-label="Open menu"
              >
                <Menu size={18} />
              </button>

              <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-200/70">Monitoring Console</p>
                <h1 className="mt-1 truncate text-xl font-medium text-white sm:text-2xl">{title}</h1>
              </div>

              <form className="hidden w-full max-w-md items-center rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-slate-200 shadow-inner shadow-black/10 md:flex" onSubmit={(event) => event.preventDefault()}>
                <Search size={16} className="mr-3 shrink-0 text-slate-400" />
                <input
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  placeholder="Search sources, alerts, comments..."
                  className="w-full bg-transparent text-sm text-slate-100 outline-none placeholder:text-slate-500"
                />
              </form>

              <button
                type="button"
                className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-left"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-slate-200 to-slate-400 text-slate-950 font-semibold">
                  AM
                </div>
                <div className="hidden sm:block">
                  <p className="text-sm font-medium text-white">Demo Analyst</p>
                  <p className="text-xs font-normal text-slate-400">Workspace lead</p>
                </div>
              </button>

              <button
                type="button"
                className="hidden rounded-2xl border border-white/10 bg-white/5 p-3 text-slate-200 sm:inline-flex"
                aria-label="Notifications"
              >
                <Bell size={18} />
              </button>
            </div>
          </header>

          <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
            <div className="mx-auto w-full max-w-[1600px]">{children}</div>
          </main>
        </div>
      </div>
    </div>
  )
}