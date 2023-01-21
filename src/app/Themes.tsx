'use client'

import { ReactNode, useState, useEffect } from 'react'
import { ThemeProvider } from 'next-themes'

function Themes({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [mounted])

  if (!mounted) return <>{children}</>

  return <ThemeProvider attribute="class">{children}</ThemeProvider>
}

export default Themes
