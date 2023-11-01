import './globals.css'
import type { Metadata } from 'next'
import localFont from 'next/font/local'
import { Header, Footer } from '#/components/common'
import ClientComponents from './Client'
import { Suspense, ReactNode } from 'react'
import { checkEnv } from '#/lib/checkEnv'
import Providers from './Providers'

const fonts = localFont({
  src: [
    {
      path: './fonts/PlusJakartaSans.ttf',
      style: 'normal'
    },
    {
      path: './fonts/PlusJakartaSans-Italic.ttf',
      style: 'italic'
    }
  ],
  variable: '--jakarta-sans',
  weight: 'variable',
  fallback: ['Arial', 'system-ui']
})

export const metadata: Metadata = {
  metadataBase: new URL(checkEnv().host),
  title: {
    default: 'Rifkidhan',
    template: '%s | Rifkidhan'
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@rifkidhan',
    site: 'https://twitter.com/rifkidhan'
  },
  robots: {
    index: checkEnv().production,
    follow: checkEnv().production
  }
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="id" suppressHydrationWarning className={fonts.variable}>
      <body>
        <Providers>
          <Header />
          <ClientComponents />
          <Suspense>{children}</Suspense>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
