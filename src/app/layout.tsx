import type {Metadata, Viewport} from 'next'

import {Geist, Geist_Mono} from 'next/font/google'

import {AppProviders} from '@/components/shared/app-providers'
import {cn} from '@/lib/utils'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: {template: '%s | App', default: 'App'},
  description: '',
  icons: {
    icon: '/favicon.svg',
  },
}

export const viewport: Viewport = {
  themeColor: [
    {
      media: '(prefers-color-scheme: light)',
      color: '#FFFFFF',
    },
    {
      media: '(prefers-color-scheme: dark)',
      color: '#000000',
    },
  ],
  maximumScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body
        className={cn(geistSans.variable, geistMono.variable, 'antialiased')}
      >
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  )
}
