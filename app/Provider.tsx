'use client'

import { ManagedUI } from '@components/ui'

export default function Provider({ children }: { children?: React.ReactNode }) {
  return <ManagedUI>{children}</ManagedUI>
}
