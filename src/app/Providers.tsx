'use client'

import { ThemeProvider } from 'next-themes'
import { ManagedUI } from '#/components/ui'

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class">
      <ManagedUI>{children}</ManagedUI>
    </ThemeProvider>
  )
}
