'use client'

import { signIn } from 'next-auth/react'
import { Button } from '@components/ui'

export default function AuthPage() {
  return (
    <>
      <h1>Sign In</h1>
      <div>
        <Button
          variant="color"
          onClick={() => signIn('google', { callbackUrl: '/' })}
          className="bg-blue text-white"
        >
          Google
        </Button>
      </div>
    </>
  )
}
