'use client'

import { ManagedUI } from '@components/ui'
import { SessionProvider } from 'next-auth/react'

export default function Provider({ children }: { children?: React.ReactNode }) {
  return (
    <SessionProvider>
      <ManagedUI>{children}</ManagedUI>
    </SessionProvider>
  )
}
