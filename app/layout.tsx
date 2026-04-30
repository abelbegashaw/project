import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import { MonitoringShell } from '@/components/monitoring-shell'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
})

export const metadata: Metadata = {
  title: 'AI Social Monitor',
  description: 'Social media monitoring and comment intelligence workspace.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} bg-slate-950 text-slate-100 antialiased`}>
        <MonitoringShell>{children}</MonitoringShell>
      </body>
    </html>
  )
}