import './globals.css'
import type { Metadata } from 'next'
import { Plus_Jakarta_Sans } from 'next/font/google'
import { Header, Footer } from '#/components/common'
import ClientComponents from './Client'
import { Suspense, ReactNode } from 'react'
import Providers from './Providers'

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: '--jakarta-sans',
  weight: 'variable',
  subsets: ['latin'],
  style: ['italic', 'normal'],
  fallback: ['Arial', 'system-ui']
})

export const metadata: Metadata = {
  metadataBase: new URL('http://localhost:3000'),
  title: {
    default: 'Rifkidhan',
    template: '%s | Rifkidhan'
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@rifkidhan',
    site: 'https://twitter.com/rifkidhan'
  }
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={plusJakartaSans.variable}
    >
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
