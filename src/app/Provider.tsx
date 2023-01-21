'use client'

import { ManagedUI } from '@components/ui'
import { SessionProvider } from 'next-auth/react'
import Themes from './Themes'

export default function Provider({ children }: { children?: React.ReactNode }) {
  return (
    <SessionProvider>
      <Themes>
        <ManagedUI>{children}</ManagedUI>
      </Themes>
    </SessionProvider>
  )
}
