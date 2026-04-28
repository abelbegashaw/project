import './globals.css'
import { Providers } from '@/components/providers/Providers'

export const metadata = {
  title: 'AI Social Monitor - Social Media Intelligence Platform',
  description: 'Multimodal Social Media Monitoring & Comment Intelligence System',
  keywords: 'social media monitoring, AI analytics, comment intelligence, sentiment analysis',
  authors: [{ name: 'AI Social Monitor' }],
  viewport: 'width=device-width, initial-scale=1',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}